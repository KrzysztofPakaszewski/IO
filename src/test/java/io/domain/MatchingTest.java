package io.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.web.rest.TestUtil;

public class MatchingTest {

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
}
