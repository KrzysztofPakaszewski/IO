package io.repository;
import io.domain.Review;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Review entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select review from Review review where review.reviewer.login = ?#{principal.username}")
    List<Review> findByReviewerIsCurrentUser();

    @Query("select review from Review review where review.user.login = ?#{principal.username}")
    List<Review> findByUserIsCurrentUser();

    @Query("select review from Review review join fetch review.reviewer where review.id = ?1")
    Optional<Review> findByIdFetch(long id);

    @Query("select review from Review review join fetch review.reviewer where review.user.login = ?1")
    List<Review> findByUserLogin(String login);
}
