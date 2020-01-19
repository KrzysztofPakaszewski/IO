package io.repository;
import io.domain.Matching;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Matching entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatchingRepository extends JpaRepository<Matching, Long> {

    @Query("select matching from Matching matching join fetch MatchingEntity me on matching.id = me.matching.id " +
        " join fetch User u on u.id = me.forUser.id " +
        "where u.login = ?1")
    List<Matching> findAllMatchingsOfUser(String login);

}
