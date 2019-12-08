package io.service;

import io.domain.User;
import io.domain.chat.Chat;
import io.domain.chat.ChatItem;
import io.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
public class ChatService {

    private static final String path = "data\\chat\\";
    private UserRepository userRepository;
    private HttpSession httpSession;

    public ChatService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Chat getChat(Long id, Long userId) {
        Chat chat = loadChat(id, userId);
        if (chat == null) {
            chat = createChat(id);
        }
        return chat;
    }

    public void addMessage(Long id, User user, String message) {
        String textToWrite = "<user:" + user.getId() + ">" + message + "\n";
        try {
            Files.write(
                Paths.get(path + id + ".chat"),
                textToWrite.getBytes(),
                StandardOpenOption.APPEND);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private Chat createChat(Long id) {
        File file = new File(path + id + ".chat");
        try {
            file.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new Chat();
    }

    private Chat loadChat(Long id, Long userId) {
        String fileContent = readFile(id);
        if(fileContent != null) {
            return parseFile(fileContent, userId);
        } else {
            return null;
        }
    }

    private String readFile(Long id) {
        Path filePath = Paths.get(path + id + ".chat");
        String path = System.getProperty("user.dir");
        if(Files.exists(filePath)) {
            String result = null;
            try {
                result = String.join("\n",
                    Files.readAllLines(filePath, Charset.forName("UTF-8")));
            } catch (IOException e) {
                e.printStackTrace();
            }
            return result;
        } else {
            return null;
        }
    }

    private Chat parseFile(String fileContent, Long userId) {

        ArrayList<ChatItem> chatItems = new ArrayList<>();

        String regex = "<user:(\\d)>(.*)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(fileContent);

        Map<Long, String> users = new HashMap<>();
        users.put(userId, "ja");

        while (matcher.find()) {
            Long id  = Long.parseLong(matcher.group(1));
            String msg = matcher.group(2);
            if (!users.containsKey(id)) {
                User user = getUser(id);
                String name = user.getFirstName() + " " + user.getLastName();
                users.put(id, name);
            }

            ChatItem chatItem = new ChatItem(users.get(id), msg);
            chatItems.add(chatItem);
        }
        return new Chat(chatItems);
    }

    private User getUser(Long id) {
        return userRepository.findById(id).get();
    }
}
