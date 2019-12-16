package io.domain.chat;

import io.domain.User;

public class ChatItem {

    private String owner;
    private String time;
    private String message;

    public ChatItem(String owner, String time, String message) {
        this.owner = owner;
        this.time = time;
        this.message = message;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
