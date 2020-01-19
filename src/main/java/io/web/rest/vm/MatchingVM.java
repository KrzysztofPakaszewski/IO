package io.web.rest.vm;

import io.domain.Item;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class MatchingVM {

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public Item getOffered() {
        return offered;
    }

    public void setOffered(Item offered) {
        this.offered = offered;
    }

    public Item getReceived() {
        return received;
    }

    public void setReceived(Item received) {
        this.received = received;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private Long id;

    private Boolean archived;

    private Item offered;

    private Item received;

    private String description;
}
