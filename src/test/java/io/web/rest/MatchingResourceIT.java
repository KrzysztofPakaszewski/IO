package io.web.rest;

import io.CulexApp;
import io.domain.Matching;
import io.repository.MatchingRepository;
import io.service.MatchingService;
import io.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static io.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MatchingResource} REST controller.
 */
@SpringBootTest(classes = CulexApp.class)
public class MatchingResourceIT {

    private static final Boolean DEFAULT_STATE_OF_EXCHANGE = false;
    private static final Boolean UPDATED_STATE_OF_EXCHANGE = true;

    private static final String DEFAULT_CHAT = "AAAAAAAAAA";
    private static final String UPDATED_CHAT = "BBBBBBBBBB";

    @Autowired
    private MatchingRepository matchingRepository;

    @Autowired
    private MatchingService matchingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMatchingMockMvc;

    private Matching matching;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MatchingResource matchingResource = new MatchingResource(matchingRepository,matchingService);
        this.restMatchingMockMvc = MockMvcBuilders.standaloneSetup(matchingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Matching createEntity(EntityManager em) {
        Matching matching = new Matching()
            .stateOfExchange(DEFAULT_STATE_OF_EXCHANGE)
            .chat(DEFAULT_CHAT);
        return matching;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Matching createUpdatedEntity(EntityManager em) {
        Matching matching = new Matching()
            .stateOfExchange(UPDATED_STATE_OF_EXCHANGE)
            .chat(UPDATED_CHAT);
        return matching;
    }

    @BeforeEach
    public void initTest() {
        matching = createEntity(em);
    }

    @Test
    @Transactional
    public void createMatching() throws Exception {
        int databaseSizeBeforeCreate = matchingRepository.findAll().size();

        // Create the Matching
        restMatchingMockMvc.perform(post("/api/matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matching)))
            .andExpect(status().isCreated());

        // Validate the Matching in the database
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeCreate + 1);
        Matching testMatching = matchingList.get(matchingList.size() - 1);
        assertThat(testMatching.isStateOfExchange()).isEqualTo(DEFAULT_STATE_OF_EXCHANGE);
        assertThat(testMatching.getChat()).isEqualTo(DEFAULT_CHAT);
    }

    @Test
    @Transactional
    public void createMatchingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = matchingRepository.findAll().size();

        // Create the Matching with an existing ID
        matching.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMatchingMockMvc.perform(post("/api/matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matching)))
            .andExpect(status().isBadRequest());

        // Validate the Matching in the database
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMatchings() throws Exception {
        // Initialize the database
        matchingRepository.saveAndFlush(matching);

        // Get all the matchingList
        restMatchingMockMvc.perform(get("/api/matchings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(matching.getId().intValue())))
            .andExpect(jsonPath("$.[*].stateOfExchange").value(hasItem(DEFAULT_STATE_OF_EXCHANGE.booleanValue())))
            .andExpect(jsonPath("$.[*].chat").value(hasItem(DEFAULT_CHAT)));
    }

    @Test
    @Transactional
    public void getMatching() throws Exception {
        // Initialize the database
        matchingRepository.saveAndFlush(matching);

        // Get the matching
        restMatchingMockMvc.perform(get("/api/matchings/{id}", matching.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(matching.getId().intValue()))
            .andExpect(jsonPath("$.stateOfExchange").value(DEFAULT_STATE_OF_EXCHANGE.booleanValue()))
            .andExpect(jsonPath("$.chat").value(DEFAULT_CHAT));
    }

    @Test
    @Transactional
    public void getNonExistingMatching() throws Exception {
        // Get the matching
        restMatchingMockMvc.perform(get("/api/matchings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMatching() throws Exception {
        // Initialize the database
        matchingRepository.saveAndFlush(matching);

        int databaseSizeBeforeUpdate = matchingRepository.findAll().size();

        // Update the matching
        Matching updatedMatching = matchingRepository.findById(matching.getId()).get();
        // Disconnect from session so that the updates on updatedMatching are not directly saved in db
        em.detach(updatedMatching);
        updatedMatching
            .stateOfExchange(UPDATED_STATE_OF_EXCHANGE)
            .chat(UPDATED_CHAT);

        restMatchingMockMvc.perform(put("/api/matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMatching)))
            .andExpect(status().isOk());

        // Validate the Matching in the database
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeUpdate);
        Matching testMatching = matchingList.get(matchingList.size() - 1);
        assertThat(testMatching.isStateOfExchange()).isEqualTo(UPDATED_STATE_OF_EXCHANGE);
        assertThat(testMatching.getChat()).isEqualTo(UPDATED_CHAT);
    }

    @Test
    @Transactional
    public void updateNonExistingMatching() throws Exception {
        int databaseSizeBeforeUpdate = matchingRepository.findAll().size();

        // Create the Matching

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMatchingMockMvc.perform(put("/api/matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matching)))
            .andExpect(status().isBadRequest());

        // Validate the Matching in the database
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMatching() throws Exception {
        // Initialize the database
        matchingRepository.saveAndFlush(matching);

        int databaseSizeBeforeDelete = matchingRepository.findAll().size();

        // Delete the matching
        restMatchingMockMvc.perform(delete("/api/matchings/{id}", matching.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
