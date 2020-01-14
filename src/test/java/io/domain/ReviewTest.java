package io.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import io.web.rest.TestUtil;

public class ReviewTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Review.class);
        Review review1 = new Review();
        review1.setId(1L);
        Review review2 = new Review();
        review2.setId(review1.getId());
        assertThat(review1).isEqualTo(review2);
        review2.setId(2L);
        assertThat(review1).isNotEqualTo(review2);
        review1.setId(null);
        assertThat(review1).isNotEqualTo(review2);
    }

    @Test
    public void testUser(){
        User user = new User();
        user.setLogin("user");
        user.setFirstName("FirstName");
        user.setLastName("LastName");
        Review review = new Review();
        review = review.user(user);
        assertNotNull(review);
        assertEquals(user, review.getUser());
        assertEquals("user", review.getUser().getLogin());
        assertEquals("FirstName", review.getUser().getFirstName());
        assertEquals("LastName", review.getUser().getLastName());
    }

    @Test
    public void setUser() {
        User user = new User();
        user.setLogin("user");
        user.setFirstName("FirstName");
        user.setLastName("LastName");
        Review review = new Review();
        review.setUser(user);
        assertNotNull(review);
        assertEquals(user, review.getUser());
        assertEquals("user", review.getUser().getLogin());
        assertEquals("FirstName", review.getUser().getFirstName());
        assertEquals("LastName", review.getUser().getLastName());
    }

    @Test
    public void testScore() {
        Review review = new Review();
        review = review.score(5);
        assertNotNull(review.getScore());
        assertEquals((Integer)5, review.getScore());
    }

    @Test
    public void testSetScore(){
        Review review = new Review();
        review.setScore(5);
        assertNotNull(review.getScore());
        assertEquals((Integer)5, review.getScore());
    }

    @Test
    public void testReviewer() {
        Review review = new Review();
        User user = new User();
        user.setLogin("user");
        review = review.reviewer(user);
        assertNotNull(review.getReviewer());
        assertEquals(user, review.getReviewer());
        assertEquals(user.getLogin(), review.getReviewer().getLogin());
    }

    @Test
    public void setReviewer() {
        Review review = new Review();
        User user = new User();
        user.setLogin("user");
        review.setReviewer(user);
        assertNotNull(review.getReviewer());
        assertEquals(user, review.getReviewer());
        assertEquals(user.getLogin(), review.getReviewer().getLogin());
    }

    @Test
    public void testReview(){
        Review review = new Review();
        review = review.review("good");
        assertNotNull(review.getReview());
        assertEquals("good", review.getReview());
    }

    @Test
    public void testSetReview(){
        Review review = new Review();
        review.setReview("good");
        assertNotNull(review.getReview());
        assertEquals("good", review.getReview());
    }
}
