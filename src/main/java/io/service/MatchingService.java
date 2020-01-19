package io.service;

import io.domain.*;
import io.repository.ItemInterestedRepository;
import io.repository.ItemRepository;
import io.repository.MatchingEntityRepository;
import io.repository.MatchingRepository;
import io.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Stack;

@Service
//@Transactional
public class MatchingService {

    private final Logger log = LoggerFactory.getLogger(MatchingService.class);

    private final MatchingRepository matchingRepository;

    private final ItemRepository itemRepository;

    private final ItemInterestedRepository itemInterestedRepository;

    private final MatchingEntityRepository matchingEntityRepository;

    private final int maxNumberOfPeopleInMatch = 5;

    public MatchingService(MatchingRepository matchingRepository, ItemRepository itemRepository, ItemInterestedRepository itemInterestedRepository, MatchingEntityRepository matchingEntityRepository){
        this.matchingRepository = matchingRepository;
        this.itemRepository = itemRepository;
        this.itemInterestedRepository = itemInterestedRepository;
        this.matchingEntityRepository = matchingEntityRepository;
    }

    // delete this item from interesteds
    // should be called if item was archived
    public void deleteAllInteretedsThatHasThisItem(Item removedItem){
        List<ItemInterested> itemInterestedsToRemove = itemInterestedRepository.findByItem(removedItem.getId());
        itemInterestedRepository.deleteAll(itemInterestedsToRemove);
    }

    public boolean deleteInteresteds(Matching matching) {
        Optional<String> optLogin = SecurityUtils.getCurrentUserLogin();
        if (optLogin.isPresent()) {
            String login = optLogin.get();
            Item discardedItem = null;
            List<MatchingEntity> matchingEntity = matchingEntityRepository.findByMatchingId(matching.getId());
            for (MatchingEntity entity : matchingEntity) {
                if (entity.getItem().getOwner().getLogin().equals(login)) {
                    discardedItem = entity.getItem();
                    break;
                }
            }
            if (discardedItem == null) {
                return false;
            }
            List<ItemInterested> itemsToRemove = itemInterestedRepository.findByUserAndItem(login, discardedItem.getId());
            itemInterestedRepository.deleteAll(itemsToRemove);
            return true;
        }
        return false;
    }
    // returns true if this item has ongoing accepted matching
    public boolean doesThisItemHasMatch(Item item){
        return !matchingEntityRepository.findByItemId(item.getId()).isEmpty();
    }

    public boolean finishedMatching(Long matchingId) {
        Optional<Matching> optMatching = matchingRepository.findById(matchingId);
        if (optMatching.isPresent()) {
            Matching matching = optMatching.get();
            List<MatchingEntity> matchingEntity = matchingEntityRepository.findByMatchingId(matching.getId());
            boolean allItemsReceived = true;
            for (MatchingEntity entity : matchingEntity) {
                if (!entity.isItemReceived()) {
                    allItemsReceived = false;
                }
            }
            if (allItemsReceived) {
                deleteInteresteds(matching);
                for (MatchingEntity entity : matchingEntity) {
                    Item item = entity.getItem();
                    item.setArchived(true);
                    itemRepository.save(item);
                    deleteAllInteretedsThatHasThisItem(item);
                }
                return true;
            }
        }
        return false;
    }

    public boolean acceptDeliveryYourNewItemInGivenMatching(Matching matching){
        Optional<Matching> foundMatch = matchingRepository.findById(matching.getId());
        Optional<String> optLogin = SecurityUtils.getCurrentUserLogin();
        if(foundMatch.isPresent() && optLogin.isPresent()){
            String login = optLogin.get();
            Matching tmp = foundMatch.get();
            List<MatchingEntity> listOfItemInMatching = matchingEntityRepository.findByMatchingId(tmp.getId());
            for (MatchingEntity entity : listOfItemInMatching) {
                if (entity.getForUser().getLogin().equals(login)) {
                    entity.setItemReceived(true);
                    matchingEntityRepository.save(entity);
                    return true;
                }
            }
        }
        return false;
    }

//    public boolean createMatchesIfPossible(Item releasedItem){
//        List<ItemInterested> interestedsOfOwner = itemInterestedRepository.findByUser(releasedItem.getOwner().getLogin());
//        List<ItemInterested> interestedsOfItem = itemInterestedRepository.findByItem(releasedItem.getId());
//        for(ItemInterested owner: interestedsOfOwner){
//            for(ItemInterested item : interestedsOfItem){
//                if(owner.getItem().getOwner().getLogin().equals(item.getInterested().getLogin()) &&
//                !doesThisItemHasMatch(owner.getItem())){
//                    Matching matching = new Matching();
//                    matching.setItemOffered(owner.getItem());
//                    matching.setItemAsked(item.getItem());
//                    matching.setOfferorReceived(false);
//                    matching.setAskerReceived(false);
//                    matchingRepository.save(matching);
//                    return true;
//                }
//            }
//        }
//        return false;
//    }

    public void createMatchesIfFindCycle(Item likedItem) {
        if (!doesThisItemHasMatch(likedItem)) {
            Optional<String> tmp = SecurityUtils.getCurrentUserLogin();
            ArrayList<Long> visited = new ArrayList<>();
            Stack<Long> stackOfItemsId = new Stack<>();
            int currentNumberOfPeople = 0;
            if (findCycle(likedItem, likedItem, stackOfItemsId, visited, currentNumberOfPeople, maxNumberOfPeopleInMatch)) {
                // creating match
                Matching matching = new Matching();
                matching.description(java.time.LocalDate.now().toString());
                matchingRepository.save(matching);

                // adding entity to match
                Long itemId;
                User forUser = likedItem.getOwner();
                while (!stackOfItemsId.empty()) {
                    itemId = stackOfItemsId.pop();
                    Item item = itemRepository.findById(itemId).get();

                    MatchingEntity matchingEntity = new MatchingEntity();
                    matchingEntity.setMatching(matching);
                    matchingEntity.setForUser(forUser);
                    matchingEntity.setItem(item);
                    matchingEntity.setItemReceived(false);
                    matchingEntityRepository.save(matchingEntity);

                    forUser = item.getOwner();
                }
            }
        }
    }

    private boolean findCycle(Item startItem, Item currentItem, Stack<Long> stack, ArrayList<Long> visited, int currentNumberOfPeople, int maxNumberOfPeopleInMatch) {
        visited.add(currentItem.getId());
        stack.push(currentItem.getId());
        currentNumberOfPeople++;
        List<ItemInterested> listOfInteresteds = itemInterestedRepository.findByUser(currentItem.getOwner().getLogin());
        for (ItemInterested neighbour : listOfInteresteds) {
            if (neighbour.getItem().equals(startItem)) {
                return true;
            }
            if (currentNumberOfPeople < maxNumberOfPeopleInMatch &&
                !visited.contains(neighbour.getItem().getId()) &&
                findCycle(startItem, neighbour.getItem(), stack, visited, currentNumberOfPeople, maxNumberOfPeopleInMatch)) {
                return true;
            }
        }
        stack.pop();
        return false;
    }


}
