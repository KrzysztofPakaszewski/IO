package io.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Matching.
 */
@Entity
@Table(name = "matching")
public class Matching implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "state_of_exchange")
    private Boolean stateOfExchange;

    @Column(name = "chat")
    private String chat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("matchings")
    private Item itemOffered;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("matchings")
    private Item itemAsked;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isStateOfExchange() {
        return stateOfExchange;
    }

    public Matching stateOfExchange(Boolean stateOfExchange) {
        this.stateOfExchange = stateOfExchange;
        return this;
    }

    public void setStateOfExchange(Boolean stateOfExchange) {
        this.stateOfExchange = stateOfExchange;
    }

    public String getChat() {
        return chat;
    }

    public Matching chat(String chat) {
        this.chat = chat;
        return this;
    }

    public void setChat(String chat) {
        this.chat = chat;
    }

    public Item getItemOffered() {
        return itemOffered;
    }

    public Matching itemOffered(Item item) {
        this.itemOffered = item;
        return this;
    }

    public void setItemOffered(Item item) {
        this.itemOffered = item;
    }

    public Item getItemAsked() {
        return itemAsked;
    }

    public Matching itemAsked(Item item) {
        this.itemAsked = item;
        return this;
    }

    public void setItemAsked(Item item) {
        this.itemAsked = item;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Matching)) {
            return false;
        }
        return id != null && id.equals(((Matching) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Matching{" +
            "id=" + getId() +
            ", stateOfExchange='" + isStateOfExchange() + "'" +
            ", chat='" + getChat() + "'" +
            "}";
    }
}
