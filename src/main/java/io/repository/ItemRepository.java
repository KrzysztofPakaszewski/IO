package io.repository;
import io.domain.Item;

import io.domain.MatchingEntity;
import io.domain.User;
import io.domain.enumeration.Category;
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

    @Query("select item from Item item where item.owner.login = ?#{principal.username} and item.archived = false")
    List<Item> findByOwnerIsCurrentUser();

    @Query(value = "select item from Item item join fetch User u on u.id = item.owner.id where u.login = ?#{principal.username} and item.archived = false",
        countQuery = "select count(item) from Item item join fetch User u on u.id = item.owner.id where u.login = ?#{principal.username}")
    Page<Item> findAll(Pageable pageable);

    @Query(value = "select item from Item item where lower(item.title) like %:search% and (item.category =:category1 or item.category =:category2 or item.category =:category3) and item.archived = false",
        countQuery = "select count(item) from Item item  where lower(item.title) like %:search% and (item.category =:category1 or item.category =:category2 or item.category =:category3) and item.archived = false")
    Page<Item> findAllForSearch(Pageable pageable, @Param("search") String search, @Param("category1") Category category1, @Param("category2") Category category2, @Param("category3") Category category3);

    @Query(value = "select item from Item item where lower(item.hash)=:search and (item.category =:category1 or item.category =:category2 or item.category =:category3)  and item.archived = false",
        countQuery = "select count(item) from Item item  where lower(item.hash)=:search and (item.category =:category1 or item.category =:category2 or item.category =:category3)  and item.archived = false")
    Page<Item> findAllForHashtagSearch(Pageable pageable, @Param("search") String search, @Param("category1") Category category1, @Param("category2") Category category2, @Param("category3") Category category3);

    @Query(value = "select item from Item item join item.interesteds ii where " +
        "ii.id = :userId and lower(item.title) like %:search% and (item.category =:category1 or item.category =:category2 or item.category =:category3)  and item.archived = false",
        countQuery = "select count(item) from Item item join item.interesteds ii where " +
            "ii.id = :userId and lower(item.title) like %:search% and (item.category =:category1 or item.category =:category2 or item.category =:category3)  and item.archived = false")
    Page<Item> findAllLiked(Pageable pageable, @Param("search") String search, @Param("category1") Category category1, @Param("category2") Category category2,
                            @Param("category3") Category category3, @Param("userId") long userId);

    @Query(value = "select item from Item item join item.interesteds ii where " +
        "ii.id = :userId and lower(item.hash)=:search and (item.category =:category1 or item.category =:category2 or item.category =:category3)  and item.archived = false",
        countQuery = "select count(item) from Item item join item.interesteds ii where " +
            "ii.id = :userId and lower(item.hash)=:search and (item.category =:category1 or item.category =:category2 or item.category =:category3)  and item.archived = false")
    Page<Item> findAllLikedHashtag(Pageable pageable, @Param("search") String search, @Param("category1") Category category1, @Param("category2") Category category2,
                                   @Param("category3") Category category3, @Param("userId") long userId);

    @Query("select item from Item item join fetch item.owner where item.id = ?1")
    Optional<Item> findById( Long id);

    @Query("select item from Item item left join fetch item.owner left join fetch item.interesteds where item.id = ?1")
    Optional<Item> findByIdLeftJoin( Long id);

    @Query("select item from Item item join fetch item.owner ow where ow.login = ?1")
    List<Item> findItemsOfUser(String login);

    @Query("select user from Item item join item.interesteds ii join User user on ii.id = user.id where item.id = :item_id")
    List<User> getUsersInterestedIn(@Param("item_id") long item_id);

    @Query("select item from Item item join fetch MatchingEntity matchingEntity on item.id = matchingEntity.item.id " +
        "join fetch User user on item.owner = user.id where matchingEntity.matching.id =?1 and user.login =?2")
    List<Item> findOfferedItem(Long matchingId, String userLogin);

    @Query("select item from Item item join fetch MatchingEntity matchingEntity on item.id = matchingEntity.item.id " +
        "join fetch User user on matchingEntity.forUser.id = user.id where matchingEntity.matching.id =?1 and user.login = ?2")
    List<Item> findReceivedItem(Long matchingId, String userLogin);

}
