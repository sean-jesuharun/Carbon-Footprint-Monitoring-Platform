package org.cfms.co2eevaluationcfms.repository;

import org.cfms.co2eevaluationcfms.entity.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
}
