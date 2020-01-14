package io.web.rest.vm;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LoginVMTest {
    private LoginVM loginVM;

    @BeforeEach
    void initAll(){
        loginVM = new LoginVM();
        loginVM.setPassword("password");
        loginVM.setUsername("user");
        loginVM.setRememberMe(true);
    }

    @Test
    void getUsername() {
        assertNotNull(loginVM.getUsername());
        assertEquals("user", loginVM.getUsername());
    }

    @Test
    void setUsername() {
        loginVM.setUsername("admin");
        assertNotNull(loginVM.getUsername());
        assertEquals("admin", loginVM.getUsername());
    }

    @Test
    void getPassword() {
        assertNotNull(loginVM.getPassword());
        assertEquals("password", loginVM.getPassword());
    }

    @Test
    void setPassword() {
        loginVM.setPassword("newPassword");
        assertNotNull(loginVM.getPassword());
        assertEquals("newPassword", loginVM.getPassword());
    }

    @Test
    void isRememberMe() {
        assertNotNull(loginVM.isRememberMe());
        assertTrue(loginVM.isRememberMe());
    }

    @Test
    void setRememberMe() {
        loginVM.setRememberMe(false);
        assertNotNull(loginVM.isRememberMe());
        assertFalse(loginVM.isRememberMe());
    }

    @Test
    void testToString() {
        assertEquals("LoginVM{" +
            "username='" + "user" + '\'' +
            ", rememberMe=" + true +
            '}', loginVM.toString());
    }
}
