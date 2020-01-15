package io.repository;

import io.domain.ItemInterested;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ItemInterested entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemInterestedRepository extends JpaRepository<ItemInterested, Long> {

    @Query("select items from ItemInterested items where items.item.id= ?1")
    List<ItemInterested> findByItem(Long id);

    @Query("select items from ItemInterested items where items.interested.login =?1")
    List<ItemInterested> findByUser(String login);

    @Query("select items from ItemInterested items where items.item.id = ?2 and items.interested.login = ?1")
    List<ItemInterested> findByUserAndItem(String userLogin, Long itemId);
}
