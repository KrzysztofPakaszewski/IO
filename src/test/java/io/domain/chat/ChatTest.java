package io.domain.chat;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class ChatTest {

    @Test
    public void testGetChat() {
        ArrayList<ChatItem> chatItems = new ArrayList<>();
        ChatItem chatItem = new ChatItem("user", "three minutes ago", "hi");
        ChatItem chatItem1 = new ChatItem("user1", "two minutes ago", "hello");
        chatItems.add(chatItem);
        chatItems.add(chatItem1);
        Chat chat = new Chat(chatItems);
        assertNotNull(chat);
        assertEquals(2, chat.getChat().size());
        assertTrue(chat.getChat().contains(chatItem));
        assertTrue(chat.getChat().contains(chatItem1));
    }

    @Test
    public void testGetChat1(){
        Chat chat = new Chat();
        ChatItem chatItem = new ChatItem("user", "three minutes ago", "hi");
        ChatItem chatItem1 = new ChatItem("user1", "two minutes ago", "hello");
        chat.getChat().add(chatItem);
        chat.getChat().add(chatItem1);
        assertNotNull(chat);
        assertEquals(2, chat.getChat().size());
        assertTrue(chat.getChat().contains(chatItem));
        assertTrue(chat.getChat().contains(chatItem1));
    }
}
