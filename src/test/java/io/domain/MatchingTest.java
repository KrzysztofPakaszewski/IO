package io.domain;

import io.domain.chat.Chat;
import io.domain.enumeration.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import io.web.rest.TestUtil;

public class MatchingTest {
    private Matching matching;

    @BeforeEach
    void initAll(){
        matching = new Matching();
        matching.setId((long)1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Matching.class);
        Matching matching1 = new Matching();
        matching1.setId(1L);
        Matching matching2 = new Matching();
        matching2.setId(matching1.getId());
        assertThat(matching1).isEqualTo(matching2);
        matching2.setId(2L);
        assertThat(matching1).isNotEqualTo(matching2);
        matching1.setId(null);
        assertThat(matching1).isNotEqualTo(matching2);
    }

    @Test
    public void testGetId(){
        assertNotNull(matching.getId());
        assertEquals((long)1, (long)matching.getId());
    }

    @Test
    public void testSetId(){
        matching.setId((long)2);
        assertNotNull(matching.getId());
        assertEquals((long)2, (long)matching.getId());
        assertNotEquals((long)1, (long)matching.getId());
    }


    @Test
    public void testDescriptiont(){
        matching = matching.description("description");
        assertNotNull(matching.getDescription());
        assertEquals("description", matching.getDescription());
    }

    @Test
    public void testSetDescription(){
        matching.setDescription("description");
        assertNotNull(matching.getDescription());
        assertEquals("description", matching.getDescription());
    }
}
