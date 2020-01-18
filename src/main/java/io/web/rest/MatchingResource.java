package io.web.rest;

import io.domain.Item;
import io.domain.Matching;
import io.repository.MatchingRepository;
import io.service.MatchingService;
import io.web.rest.errors.BadRequestAlertException;
import io.security.SecurityUtils;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.domain.Matching}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MatchingResource {

    private final Logger log = LoggerFactory.getLogger(MatchingResource.class);

    private static final String ENTITY_NAME = "matching";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MatchingRepository matchingRepository;
    private final MatchingService matchingService;

    public MatchingResource(MatchingRepository matchingRepository,MatchingService matchingService) {
        this.matchingRepository = matchingRepository;
        this.matchingService = matchingService;
    }

    /**
     * {@code POST  /matchings} : Create a new matching.
     *
     * @param matching the matching to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new matching, or with status {@code 400 (Bad Request)} if the matching has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/matchings")
    public ResponseEntity<Matching> createMatching(@RequestBody Matching matching) throws URISyntaxException {
        log.debug("REST request to save Matching : {}", matching);
        if (matching.getId() != null) {
            throw new BadRequestAlertException("A new matching cannot already have an ID", ENTITY_NAME, "idexists");
        }
        matching.setOfferorReceived(false);
        matching.setAskerReceived(false);
        Matching result = matchingRepository.save(matching);
        return ResponseEntity.created(new URI("/api/matchings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code POST  /matchings} : set this matching as accepted
     *
     * @param matching match to accept
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with empty body, or with status {@code 400 (Bad Request)} if Matching not
     * found or is disabled.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/matchings/accept")
    public ResponseEntity<String> acceptMatching(@RequestBody Matching matching) throws URISyntaxException {
        log.debug("REST request to create Matches for item : {}", matching);
        if (matching.getId() == null) {
            throw new BadRequestAlertException("Error! Matching has no ID", ENTITY_NAME, "noID");
        }
        matchingService.acceptGivenMatching(matching);
        matchingService.finishedMatching(matching.getId());
        return ResponseEntity.created(new URI("/api/matchings/"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, ""))
            .body("");
    }

    /**
     * {@code PUT  /matchings} : Updates an existing matching.
     *
     * @param matching the matching to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated matching,
     * or with status {@code 400 (Bad Request)} if the matching is not valid,
     * or with status {@code 500 (Internal Server Error)} if the matching couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/matchings")
    public ResponseEntity<Matching> updateMatching(@RequestBody Matching matching) throws URISyntaxException {
        log.debug("REST request to update Matching : {}", matching);
        if (matching.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Matching result = matchingRepository.save(matching);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, matching.getId().toString()))
            .body(result);
    }

    @PutMapping("/matchings/addFromSwipe")
    public ResponseEntity<String> addMatching(@RequestBody Item[] items) throws URISyntaxException {
        log.debug("REST request to create Matching : {}", items[0], items[1]);
        Matching matching = new Matching();
        matching.setItemOffered(items[0]);
        matching.setItemAsked(items[1]);
        matching.setAskerReceived(false);
        matching.setOfferorReceived(false);
        matchingRepository.save(matching);
        return ResponseEntity.created(new URI("/api/matchings/" ))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, ""))
            .body("Success adding matching for items item.id="+items[0].getId()+" and item.id="+ items[1].getId() );
    }

    /**
     * {@code GET  /matchings} : get all the matchings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of matchings in body.
     */
    @GetMapping("/matchings")
    public List<Matching> getAllMatchings() {
        log.debug("REST request to get all Matchings");
        return matchingRepository.findAll();
    }

    /**
     * {@code GET  /matchings} : get matchings for logged user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of matchings in body.
     */
    @GetMapping("/matchings/loggedUser")
    public List<Matching> getLoggedUserMatchings() {
        log.debug("REST request to get currently logged user matchings");
        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();
        if (!userLogin.isPresent()) {
            throw new BadRequestAlertException("Could not get currently logged user ", "", "");
        }
        return matchingRepository.findAllMatchingsOfUser(userLogin.get());
    }

    /**
     * {@code GET  /matchings/:id} : get the "id" matching.
     *
     * @param id the id of the matching to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the matching, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/matchings/{id}")
    public ResponseEntity<Matching> getMatching(@PathVariable Long id) {
        log.debug("REST request to get Matching : {}", id);
        Optional<Matching> matching = matchingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(matching);
    }

    /**
     * {@code DELETE  /matchings/:id} : delete the "id" matching.
     *
     * @param id the id of the matching to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/matchings/{id}")
    public ResponseEntity<Void> deleteMatching(@PathVariable Long id) {
        log.debug("REST request to delete Matching : {}", id);
        Optional< Matching> optionalMatching= matchingRepository.findById(id);
        if(optionalMatching.isPresent()) {
            Matching matching = optionalMatching.get();
            matchingService.deleteInteresteds(matching);
            matchingRepository.deleteById(id);
            matchingService.createMatchesIfPossible(matching.getItemAsked());
            matchingService.createMatchesIfPossible(matching.getItemOffered());
        }
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();

    }
}
