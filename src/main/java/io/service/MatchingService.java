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
        for ( Item item: userItems ) {
            Matching matching = new Matching();
            matching.setStateOfExchange(false);
            matching.setItemAsked(chosenItem);
            matching.setItemOffered(item);
            matchingRepository.save(matching);
        }
    }

    

}
