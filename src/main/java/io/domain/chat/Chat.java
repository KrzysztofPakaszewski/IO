package io.domain.chat;

import java.util.ArrayList;

public class Chat {

    private ArrayList<ChatItem> chat;

    public Chat(ArrayList<ChatItem> chat) {
        this.chat = chat;
    }

    public Chat() {
        chat = new ArrayList<>();
    }

    public ArrayList<ChatItem> getChat() {
        return chat;
    }

}
