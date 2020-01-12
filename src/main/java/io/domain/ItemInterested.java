package io.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.jws.soap.SOAPBinding;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Item Interested.
 */
@Entity
@Table(name = "item_interested")
public class ItemInterested implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    ItemInterestedKey id;

    @ManyToOne
    @MapsId("interested_id")
    @JoinColumn(name="interested_id")
    private User interested;

    @ManyToOne
    @MapsId("item_id")
    @JoinColumn(name = "item_id")
    private Item item;

    public ItemInterested(){}

    public ItemInterested(User interested,Item item){
        this.id = new ItemInterestedKey(interested,item);
        this.item = item;
        this.interested = interested;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public User getInterested() {
        return interested;
    }

    public void setInterested(User interested) {
        this.interested= interested;
    }
    public ItemInterested interested(User interested) {
        this.interested = interested;
        return this;
    }

    public Item getItem() {
        return item;
    }

    public void setItem( Item item){
        this.item = item;
    }

    public ItemInterested item(Item item) {
        this.item = item;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemInterested)) {
            return false;
        }
        return interested.equals(((ItemInterested) o).interested) && item.equals(((ItemInterested) o ).item);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Item Interested";
    }
}

@Embeddable
class ItemInterestedKey implements Serializable{
    @Column(name = "interested_id")
    Long interestedId;

    @Column(name = "item_id")
    Long itemId;

    public ItemInterestedKey(){}

    public ItemInterestedKey(User interested, Item item){
        this.interestedId = interested.getId();
        this.itemId = item.getId();
    }

    public Long getInterestedId() {
        return interestedId;
    }

    public void setInterestedId(Long interestedId) {
        this.interestedId = interestedId;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemInterestedKey that = (ItemInterestedKey) o;
        return interestedId.equals(that.interestedId) &&
            itemId.equals(that.itemId);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}
