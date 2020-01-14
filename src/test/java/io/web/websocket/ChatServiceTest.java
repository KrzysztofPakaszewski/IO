package io.web.websocket;

import io.repository.ChatRepository;
import io.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;

import static io.web.websocket.ChatService.session;
import static org.junit.jupiter.api.Assertions.*;

class ChatServiceTest {

    private ChatService chatService;
    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatRepository chatRepository;

    @BeforeEach
    void initAll(){
        chatService = new ChatService(simpMessageSendingOperations,  chatRepository, userRepository);
    }

    @Test
    void testSubscribe() {
    }

    @Test
    void testSendChat() {
    }

    @Test
    void testOnApplicationEvent() {
    }

    @Test
    void testSession() {

    }
}
