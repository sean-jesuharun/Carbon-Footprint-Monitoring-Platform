package org.cfms.co2eevaluationcfms.service;

import org.cfms.co2eevaluationcfms.dto.EvaluationReqDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationResDTO;

public interface EvaluationService {
    EvaluationResDTO addEvaluation(EvaluationReqDTO evaluationReqDTO);
}
