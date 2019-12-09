package io.repository;
import io.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("select item from Item item where item.owner.login = ?#{principal.username}")
    List<Item> findByOwnerIsCurrentUser();

    @Query(value = "select item from Item item join fetch item.owner",
            countQuery = "select count(item) from Item item join item.owner")
    Page<Item> findAll(Pageable pageable);

    @Query(value = "select item from Item item",
        countQuery = "select count(item) from Item item")
    Page<Item> findAllForSearch(Pageable pageable);

    @Query("select item from Item item join fetch item.owner where item.id = ?1")
    Optional<Item> findById( Long id);
}
