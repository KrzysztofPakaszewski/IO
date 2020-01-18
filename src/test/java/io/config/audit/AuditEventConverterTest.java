package io.config.audit;

import io.domain.PersistentAuditEvent;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class AuditEventConverterTest {

    @Test
    void convertToAuditEvent() {
        AuditEventConverter auditEventConverter = new AuditEventConverter();
        Iterable<PersistentAuditEvent> persistentAuditEvents = null;
        assertEquals(Collections.emptyList(), auditEventConverter.convertToAuditEvent(persistentAuditEvents));
        assertEquals(0, auditEventConverter.convertToAuditEvent(persistentAuditEvents).size());
    }

    @Test
    void convertToAuditEvent1() {
        AuditEventConverter auditEventConverter = new AuditEventConverter();
        PersistentAuditEvent persistentAuditEvent = null;
        assertEquals(null, auditEventConverter.convertToAuditEvent(persistentAuditEvent));
    }

    @Test
    void convertDataToObjects() {
        AuditEventConverter auditEventConverter = new AuditEventConverter();
        Map<String, String> map = new HashMap<>();
        map.put("key1", "1");
        map.put("key2", "2");
        assertEquals(map.size(), auditEventConverter.convertDataToObjects(map).size());
        Map<String, Object> conv = auditEventConverter.convertDataToObjects(map);
        assertTrue(conv.containsKey("key1"));
        assertTrue(conv.containsKey("key2"));
        assertTrue(conv.containsValue("1"));
        assertTrue(conv.containsValue("2"));
        assertTrue(conv.size() == 2);
    }


}
