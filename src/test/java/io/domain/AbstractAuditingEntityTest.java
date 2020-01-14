package io.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

class AbstractAuditingEntityTest extends AbstractAuditingEntity{
    private AbstractAuditingEntity abstractAuditingEntity;

    @BeforeEach
    void initAll(){
        abstractAuditingEntity = new AbstractAuditingEntityTest();
        abstractAuditingEntity.setCreatedBy("Author");
        abstractAuditingEntity.setCreatedDate(Instant.parse("2018-11-30T18:35:24.00Z"));
        abstractAuditingEntity.setLastModifiedBy("Modificator");
        abstractAuditingEntity.setLastModifiedDate(Instant.parse("2018-12-30T18:35:24.00Z"));
    }

    @Test
    void testGetCreatedBy() {
        assertNotNull(abstractAuditingEntity);
        assertEquals("Author", abstractAuditingEntity.getCreatedBy());
    }

    @Test
    void testSetCreatedBy() {
        abstractAuditingEntity.setCreatedBy("NewAuthor");
        assertNotNull(abstractAuditingEntity.getCreatedBy());
        assertEquals("NewAuthor", abstractAuditingEntity.getCreatedBy());
    }

    @Test
    void testGetCreatedDate() {
        assertNotNull(abstractAuditingEntity.getCreatedDate());
        assertEquals(Instant.parse("2018-11-30T18:35:24.00Z"), abstractAuditingEntity.getCreatedDate());
    }

    @Test
    void testSetCreatedDate() {
        abstractAuditingEntity.setCreatedDate(Instant.parse("2018-10-30T18:35:24.00Z"));
        assertNotNull(abstractAuditingEntity.getCreatedDate());
        assertEquals(Instant.parse("2018-10-30T18:35:24.00Z"), abstractAuditingEntity.getCreatedDate());
    }

    @Test
    void testGetLastModifiedBy() {
        assertNotNull(abstractAuditingEntity.getLastModifiedBy());
        assertEquals("Modificator", abstractAuditingEntity.getLastModifiedBy());
    }

    @Test
    void testSetLastModifiedBy() {
        abstractAuditingEntity.setLastModifiedBy("LastModificator");
        assertNotNull(abstractAuditingEntity.getLastModifiedBy());
        assertEquals("LastModificator", abstractAuditingEntity.getLastModifiedBy());
    }

    @Test
    void testGetLastModifiedDate() {
        assertNotNull(abstractAuditingEntity.getLastModifiedDate());
        assertEquals(Instant.parse("2018-12-30T18:35:24.00Z"), abstractAuditingEntity.getLastModifiedDate());
    }

    @Test
    void testSetLastModifiedDate() {
        abstractAuditingEntity.setLastModifiedDate(Instant.parse("2019-12-30T18:35:24.00Z"));
        assertNotNull(abstractAuditingEntity.getLastModifiedDate());
        assertEquals(Instant.parse("2019-12-30T18:35:24.00Z"), abstractAuditingEntity.getLastModifiedDate());
    }
}
