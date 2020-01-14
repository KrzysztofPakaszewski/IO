package io.web.rest.vm;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ChatMessageTest {
    private ChatMessage chatMessage;

    @BeforeEach
    void initAll(){
        chatMessage = new ChatMessage();
        chatMessage.setId((long)1);
        chatMessage.setMessage("hi");
    }

    @Test
    void setId() {
        chatMessage.setId((long)2);
        assertNotNull(chatMessage.getId());
        assertEquals((long)2, (long)chatMessage.getId());
    }

    @Test
    void setMessage() {
        chatMessage.setMessage("hello");
        assertNotNull(chatMessage.getMessage());
        assertEquals("hello", chatMessage.getMessage());
    }

    @Test
    void getId() {
        assertNotNull(chatMessage.getId());
        assertEquals((long)1, (long)chatMessage.getId());
    }

    @Test
    void getMessage() {
        assertNotNull(chatMessage.getMessage());
        assertEquals("hi", chatMessage.getMessage());
    }
}
