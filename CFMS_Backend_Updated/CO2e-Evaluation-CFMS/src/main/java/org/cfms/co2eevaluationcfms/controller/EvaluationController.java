package org.cfms.co2eevaluationcfms.controller;

import org.cfms.co2eevaluationcfms.dto.DeliveryDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationDTO;
import org.cfms.co2eevaluationcfms.service.implementation.EvaluationServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("evaluations")
@CrossOrigin
public class EvaluationController {

    private EvaluationServiceImple evaluationServiceImple;

    @Autowired
    public EvaluationController(EvaluationServiceImple evaluationServiceImple) {
        this.evaluationServiceImple = evaluationServiceImple;
    }

    @GetMapping
    public List<EvaluationDTO> getEvaluations() {
        return evaluationServiceImple.getEvaluations();
    }

    @PostMapping
    public EvaluationDTO addEvaluation(@RequestBody DeliveryDTO deliveryDTO) {
        return evaluationServiceImple.addEvaluation(deliveryDTO);
    }
}
