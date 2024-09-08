package org.cfms.co2eevaluationcfms.service;

import org.cfms.co2eevaluationcfms.dto.DeliveryDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationDTO;

import java.util.List;

public interface EvaluationService {

    List<EvaluationDTO> getEvaluations();

    EvaluationDTO addEvaluation(DeliveryDTO deliveryDTO);

    void deleteEvaluationById(Long evaluationId);
}
