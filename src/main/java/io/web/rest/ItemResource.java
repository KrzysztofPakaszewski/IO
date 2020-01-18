package io.web.rest;

import io.config.Constants;
import io.domain.Item;
import io.domain.ItemInterested;
import io.domain.User;
import io.domain.enumeration.Category;
import io.repository.ItemInterestedRepository;
import io.repository.ItemRepository;
import io.repository.UserRepository;
import io.service.MatchingService;
import io.service.UserService;
import io.web.rest.errors.BadRequestAlertException;
import io.security.SecurityUtils;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.domain.Item}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemResource {

    private final Logger log = LoggerFactory.getLogger(ItemResource.class);

    private static final String ENTITY_NAME = "item";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemRepository itemRepository;
    private final MatchingService matchingService;
    private final UserService userService;
    private final ItemInterestedRepository itemInterestedRepository;

    public ItemResource(ItemRepository itemRepository,
                        MatchingService matchingService, UserService userService,
                        ItemInterestedRepository itemInterestedRepository) {
        this.itemRepository = itemRepository;
        this.matchingService = matchingService;
        this.itemInterestedRepository = itemInterestedRepository;
        this.userService = userService;
    }

    /**
     * {@code POST  /items} : Create a new item.
     *
     * @param item the item to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new item, or with status {@code 400 (Bad Request)} if the item has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/items")
    public ResponseEntity<Item> createItem(@RequestBody Item item) throws URISyntaxException {
        log.debug("REST request to save Item : {}", item);
        if (item.getId() != null) {
            throw new BadRequestAlertException("A new item cannot already have an ID", ENTITY_NAME, "idexists");
        }
        item.setArchived(false);
        Item result = itemRepository.save(item);
        return ResponseEntity.created(new URI("/api/items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /items} : Updates an existing item.
     *
     * @param item the item to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated item,
     * or with status {@code 400 (Bad Request)} if the item is not valid,
     * or with status {@code 500 (Internal Server Error)} if the item couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/items")
    public ResponseEntity<Item> updateItem(@RequestBody Item item) throws URISyntaxException {
        log.debug("REST request to update Item : {}", item);
        if (item.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Item result = itemRepository.save(item);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, item.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /search} : Adds given item to interested of logged user.
     *
     * @param item the item to add to interested
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with operation log in body,
     * or with status {@code 400 (Bad Request)} if the item is not valid,
     * or with status {@code 500 (Internal Server Error)} if the item couldn't be added.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/search")
    public ResponseEntity<String> addInterested(@RequestBody Item item) throws URISyntaxException {
        log.debug("REST request to save Item : {}", item);
        Optional<User> optLoggedUser = userService.getUserWithAuthorities();
        Optional<Item> optItemRep = itemRepository.findById(item.getId());
        if(!optItemRep.isPresent() || !optLoggedUser.isPresent()){
            throw new BadRequestAlertException("invalid user or item ", "","");
        }
        User loggedUser = optLoggedUser.get();
        Item itemRep = optItemRep.get();
        ItemInterested itemInterested = new ItemInterested(loggedUser,itemRep);
        log.debug("user: " + itemInterested.getInterested().getLogin() + " " + itemInterested.getItem().getTitle());
        itemInterestedRepository.save(itemInterested);
        matchingService.createMatchesIfBothUsersInterested(itemRep);
        return ResponseEntity.created(new URI("/api/items/" ))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, ""))
            .body("Success add to liked items item.id="+item.getId()+",user.id="+ loggedUser.getLogin() );
    }

    /**
     * {@code GET  /items} : get all the items of logged user.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of items in body.
     */
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems(Pageable pageable) {
        log.debug("REST request to get a page of Items");
        Page<Item> page = itemRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/search/interested")
    public ResponseEntity<List<Item>> getLikedItemsOfLoggedUser(Pageable pageable, @RequestParam(value = "search", required = false) String search,
                                                @RequestParam(value = "category1", required = false) Category category1,
                                                @RequestParam(value = "category2", required = false) Category category2,
                                                @RequestParam(value = "category3", required = false) Category category3) {
        log.debug("REST request to get items of logged User");
        log.debug("REST request to get a page of Items");
        long userId =  userService.getUserWithAuthorities().orElseThrow(()-> new  BadRequestAlertException(
            "there is no one logged","","")).getId();

        Page<Item> page;
        if (search.contains("#")) {
            // substring to remove #
            page = itemRepository.findAllLikedHashtag(pageable, search.substring(1), category1, category2, category3, userId);
        } else {
            page = itemRepository.findAllLiked(pageable, search, category1, category2, category3, userId);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }


    /**
     * {@code GET  /items} : get all the items.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of items in body.
     */

    @GetMapping("/search")
    public ResponseEntity<List<Item>> getAllItemsForSearch(Pageable pageable, @RequestParam(value = "search", required = false) String search,
                                                           @RequestParam(value = "category1", required = false) Category category1,
                                                           @RequestParam(value = "category2", required = false) Category category2,
                                                           @RequestParam(value = "category3", required = false) Category category3) {
        log.debug("REST request to get a page of Items");
        Page<Item> page;
        if (search.contains("#")) {
            // substring to remove #
            page = itemRepository.findAllForHashtagSearch(pageable, search.substring(1), category1, category2, category3);
        } else {
            page = itemRepository.findAllForSearch(pageable, search, category1, category2, category3);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

        /**
     * {@code GET  /items} : get all items of logged user.
     *
     * @return the {@link List<Item>} with status {@code 200 (OK)} and the list of items in body.
     */
    @GetMapping("/items/logged")
    public List<Item> getItemsOfLoggedUser() {
        log.debug("REST request to get items of logged User");
        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();
        if(!userLogin.isPresent()){
            throw new BadRequestAlertException("Could not get currently logged user","","");
        }
        return itemRepository.findItemsOfUser(userLogin.get());
    }

    /**
     * {@code GET  /items} : get all items of user.
     *
     * @param login the login of the user.
     * @return the {@link List<Item>} with status {@code 200 (OK)} and the list of items in body.
     */
    @GetMapping("/items/user/{login:" + Constants.LOGIN_REGEX + "}")
    public List<Item> getItemsOfUser(@PathVariable String login) {
        log.debug("REST request to get items of User");
        return itemRepository.findItemsOfUser(login);
    }

    /**
     * {@code GET  /items/:id} : get the "id" item.
     *
     * @param id the id of the item to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the item, or with status {@code 404 (Not Found)}.
     */

    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        log.debug("REST request to get Item : {}", id);
        Optional<Item> item = itemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(item);
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<Item> getItemNoJoin(@PathVariable Long id) {
        log.debug("REST request to get Item : {}", id);
        Optional<Item> item = itemRepository.findByIdLeftJoin(id);
        return ResponseUtil.wrapOrNotFound(item);
    }

    /**
     * {@code DELETE  /items/:id} : delete the "id" item.
     *
     * @param id the id of the item to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        log.debug("REST request to delete Item : {}", id);
        itemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
