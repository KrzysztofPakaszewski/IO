package io.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

class AuthorityTest {
    private Authority authority;

    @BeforeEach
    void initAll(){
        authority = new Authority();
        authority.setName("auth");
    }

    @Test
    void testGetName() {
        assertNotNull(authority.getName());
        assertEquals("auth", authority.getName());
    }

    @Test
    void testSetName() {
        authority.setName("a");
        assertNotNull(authority.getName());
        assertEquals("a", authority.getName());
    }

    @Test
    void testEquals() {
        Authority authority1 = new Authority();
        authority1.setName(authority.getName());
        assertNotNull(authority);
        assertNotNull(authority1);
        assertTrue(authority.equals(authority));
        assertTrue(authority.equals(authority1));
        authority1.setName("a");
        assertFalse(authority.equals(authority1));
        User user = new User();
        assertFalse(authority.equals(user));
    }

    @Test
    void testHashCode() {
        assertNotNull(authority.hashCode());
        assertEquals(Objects.hashCode("auth"), authority.hashCode());
    }

    @Test
    void testToString() {
        assertEquals("Authority{" +
            "name='" + "auth" + '\'' +
            "}", authority.toString());
    }
}
