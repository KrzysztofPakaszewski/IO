package io.repository;

import io.domain.ItemInterested;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ItemInterested entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemInterestedRepository extends JpaRepository<ItemInterested, Long> {
}
