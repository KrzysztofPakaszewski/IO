package io.web.websocket.dto;

/**
 * DTO for storing a user's message.
 */
public class MessageDTO {

    private String userName;

    private String message;

    private String time;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "MessageDTO{" +
            ", message='" + message + '\'' +
            ", time='" + time + '\'' +
            '}';
    }
}
