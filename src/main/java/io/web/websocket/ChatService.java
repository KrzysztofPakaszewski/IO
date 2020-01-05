package io.web.websocket;

import io.domain.chat.Chat;
import io.security.SecurityUtils;
import io.service.ChatRepository;
import io.web.websocket.dto.MessageDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import static io.config.WebsocketConfiguration.IP_ADDRESS;

@Controller
public class ChatService implements ApplicationListener<SessionDisconnectEvent> {

    private static final Logger log = LoggerFactory.getLogger(ChatService.class);

    private DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatRepository chatRepository;

    public ChatService(SimpMessageSendingOperations messagingTemplate, ChatRepository chatRepository) {
        this.messagingTemplate = messagingTemplate;
        this.chatRepository = chatRepository;
    }


    @SubscribeMapping("/chat/public/{room}")
    public ArrayList<MessageDTO> subscribe(@DestinationVariable String room, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        String login = SecurityUtils.getCurrentUserLogin().orElse("anonymoususer");
        String ipAddress = stompHeaderAccessor.getSessionAttributes().get(IP_ADDRESS).toString();
        // TODO dodać do sesji room
        //        HttpSession session = session();
//        session.setAttribute("chatId", room);
        log.debug("User {} subscribed to Chat from IP {}", login, ipAddress);
        MessageDTO messageDTO = new MessageDTO();
//        messageDTO.setUserLogin(login);
//        messageDTO.setTime(dateTimeFormatter.format(ZonedDateTime.now()));
//        messageDTO.setMessage("<<join>>");
        messagingTemplate.convertAndSend("/chat/public/"+room, messageDTO);

        Chat chat = chatRepository.getChat(Long.parseLong(room), principal.getName());
        ArrayList<MessageDTO> result = new ArrayList<>();
        chat.getChat().forEach(item -> {
            MessageDTO msg = new MessageDTO();
            msg.setUserLogin(item.getOwner());
            msg.setTime(item.getTime());
            msg.setMessage(item.getMessage());
            result.add(msg);
        });
        return result;
    }

    @MessageMapping("/chat/{room}")
    @SendTo("/chat/public/{room}")
    public MessageDTO sendChat(@DestinationVariable String room, @Payload MessageDTO messageDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        messageDTO.setUserLogin(principal.getName());
        MessageDTO result = setupMessageDTO(messageDTO, stompHeaderAccessor, principal);
        chatRepository.addMessage(Long.parseLong(room), principal.getName(), messageDTO.getTime(), messageDTO.getMessage());
        return result;
    }

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        // when the user disconnects, send a message saying that hey are leaving
        log.info("{} disconnected from the chat websockets", event.getUser().getName());
        // TODO pobrac room z sesji
//        HttpSession session = session();
//        String room = session.getAttribute("chatId").toString();
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setUserLogin(event.getUser().getName());
        messageDTO.setTime(dateTimeFormatter.format(ZonedDateTime.now()));
        messageDTO.setMessage("<<left>>");
        messagingTemplate.convertAndSend("/chat/public", messageDTO);
    }

    private MessageDTO setupMessageDTO (MessageDTO messageDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        messageDTO.setTime(dateTimeFormatter.format(ZonedDateTime.now()));
        log.debug("Sending user chat data {}", messageDTO);
        return messageDTO;
    }

    public static HttpSession session() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession(true); // true == allow create
    }
}
