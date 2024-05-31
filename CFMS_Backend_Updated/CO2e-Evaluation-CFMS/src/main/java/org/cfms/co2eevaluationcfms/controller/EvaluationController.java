package org.cfms.co2eevaluationcfms.controller;

import org.cfms.co2eevaluationcfms.dto.EvaluationReqDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationResDTO;
import org.cfms.co2eevaluationcfms.service.implementation.EvaluationServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("evaluations")
@CrossOrigin
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
