package io.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    private User user;

    @BeforeEach
    void initAll(){
        user = new User();
        user.setId((long)1);
        user.setLogin("user");
        user.setPassword("password");
        user.setFirstName("FirstName");
        user.setLastName("LastName");
        user.setEmail("email@gmail.com");
        user.setImageUrl("image");
        user.setActivated(true);
        user.setActivationKey("ActivationKey");
        user.setResetKey("ResetKey");
        user.setResetDate(Instant.parse("2099-11-30T18:35:24.00Z"));
        user.setLangKey("LangKey");
        Set<Authority> authoritySet = new HashSet<>();
        authoritySet.add(new Authority());
        user.setAuthorities(authoritySet);
    }

    @Test
    void testGetId() {
        assertNotNull(user.getId());
        assertEquals((long)1, (long)user.getId());
    }

    @Test
    void testSetId() {
        user.setId((long)2);
        assertNotNull(user.getId());
        assertEquals((long)2, (long)user.getId());
    }

    @Test
    void getLogin() {
        assertNotNull(user.getLogin());
        assertEquals("user", user.getLogin());
    }

    @Test
    void setLogin() {
        user.setLogin("login");
        assertNotNull(user.getLogin());
        assertEquals("login", user.getLogin());
    }

    @Test
    void getPassword() {
        assertNotNull(user.getPassword());
        assertEquals("password", user.getPassword());
    }

    @Test
    void setPassword() {
        user.setPassword("newPassword");
        assertNotNull(user.getPassword());
        assertEquals("newPassword", user.getPassword());
    }

    @Test
    void getFirstName() {
        assertNotNull(user.getFirstName());
        assertEquals("FirstName", user.getFirstName());
    }

    @Test
    void setFirstName() {
        user.setFirstName("NewName");
        assertNotNull(user.getFirstName());
        assertEquals("NewName", user.getFirstName());
    }

    @Test
    void getLastName() {
        assertNotNull(user.getLastName());
        assertEquals("LastName", user.getLastName());
    }

    @Test
    void setLastName() {
        user.setLastName("NewName");
        assertNotNull(user.getLastName());
        assertEquals("NewName", user.getLastName());
    }

    @Test
    void getEmail() {
        assertNotNull(user.getEmail());
        assertEquals("email@gmail.com", user.getEmail());
    }

    @Test
    void setEmail() {
        user.setEmail("newEmail@gmail.com");
        assertNotNull(user.getEmail());
        assertEquals("newEmail@gmail.com", user.getEmail());
    }

    @Test
    void getImageUrl() {
        assertNotNull(user.getImageUrl());
        assertEquals("image", user.getImageUrl());
    }

    @Test
    void setImageUrl() {
        user.setImageUrl("newImage");
        assertNotNull(user.getImageUrl());
        assertEquals("newImage", user.getImageUrl());
    }

    @Test
    void getActivated() {
        assertNotNull(user.getActivated());
        assertTrue(user.getActivated());
        assertEquals(true, user.getActivated());
    }

    @Test
    void setActivated() {
        user.setActivated(false);
        assertFalse(user.getActivated());
        assertEquals(false, user.getActivated());
    }

    @Test
    void getActivationKey() {
        assertNotNull(user.getActivationKey());
        assertEquals("ActivationKey", user.getActivationKey());
    }

    @Test
    void setActivationKey() {
        user.setActivationKey("NewActivationKey");
        assertNotNull(user.getActivationKey());
        assertEquals("NewActivationKey", user.getActivationKey());
    }

    @Test
    void getResetKey() {
        assertNotNull(user.getResetKey());
        assertEquals("ResetKey", user.getResetKey());
    }

    @Test
    void setResetKey() {
        user.setResetKey("NewResetKey");
        assertNotNull(user.getResetKey());
        assertEquals("NewResetKey", user.getResetKey());
    }

    @Test
    void getResetDate() {
        assertNotNull(user.getResetDate());
        assertEquals(Instant.parse("2099-11-30T18:35:24.00Z"), user.getResetDate());
    }

    @Test
    void setResetDate() {
        user.setResetDate(Instant.parse("2089-11-30T18:35:24.00Z"));
        assertNotNull(user.getResetDate());
        assertEquals(Instant.parse("2089-11-30T18:35:24.00Z"), user.getResetDate());
    }

    @Test
    void getLangKey() {
        assertNotNull(user.getLangKey());
        assertEquals("LangKey", user.getLangKey());
    }

    @Test
    void setLangKey() {
        user.setLangKey("NewLangKey");
        assertNotNull(user.getLangKey());
        assertEquals("NewLangKey", user.getLangKey());
    }

    @Test
    void getAuthorities() {
        assertNotNull(user.getAuthorities());
        assertEquals(1, user.getAuthorities().size());
    }

    @Test
    void setAuthorities() {
        Set<Authority> auth = new HashSet<>();
        Authority auth1 = new Authority();
        auth.add(auth1);
        user.setAuthorities(auth);
        assertNotNull(user.getAuthorities());
        assertEquals(1, user.getAuthorities().size());
    }

    @Test
    void testEquals() {
        User user = new User();
        user.setId((long)1);
        User user1 = new User();
        user1.setId((long)1);
        assertTrue(user.equals(user1));
        Item item = new Item();
        assertFalse(user.equals(item));
    }

    @Test
    void testHashCode() {
        assertNotNull(user.hashCode());
        assertEquals(31, user.hashCode());
    }

    @Test
    void testToString() {
        assertEquals("User{" +
            "login='" + "user" + '\'' +
            ", firstName='" + "FirstName" + '\'' +
            ", lastName='" + "LastName" + '\'' +
            ", email='" + "email@gmail.com" + '\'' +
            ", imageUrl='" + "image" + '\'' +
            ", activated='" + true + '\'' +
            ", langKey='" + "LangKey" + '\'' +
            ", activationKey='" + "ActivationKey" + '\'' +
            "}", user.toString());
    }
}
