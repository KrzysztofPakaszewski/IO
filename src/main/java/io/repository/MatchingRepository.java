package io.repository;
import io.domain.Matching;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the Matching entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatchingRepository extends JpaRepository<Matching, Long> {


    @Query("select matching from Matching matching join fetch matching.itemOffered iof join fetch matching.itemAsked ias join fetch iof.owner" +
        " join fetch ias.owner " +
        "where ias.owner.login = ?1 or iof.owner.login = ?1")
    List<Matching> findAllMatchingsOfUser(String login);


    @Query("select matching from Matching matching where matching.itemAsked.id = ?1 OR matching.itemOffered.id = ?1")
    List<Matching> findAllMatchingsThatReferenceThisItem(Long id);

    @Query("select matching from Matching matching where (matching.itemAsked.id = ?1 OR matching.itemOffered.id = ?1) AND " +
        "matching.stateOfExchange = true")
    List<Matching> findMatchingThatReferenceThisItemAndHasTrueState(Long id);

    @Query("select matching from Matching matching where matching.itemAsked.id = ?1 Or matching.itemOffered.id =?1 OR " +
        "matching.itemAsked.id = ?2 OR matching.itemOffered.id = ?2")
    List<Matching> findAllMatchingsThatReferenceTheseItems(Long idOfFirst, Long idOfSecond);
}
