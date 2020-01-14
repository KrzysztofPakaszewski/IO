package io.domain;

import io.domain.enumeration.Category;
import io.domain.enumeration.Delivery;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import io.web.rest.TestUtil;

import java.util.HashSet;
import java.util.Set;

public class ItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Item.class);
        Item item1 = new Item();
        item1.setId(1L);
        Item item2 = new Item();
        item2.setId(item1.getId());
        assertThat(item1).isEqualTo(item2);
        item2.setId(2L);
        assertThat(item1).isNotEqualTo(item2);
        item1.setId(null);
        assertThat(item1).isNotEqualTo(item2);
    }

    @Test
    public void testInteresteds(){
        Set<User> users = new HashSet<>();
        User user = new User();
        user.setLogin("user");
        User user1 = new User();
        user1.setLogin("admin");
        users.add(user);
        users.add(user1);
        Item item = new Item();
        item = item.interesteds(users);
        assertNotNull(item);
        assertEquals(users.size(), item.getInteresteds().size());
        assertTrue(item.getInteresteds().contains(user));
        assertTrue(item.getInteresteds().contains(user1));
    }

    @Test
    public void testSetInteresteds(){
        Set<User> users = new HashSet<>();
        User user = new User();
        user.setLogin("user");
        User user1 = new User();
        user1.setLogin("admin");
        users.add(user);
        users.add(user1);
        Item item = new Item();
        item.setInteresteds(users);
        assertNotNull(item);
        assertNotNull(users);
        assertEquals(users.size(), item.getInteresteds().size());
        assertTrue(item.getInteresteds().contains(user));
        assertTrue(item.getInteresteds().contains(user1));
    }

    @Test
    public void testAddInteresteds(){
        Item item = new Item();
        User user = new User();
        user.setLogin("user");
        User user1 = new User();
        user1.setLogin("admin");
        item.addInterested(user);
        item.addInterested(user1);
        assertNotNull(item);
        assertEquals(2, item.getInteresteds().size());
        assertTrue(item.getInteresteds().contains(user));
        assertTrue(item.getInteresteds().contains(user1));
    }
    @Test
    public void testRemoveInteresteds(){
        Item item = new Item();
        User user = new User();
        user.setLogin("user");
        User user1 = new User();
        user1.setLogin("admin");
        item.addInterested(user);
        item.addInterested(user1);
        item.removeInterested(user1);
        assertNotNull(item);
        assertEquals(1, item.getInteresteds().size());
        assertTrue(item.getInteresteds().contains(user));
        assertFalse(item.getInteresteds().contains(user1));
    }

    @Test
    public void testTitle(){
        Item item = new Item();
        item = item.title("title");
        assertNotNull(item.getTitle());
        assertEquals("title", item.getTitle());
    }

    @Test
    public void testSetTitle(){
        Item item = new Item();
        item.setTitle("title");
        assertNotNull(item.getTitle());
        assertEquals("title", item.getTitle());
    }


    @Test
    public void testState(){
        Item item = new Item();
        item = item.state("new");
        assertNotNull(item.getState());
        assertEquals("new", item.getState());
    }

    @Test
    public void testSetState(){
        Item item = new Item();
        item.setState("new");
        assertNotNull(item.getState());
        assertEquals("new", item.getState());
    }

    @Test
    public void testCategory(){
        Item item = new Item();
        item = item.category(Category.Books);
        assertNotNull(item.getCategory());
        assertEquals(Category.Books, item.getCategory());
    }

    @Test
    public void testSetCategory(){
        Item item = new Item();
        item.setCategory(Category.Books);
        assertNotNull(item.getCategory());
        assertEquals(Category.Books, item.getCategory());
    }

    @Test
    public void testImage(){
        Item item = new Item();
        byte[] image = "image".getBytes();
        item = item.image(image);
        assertNotNull(item.getImage());
        assertEquals(image, item.getImage());
    }

    @Test
    public void testSetImage(){
        Item item = new Item();
        byte[] image = "image".getBytes();
        item.setImage(image);
        assertNotNull(item.getImage());
        assertEquals(image, item.getImage());
    }

    @Test
    public void testImageContentType(){
        Item item = new Item();
        item = item.imageContentType("jpg");
        assertNotNull(item.getImageContentType());
        assertEquals("jpg", item.getImageContentType());
    }

    @Test
    public void testSetImageContentType(){
        Item item = new Item();
        item.setImageContentType("jpg");
        assertNotNull(item.getImageContentType());
        assertEquals("jpg", item.getImageContentType());
    }

    @Test
    public void testHash(){
        Item item = new Item();
        item = item.hash("11");
        assertNotNull(item.getHash());
        assertEquals("11", item.getHash());
    }

    @Test
    public void testSetHash(){
        Item item = new Item();
        item.setHash("11");
        assertNotNull(item.getHash());
        assertEquals("11", item.getHash());
    }

    @Test
    public void testPreferences(){
        Item item = new Item();
        item = item.preferences("HP");
        assertNotNull(item.getPreferences());
        assertEquals("HP", item.getPreferences());
    }

    @Test
    public void testSetPreferences(){
        Item item = new Item();
        item.setPreferences("HP");
        assertNotNull(item.getPreferences());
        assertEquals("HP", item.getPreferences());
    }

    @Test
    public void testPreferdDelivery(){
        Item item = new Item();
        item = item.preferedDelivery(Delivery.Courier);
        assertNotNull(item.getPreferedDelivery());
        assertEquals(Delivery.Courier, item.getPreferedDelivery());
    }

    @Test
    public void testSetPreferdDelivery(){
        Item item = new Item();
        item.setPreferedDelivery(Delivery.Courier);
        assertNotNull(item.getPreferedDelivery());
        assertEquals(Delivery.Courier, item.getPreferedDelivery());
    }

    @Test
    public void testOwner(){
        Item item = new Item();
        User user = new User();
        user.setLogin("user");
        item = item.owner(user);
        assertNotNull(item.getOwner());
        assertEquals(user, item.getOwner());
        assertEquals(user.getLogin(), item.getOwner().getLogin());
    }

    @Test
    public void testSetOwner(){
        Item item = new Item();
        User user = new User();
        user.setLogin("user");
        item.setOwner(user);
        assertNotNull(item.getOwner());
        assertEquals(user, item.getOwner());
        assertEquals(user.getLogin(), item.getOwner().getLogin());
    }
}
