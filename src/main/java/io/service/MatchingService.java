package io.service;

import io.domain.Item;
import io.domain.Matching;
import io.repository.ItemRepository;
import io.repository.MatchingRepository;
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

    public MatchingService(MatchingRepository matchingRepository, ItemRepository itemRepository){
        this.matchingRepository = matchingRepository;
        this.itemRepository = itemRepository;
    }

    // Creates matches for owner of the chosen item
    public void createMatchesForThisItem(Item chosenItem){
        List<Item> userItems =itemRepository.findByOwnerIsCurrentUser();
        boolean hasAcceptedMatching = doesThisItemHasAcceptedMatch(chosenItem);

        for ( Item item: userItems ) {
            Matching matching = new Matching();
            matching.setItemAsked(chosenItem);
            if(hasAcceptedMatching || doesThisItemHasAcceptedMatch(item)){
                matching.setStateOfExchange(false);
            }
            matching.setItemOffered(item);
            matchingRepository.save(matching);
        }
    }

    // Deletes all matches that has this item either in itemOffered or itemAsked
    public void deleteAllMatchesThatHasThisItem(Item removedItem){
        List<Matching> matchingsToRemove = matchingRepository.findAllMatchingsThatReferenceThisItem(removedItem.getId());
        for (Matching foundMatch: matchingsToRemove) {
            matchingRepository.delete(foundMatch);
        }
    }

    // turns state of matches that references items from accepted match to false
    public void changeStateOfMatchesToFalse(Item first, Item second){
        List<Matching> matchingsToChange = matchingRepository.findAllMatchingsThatReferenceTheseItems(first.getId(),second.getId());
        for ( Matching foundMatch : matchingsToChange) {
            foundMatch.setStateOfExchange(false);
            matchingRepository.save(foundMatch);
        }
    }

    // turns state of matches that references items from cancelled match to NULL
    public void changeStateOfMatchesToNull(Item first,Item second){
        List<Matching> matchingsToChange = matchingRepository.findAllMatchingsThatReferenceTheseItems(first.getId(),second.getId());
        for ( Matching foundMatch : matchingsToChange) {
            foundMatch.setStateOfExchange(null);
            matchingRepository.save(foundMatch);
        }
    }

    // returns true if this item has ongoing accepted matching
    public boolean doesThisItemHasAcceptedMatch(Item item){
        return !matchingRepository.findMatchingThatReferenceThisItemAndHasTrueState(item.getId()).isEmpty();
    }

    public boolean acceptGivenMatching(Matching matching){
        Optional<Matching> foundMatch = matchingRepository.findById(matching.getId());
        if(foundMatch.isPresent() && foundMatch.get().isStateOfExchange() == null){
            Matching tmp = foundMatch.get();
            tmp.setStateOfExchange(true);
            matchingRepository.save(tmp);
            return true;
        }
        else {
            return false;
        }
    }




}
