package io.repository;
import io.domain.Matching;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Matching entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatchingRepository extends JpaRepository<Matching, Long> {

}
