package io.web.websocket.dto;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

//not needed, makes no sense, just for coverage

class ActivityDTOTest {

    private ActivityDTO activityDTO;

    @BeforeEach
    void initAll(){
        activityDTO = new ActivityDTO();
        activityDTO.setSessionId("5");
        activityDTO.setUserLogin("user");
        activityDTO.setIpAddress("127.0.0.1");
        activityDTO.setPage("page");
        activityDTO.setTime(Instant.parse("2018-11-30T18:35:24.00Z"));
    }

    @Test
    void testGetSessionId() {
        assertNotNull(activityDTO.getSessionId());
        assertEquals("5", activityDTO.getSessionId());
    }

    @Test
    void testSetSessionId() {
        activityDTO.setSessionId("4");
        assertNotNull(activityDTO.getSessionId());
        assertEquals("4", activityDTO.getSessionId());
        assertNotEquals("5", activityDTO.getSessionId());
    }

    @Test
    void testGetUserLogin() {
        assertNotNull(activityDTO.getUserLogin());
        assertEquals("user", activityDTO.getUserLogin());
    }

    @Test
    void testSetUserLogin() {
        activityDTO.setUserLogin("admin");
        assertNotNull(activityDTO.getUserLogin());
        assertEquals("admin", activityDTO.getUserLogin());
        assertNotEquals("user", activityDTO.getUserLogin());
    }

    @Test
    void testGtIpAddress() {
        assertNotNull(activityDTO.getIpAddress());
        assertEquals("127.0.0.1", activityDTO.getIpAddress());
    }

    @Test
    void testSetIpAddress() {
        activityDTO.setIpAddress("127.0.0.2");
        assertNotNull(activityDTO.getIpAddress());
        assertEquals("127.0.0.2", activityDTO.getIpAddress());
        assertNotEquals("127.0.0.1", activityDTO.getIpAddress());
    }

    @Test
    void testGetPage() {
        assertNotNull(activityDTO.getPage());
        assertEquals("page", activityDTO.getPage());
    }

    @Test
    void testSetPage() {
        activityDTO.setPage("otherPage");
        assertNotNull(activityDTO.getPage());
        assertEquals("otherPage", activityDTO.getPage());
        assertNotEquals("page", activityDTO.getPage());
    }

    @Test
    void testGetTime() {
        assertNotNull(activityDTO.getTime());
        assertEquals(Instant.parse("2018-11-30T18:35:24.00Z"), activityDTO.getTime());
    }

    @Test
    void testsSetTime() {
        activityDTO.setTime(Instant.parse("2018-11-30T18:35:24.00Z").plusSeconds(5));
        assertNotNull(activityDTO.getTime());
        assertEquals(Instant.parse("2018-11-30T18:35:24.00Z").plusSeconds(5), activityDTO.getTime());
        assertNotEquals(Instant.now(), activityDTO.getTime());
    }

    @Test
    public void testToString() {
        assertEquals("ActivityDTO{" +
            "sessionId='" + "5" + '\'' +
            ", userLogin='" + "user" + '\'' +
            ", ipAddress='" + "127.0.0.1" + '\'' +
            ", page='" + "page" + '\'' +
            ", time='" + Instant.parse("2018-11-30T18:35:24.00Z") + '\'' +
            '}', activityDTO.toString());
    }
}
