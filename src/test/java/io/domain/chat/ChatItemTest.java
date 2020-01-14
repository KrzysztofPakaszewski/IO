package io.domain.chat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ChatItemTest {
    private ChatItem chatItem;

    @BeforeEach
    void initAll(){
        chatItem = new ChatItem("user", "now", "hello");
     }

    @Test
    void getOwner() {
        assertNotNull(chatItem.getOwner());
        assertEquals("user", chatItem.getOwner());
    }

    @Test
    void setOwner() {
        chatItem.setOwner("admin");
        assertNotNull(chatItem.getOwner());
        assertEquals("admin", chatItem.getOwner());
        assertNotEquals("user", chatItem.getOwner());
    }

    @Test
    void getTime() {
        assertNotNull(chatItem.getTime());
        assertEquals("now", chatItem.getTime());
    }

    @Test
    void setTime() {
        chatItem.setTime("two minutes ago");
        assertNotNull(chatItem.getTime());
        assertEquals("two minutes ago", chatItem.getTime());
        assertNotEquals("now", chatItem.getTime());
    }

    @Test
    void getMessage() {
        assertNotNull(chatItem.getMessage());
        assertEquals("hello", chatItem.getMessage());
    }

    @Test
    void setMessage() {
        chatItem.setMessage("hi");
        assertNotNull(chatItem.getMessage());
        assertEquals("hi", chatItem.getMessage());
        assertNotEquals("hello", chatItem.getMessage());
    }
}
