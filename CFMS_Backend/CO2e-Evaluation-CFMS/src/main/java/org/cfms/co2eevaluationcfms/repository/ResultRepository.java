package org.cfms.co2eevaluationcfms.repository;

import org.cfms.co2eevaluationcfms.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
}
