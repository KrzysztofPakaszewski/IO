package io.domain.chat;

import io.domain.User;

public class ChatItem {

    private String owner;
    private String message;

    public ChatItem(String owner, String message) {
        this.owner = owner;
        this.message = message;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
