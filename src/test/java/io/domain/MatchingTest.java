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

//    @Test
//    public void itemOffered(){
//        Item item = new Item();
//        item.setCategory(Category.Books);
//        User user = new User();
//        user.setLogin("user");
//        item.setOwner(user);
//        matching = matching.itemOffered(item);
//        assertNotNull(matching);
//        assertEquals(Category.Books, matching.getItemOffered().getCategory());
//        assertEquals(item, matching.getItemOffered());
//        assertEquals("user", matching.getItemOffered().getOwner().getLogin());
//    }
//
//    @Test
//    public void testSetItemOffered(){
//        Item item = new Item();
//        item.setCategory(Category.Books);
//        User user = new User();
//        user.setLogin("user");
//        item.setOwner(user);
//        matching.setItemOffered(item);
//        assertNotNull(matching);
//        assertEquals(Category.Books, matching.getItemOffered().getCategory());
//        assertEquals(item, matching.getItemOffered());
//        assertEquals("user", matching.getItemOffered().getOwner().getLogin());
//    }
//
//    @Test
//    public void itemAsked(){
//        Item item = new Item();
//        item.setCategory(Category.Books);
//        User user = new User();
//        user.setLogin("user");
//        item.setOwner(user);
//        matching = matching.itemAsked(item);
//        assertNotNull(matching);
//        assertEquals(Category.Books, matching.getItemAsked().getCategory());
//        assertEquals(item, matching.getItemAsked());
//        assertEquals("user", matching.getItemAsked().getOwner().getLogin());
//    }
//
//    @Test
//    public void testSetItemAsked(){
//        Item item = new Item();
//        item.setCategory(Category.Books);
//        User user = new User();
//        user.setLogin("user");
//        item.setOwner(user);
//        matching.setItemAsked(item);
//        assertNotNull(matching);
//        assertEquals(Category.Books, matching.getItemAsked().getCategory());
//        assertEquals(item, matching.getItemAsked());
//        assertEquals("user", matching.getItemAsked().getOwner().getLogin());
//    }
//
//
//    @Test
//    public void testChat(){
//        matching = matching.chat("chat");
//        assertNotNull(matching.getChat());
//        assertEquals("chat", matching.getChat());
//    }
//
//    @Test
//    public void testSetChat(){
//        matching.setChat("chat");
//        assertNotNull(matching.getChat());
//        assertEquals("chat", matching.getChat());
//    }
}
