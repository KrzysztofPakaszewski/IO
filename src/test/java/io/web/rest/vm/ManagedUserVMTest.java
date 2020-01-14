package io.web.rest.vm;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class ManagedUserVMTest {
    private  ManagedUserVM managedUserVM;

    @BeforeEach
    void initAll(){
        managedUserVM = new ManagedUserVM();
        managedUserVM.setPassword("password");
        managedUserVM.setLogin("login");
        managedUserVM.setFirstName("FirstName");
        managedUserVM.setLastName("LastName");
        managedUserVM.setEmail("email");
        managedUserVM.setImageUrl("image");
        managedUserVM.setActivated(true);
        managedUserVM.setLangKey("LangKey");
        managedUserVM.setCreatedBy("CreatedBy");
        managedUserVM.setCreatedDate(Instant.parse("2018-11-30T18:35:24.00Z"));
        managedUserVM.setLastModifiedBy("ModifiedBy");
        managedUserVM.setLastModifiedDate(Instant.parse("2018-11-30T18:35:24.00Z"));
        Set<String> auth = new HashSet<>();
        auth.add("authority1");
        managedUserVM.setAuthorities(auth);
    }

    @Test
    void getPassword() {
        assertNotNull(managedUserVM.getPassword());
        assertEquals("password", managedUserVM.getPassword());
    }

    @Test
    void setPassword() {
        managedUserVM.setPassword("NewPassword");
        assertNotNull(managedUserVM.getPassword());
        assertEquals("NewPassword", managedUserVM.getPassword());
    }

    @Test
    void testToString() {
        assertEquals("ManagedUserVM{" + "UserDTO{" +
            "login='" + "login" + '\'' +
            ", firstName='" + "FirstName" + '\'' +
            ", lastName='" + "LastName" + '\'' +
            ", email='" + "email" + '\'' +
            ", imageUrl='" + "image" + '\'' +
            ", activated=" + true +
            ", langKey='" + "LangKey" + '\'' +
            ", createdBy=" + "CreatedBy" +
            ", createdDate=" + "2018-11-30T18:35:24Z" +
            ", lastModifiedBy='" + "ModifiedBy" + '\'' +
            ", lastModifiedDate=" + "2018-11-30T18:35:24Z" +
            ", authorities=" + "[authority1]" +
            "}" + "} ", managedUserVM.toString());
    }
}
