package org.cfms.co2eevaluationcfms.controller;

import org.cfms.co2eevaluationcfms.dto.EvaluationReqDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationResDTO;
import org.cfms.co2eevaluationcfms.service.implementation.EvaluationServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("evaluations")
public class EvaluationController {

    private EvaluationServiceImple evaluationServiceImple;

    @Autowired
    public EvaluationController(EvaluationServiceImple evaluationServiceImple) {
        this.evaluationServiceImple = evaluationServiceImple;
    }

    @PostMapping
    public EvaluationResDTO addEvaluation(@RequestBody EvaluationReqDTO evaluationReqDTO) {

        return evaluationServiceImple.addEvaluation(evaluationReqDTO);

    }
}
