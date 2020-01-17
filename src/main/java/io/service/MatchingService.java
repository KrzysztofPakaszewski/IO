package io.service;

import io.domain.Item;
import io.domain.ItemInterested;
import io.domain.Matching;
import io.domain.User;
import io.repository.ItemInterestedRepository;
import io.repository.ItemRepository;
import io.repository.MatchingRepository;
import io.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MatchingService {

    private final Logger log = LoggerFactory.getLogger(MatchingService.class);

    private final MatchingRepository matchingRepository;

    private final ItemRepository itemRepository;

    private final ItemInterestedRepository itemInterestedRepository;

    public MatchingService(MatchingRepository matchingRepository, ItemRepository itemRepository, ItemInterestedRepository itemInterestedRepository){
        this.matchingRepository = matchingRepository;
        this.itemRepository = itemRepository;
        this.itemInterestedRepository = itemInterestedRepository;
    }

    // delete this item from interesteds
    // should be called if item was archived
    public void deleteAllInteretedsThatHasThisItem(Item removedItem){
        List<ItemInterested> itemInterestedsToRemove = itemInterestedRepository.findByItem(removedItem.getId());
        itemInterestedRepository.deleteAll(itemInterestedsToRemove);
    }

    public boolean deleteInteresteds(Matching matching){
        Optional<String> optLogin = SecurityUtils.getCurrentUserLogin();
        if(optLogin.isPresent()){
            String login = optLogin.get();
            Item discardedItem;
            if( matching.getItemAsked().getOwner().getLogin().equals(login)){
                discardedItem = matching.getItemOffered();
            }else if (matching.getItemOffered().getOwner().getLogin().equals(login)){
                discardedItem = matching.getItemAsked();
            }else{
                return false;
            }
            List<ItemInterested>itemsToRemove = itemInterestedRepository.findByUserAndItem(login,discardedItem.getId());
            itemInterestedRepository.deleteAll(itemsToRemove);
            return true;
        }
        return false;
    }
    // returns true if this item has ongoing accepted matching
    public boolean doesThisItemHasMatch(Item item){
        return !matchingRepository.findMatchingThatReferenceThisItemAndHasTrueState(item.getId()).isEmpty();
    }

    public boolean finishedMatching(Long id){
        Optional<Matching> optMatching = matchingRepository.findById(id);
        if(optMatching.isPresent()) {
            Matching matching = optMatching.get();
            if (matching.isOfferorReceived() && matching.isAskerReceived()) {
                deleteInteresteds(matching);
                Optional<Item>optAsked =  itemRepository.findById(matching.getItemAsked().getId());
                Optional<Item>optOffered =  itemRepository.findById(matching.getItemOffered().getId());
                if(optAsked.isPresent()){
                    Item item = optAsked.get();
                    item.setArchived(true);
                    itemRepository.save(item);
                    deleteAllInteretedsThatHasThisItem(item);
                }
                if(optOffered.isPresent()){
                    Item item = optOffered.get();
                    item.setArchived(true);
                    itemRepository.save(item);
                    deleteAllInteretedsThatHasThisItem(item);
                }
                return true;
            }
        }
        return false;
    }

    public boolean acceptGivenMatching(Matching matching){
        Optional<Matching> foundMatch = matchingRepository.findById(matching.getId());
        Optional<String> optLogin = SecurityUtils.getCurrentUserLogin();
        if(foundMatch.isPresent() && optLogin.isPresent()){
            String login = optLogin.get();
            Matching tmp = foundMatch.get();
            if(tmp.getItemAsked().getOwner().getLogin().equals(login)){
                tmp.setAskerReceived(true);
            }else if(tmp.getItemOffered().getOwner().getLogin().equals(login)){
                tmp.setOfferorReceived(true);
            }else{
                return false;
            }
            matchingRepository.save(tmp);
            return true;
        }
        else {
            return false;
        }
    }

    public boolean createMatchesIfPossible(Item releasedItem){
        List<ItemInterested> interestedsOfOwner = itemInterestedRepository.findByUser(releasedItem.getOwner().getLogin());
        List<ItemInterested> interestedsOfItem = itemInterestedRepository.findByItem(releasedItem.getId());
        for(ItemInterested owner: interestedsOfOwner){
            for(ItemInterested item : interestedsOfItem){
                if(owner.getItem().getOwner().getLogin().equals(item.getInterested().getLogin()) &&
                !doesThisItemHasMatch(owner.getItem())){
                    Matching matching = new Matching();
                    matching.setItemOffered(owner.getItem());
                    matching.setItemAsked(item.getItem());
                    matching.setOfferorReceived(false);
                    matching.setAskerReceived(false);
                    matchingRepository.save(matching);
                    return true;
                }
            }
        }
        return false;
    }

    public void createMatchesIfBothUsersInterested(Item likedItem){
        if(!doesThisItemHasMatch(likedItem)) {
            Optional<String> tmp= SecurityUtils.getCurrentUserLogin();
            User owner = likedItem.getOwner();
            if( tmp.isPresent()) {
                String logggedLogin = tmp.get();
                List<ItemInterested> listOfInteresteds = itemInterestedRepository.findByUser(owner.getLogin());
                for( ItemInterested row : listOfInteresteds){
                    if(row.getItem().getOwner().getLogin().equals(logggedLogin) && !doesThisItemHasMatch(row.getItem())){
                        Matching matching = new Matching();
                        matching.setItemAsked(likedItem);
                        matching.setItemOffered(row.getItem());
                        matching.setAskerReceived(false);
                        matching.setOfferorReceived(false);
                        matchingRepository.save(matching);
                        break;
                    }
                }
            }
        }
    }

}
