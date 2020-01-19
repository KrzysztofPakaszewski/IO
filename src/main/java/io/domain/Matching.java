package io.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

//    @Column(name = "offeror_received")
//    private Boolean offerorReceived;
//
//    @Column(name = "asker_received")
//    private Boolean askerReceived;

    @Column(name = "description")
    private String description;


//    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "matching_entity",
        joinColumns = {@JoinColumn(name = "matching_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "item_id", referencedColumnName = "id")})

    @BatchSize(size = 20)
    private Set<Item> items = new HashSet<>();


    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "matching_id")
    private Set<MatchingEntity> matchingEntities = new HashSet<>();


    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

    public Set<MatchingEntity> getMatchingEntities() {
        return matchingEntities;
    }

    public void setMatchingEntities(Set<MatchingEntity> matchingEntities) {
        this.matchingEntities = matchingEntities;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public Boolean isOfferorReceived() {
//        return offerorReceived;
//    }
//
//    public Matching offerorReceived(Boolean offerorReceived) {
//        this.offerorReceived = offerorReceived;
//        return this;
//    }
//
//    public void setOfferorReceived(Boolean offerorReceived) {
//        this.offerorReceived = offerorReceived;
//    }
//
//    public Boolean isAskerReceived() {
//        return askerReceived;
//    }
//
//    public Matching askerReceived(Boolean askerReceived) {
//        this.askerReceived = askerReceived;
//        return this;
//    }
//
//    public void setAskerReceived(Boolean askerReceived) {
//        this.askerReceived = askerReceived;
//    }
//

    public String getDescription() {
        return description;
    }

    public Matching description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    public Item getItemOffered() {
//        return itemOffered;
//    }
//
//    public Matching itemOffered(Item item) {
//        this.itemOffered = item;
//        return this;
//    }
//
//    public void setItemOffered(Item item) {
//        this.itemOffered = item;
//    }
//
//    public Item getItemAsked() {
//        return itemAsked;
//    }
//
//    public Matching itemAsked(Item item) {
//        this.itemAsked = item;
//        return this;
//    }
//
//    public void setItemAsked(Item item) {
//        this.itemAsked = item;
//    }
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
            ", description='" + getDescription() + "'" +
            "}";
    }
}
