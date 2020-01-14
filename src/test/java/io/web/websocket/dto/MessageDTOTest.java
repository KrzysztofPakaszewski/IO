package io.web.websocket.dto;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

//not needed, makes no sense, just for coverage

class MessageDTOTest {

    private MessageDTO messageDTO;

    @BeforeEach
    void initAll() {
        messageDTO = new MessageDTO();
        messageDTO.setUserName("user");
        messageDTO.setMessage("hi");
        messageDTO.setTime("now");
    }

    @Test
    void testGetUserName() {
        assertNotNull(messageDTO.getUserName());
        assertEquals("user", messageDTO.getUserName());
    }

    @Test
    void testSetUserName() {
        messageDTO.setUserName("admin");
        assertNotNull(messageDTO.getUserName());
        assertEquals("admin", messageDTO.getUserName());
    }

    @Test
    void testGetMessage() {
        assertNotNull(messageDTO.getMessage());
        assertEquals("hi", messageDTO.getMessage());
    }

    @Test
    void testSetMessage() {
        messageDTO.setMessage("hello");
        assertNotNull(messageDTO.getMessage());
        assertEquals("hello", messageDTO.getMessage());
    }

    @Test
    void testGetTime() {
        assertNotNull(messageDTO.getTime());
        assertEquals("now", messageDTO.getTime());
    }

    @Test
    void testSetTime() {
        messageDTO.setTime("2 minutes ago");
        assertNotNull(messageDTO.getTime());
        assertEquals("2 minutes ago", messageDTO.getTime());
    }

    @Test
    void testToString() {
        assertEquals("MessageDTO{" +
            ", message='" + "hi" + '\'' +
            ", time='" + "now" + '\'' +
            '}', messageDTO.toString());
    }
}
