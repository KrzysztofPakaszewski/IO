package io.repository;
import io.domain.MatchingEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the MatchingEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatchingEntityRepository extends JpaRepository<MatchingEntity, Long> {

    @Query("select matchingEntity from MatchingEntity matchingEntity where matchingEntity.forUser.login = ?#{principal.username}")
    List<MatchingEntity> findByForUserIdIsCurrentUser();

    @Query("select matchingEntity from MatchingEntity matchingEntity where matchingEntity.matching.id =?1")
    List<MatchingEntity> findByMatchingId(Long matchingId);

    @Query("select matchingEntity from MatchingEntity matchingEntity where matchingEntity.item.id =?1")
    List<MatchingEntity> findByItemId(Long itemId);


}
