package org.cfms.co2eevaluationcfms.service;

import org.cfms.co2eevaluationcfms.dto.EvaluationReqDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationResDTO;

import java.util.List;

public interface EvaluationService {

    List<EvaluationResDTO> getEvaluations();

    EvaluationResDTO addEvaluation(EvaluationReqDTO evaluationReqDTO);
}
