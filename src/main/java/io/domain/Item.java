package io.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

import io.domain.enumeration.Category;

import io.domain.enumeration.Delivery;

/**
 * A Item.
 */
@Entity
@Table(name = "item")
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "state")
    private String state;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "hash")
    private String hash;

    @Column(name = "preferences")
    private String preferences;

    @Enumerated(EnumType.STRING)
    @Column(name = "prefered_delivery")
    private Delivery preferedDelivery;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("items")
    private User owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Item title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getState() {
        return state;
    }

    public Item state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Category getCategory() {
        return category;
    }

    public Item category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public byte[] getImage() {
        return image;
    }

    public Item image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Item imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getHash() {
        return hash;
    }

    public Item hash(String hash) {
        this.hash = hash;
        return this;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public String getPreferences() {
        return preferences;
    }

    public Item preferences(String preferences) {
        this.preferences = preferences;
        return this;
    }

    public void setPreferences(String preferences) {
        this.preferences = preferences;
    }

    public Delivery getPreferedDelivery() {
        return preferedDelivery;
    }

    public Item preferedDelivery(Delivery preferedDelivery) {
        this.preferedDelivery = preferedDelivery;
        return this;
    }

    public void setPreferedDelivery(Delivery preferedDelivery) {
        this.preferedDelivery = preferedDelivery;
    }

    public User getOwner() {
        return owner;
    }

    public Item owner(User user) {
        this.owner = user;
        return this;
    }

    public void setOwner(User user) {
        this.owner = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Item)) {
            return false;
        }
        return id != null && id.equals(((Item) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Item{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", state='" + getState() + "'" +
            ", category='" + getCategory() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", hash='" + getHash() + "'" +
            ", preferences='" + getPreferences() + "'" +
            ", preferedDelivery='" + getPreferedDelivery() + "'" +
            "}";
    }
}
