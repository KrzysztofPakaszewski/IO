package io.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.domain.enumeration.Category;
import io.domain.enumeration.Delivery;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Item.
 */
@Entity
@Table(name = "matching_entity")
public class MatchingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_received")
    private Boolean itemReceived;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("matching_entities")
    private Matching matching;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties("matching_entities")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("matching_entities")
    private User forUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getItemReceived() {
        return itemReceived;
    }

    public Boolean isItemReceived() {
        return itemReceived;
    }

    public void setItemReceived(Boolean itemReceived) {
        this.itemReceived = itemReceived;
    }

    public Matching getMatching() {
        return matching;
    }

    public void setMatching(Matching matching) {
        this.matching = matching;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public User getForUser() {
        return forUser;
    }

    public void setForUser(User forUser) {
        this.forUser = forUser;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MatchingEntity)) {
            return false;
        }
        return id != null && id.equals(((MatchingEntity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Item{" +
            "id=" + getId() +
            ", matching='" + getMatching() + "'" +
            ", item='" + getItem() + "'" +
            ", itemReceived='" + getItemReceived() + "'" +
            ", forUser='" + getForUser() + "'" +
            "}";
    }
}
