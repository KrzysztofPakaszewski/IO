package io.web.rest.vm;

public class ChatMessage {

    private Long id;
    private String message;

    public void setId(Long id) {
        this.id = id;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return this.id;
    }

    public String getMessage() {
        return this.message;
    }
}
