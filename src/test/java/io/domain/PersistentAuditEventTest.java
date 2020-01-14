package io.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class PersistentAuditEventTest {
    private PersistentAuditEvent persistentAuditEvent;

    @BeforeEach
    void initAll(){
        persistentAuditEvent = new PersistentAuditEvent();
        persistentAuditEvent.setId((long)1);
        persistentAuditEvent.setPrincipal("principal");
        persistentAuditEvent.setAuditEventDate(Instant.parse("2018-11-30T18:35:24.00Z"));
        persistentAuditEvent.setAuditEventType("AuditEventType");
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        persistentAuditEvent.setData(map);
    }

    @Test
    void testGetId() {
        assertNotNull(persistentAuditEvent.getId());
        assertEquals((long)1, (long)persistentAuditEvent.getId());
    }

    @Test
    void testSetId() {
        persistentAuditEvent.setId((long)2);
        assertNotNull(persistentAuditEvent.getId());
        assertEquals((long)2, (long)persistentAuditEvent.getId());
    }

    @Test
    void testGetPrincipal() {
        assertNotNull(persistentAuditEvent.getPrincipal());
        assertEquals("principal", persistentAuditEvent.getPrincipal());
    }

    @Test
    void testSetPrincipal() {
        persistentAuditEvent.setPrincipal("NewPrincipal");
        assertNotNull(persistentAuditEvent.getPrincipal());
        assertEquals("NewPrincipal", persistentAuditEvent.getPrincipal());
    }

    @Test
    void testGetAuditEventDate() {
        assertNotNull(persistentAuditEvent.getAuditEventDate());
        assertEquals(Instant.parse("2018-11-30T18:35:24.00Z"), persistentAuditEvent.getAuditEventDate());
    }

    @Test
    void testSetAuditEventDate() {
        persistentAuditEvent.setAuditEventDate(Instant.parse("2019-11-30T18:35:24.00Z"));
        assertNotNull(persistentAuditEvent.getAuditEventDate());
        assertEquals(Instant.parse("2019-11-30T18:35:24.00Z"), persistentAuditEvent.getAuditEventDate());
    }

    @Test
    void testGetAuditEventType() {
        assertNotNull(persistentAuditEvent.getAuditEventType());
        assertEquals("AuditEventType", persistentAuditEvent.getAuditEventType());
    }

    @Test
    void testSetAuditEventType() {
        persistentAuditEvent.setAuditEventType("NewAuditEventType");
        assertNotNull(persistentAuditEvent.getAuditEventType());
        assertEquals("NewAuditEventType", persistentAuditEvent.getAuditEventType());

    }

    @Test
    void testGetData() {
        assertNotNull(persistentAuditEvent.getData());
        assertEquals(2, persistentAuditEvent.getData().size());
    }

    @Test
    void testSetData() {
        Map <String, String> map = new HashMap<>();
        map.put("key", "value");
        map.put("key1", "value1");
        assertNotNull(persistentAuditEvent.getData());
        assertEquals(2, persistentAuditEvent.getData().size());
        assertTrue(map.containsKey("key"));
        assertTrue(map.containsKey("key1"));
        assertTrue(map.containsValue("value"));
        assertTrue(map.containsValue("value1"));
    }

    @Test
    void testEquals() {
        User user = new User();
        assertFalse(persistentAuditEvent.equals(user));
        PersistentAuditEvent persistentAuditEvent1 = new PersistentAuditEvent();
        persistentAuditEvent1.setId(persistentAuditEvent.getId());
        assertTrue(persistentAuditEvent.equals(persistentAuditEvent1));
        assertTrue(persistentAuditEvent.equals(persistentAuditEvent));
        assertTrue(persistentAuditEvent1.equals(persistentAuditEvent1));
    }

    @Test
    void testHashCode() {
        assertEquals(31, persistentAuditEvent.hashCode());
    }

    @Test
    void testToString() {
        assertEquals("PersistentAuditEvent{" +
            "principal='" + "principal" + '\'' +
            ", auditEventDate=" + Instant.parse("2018-11-30T18:35:24.00Z") +
            ", auditEventType='" + "AuditEventType" + '\'' +
            '}', persistentAuditEvent.toString());
    }
}
