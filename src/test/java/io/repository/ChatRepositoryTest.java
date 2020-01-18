package io.repository;

import io.domain.chat.Chat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.*;

import static org.junit.jupiter.api.Assertions.*;

//2.chat, 3.chat, 4.chat and 5.chat will be test file

class ChatRepositoryTest {
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void initAll(){
        chatRepository = new ChatRepository(userRepository);
    }

    @Test
    void testGetChat() throws IOException {
        //chat does not exist
        File file = new File("data\\chat\\3.chat");
        file.delete();
        Chat chat = chatRepository.getChat((long) 3);
        Chat chat1 = new Chat(chat.getChat());
        assertNotNull(chat);
        assertNotNull(chat1);
        assertEquals(chat.getChat(), chat1.getChat());
        assertNotSame(chat, chat1);

        //chat exists
        File file1 = new File("data\\chat\\4.chat");
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file1));
        bufferedWriter.write("");
        Chat chat2 = chatRepository.getChat((long) 4);
        Chat chat3 = new Chat(chat2.getChat());
        assertNotNull(chat2);
        assertNotNull(chat3);
        assertEquals(chat2.getChat(), chat3.getChat());
        assertNotSame(chat2, chat3);
    }

    @Test
    void testAddMessage() throws IOException {
        //when file exists
        File file = new File("data\\chat\\2.chat");
        PrintWriter writer = new PrintWriter(file);
        writer.print("");
        writer.close();
        chatRepository.addMessage((long) 2, "user", "now", "hi there");
        BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
        String fileContent = "";
        String line;
        while ( (line = bufferedReader.readLine()) != null) {
            fileContent += line;
        }
        assertNotNull(fileContent);
        assertEquals("<user:user;time:now>hi there", fileContent);



    }

}
