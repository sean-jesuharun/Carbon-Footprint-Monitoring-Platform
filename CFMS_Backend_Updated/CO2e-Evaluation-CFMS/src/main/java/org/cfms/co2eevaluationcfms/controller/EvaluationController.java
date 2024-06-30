package org.cfms.co2eevaluationcfms.controller;

import jakarta.validation.Valid;
import org.cfms.co2eevaluationcfms.dto.DeliveryDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationDTO;
import org.cfms.co2eevaluationcfms.service.implementation.EvaluationServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("evaluations")
@CrossOrigin
public class EvaluationController extends AbstractController{

    private EvaluationServiceImple evaluationServiceImple;

    @Autowired
    public EvaluationController(EvaluationServiceImple evaluationServiceImple) {
        this.evaluationServiceImple = evaluationServiceImple;
    }

    @GetMapping
    public ResponseEntity<Object> getEvaluations() {
        return handleSuccessfulOkResponse(evaluationServiceImple.getEvaluations());
    }

    @PostMapping
    public ResponseEntity<Object> addEvaluation(@Valid @RequestBody DeliveryDTO deliveryDTO) {
        System.out.println(deliveryDTO);
        return handleSuccessfulCreatedResponse(evaluationServiceImple.addEvaluation(deliveryDTO));
    }

    @DeleteMapping("{evaluationId}")
    public ResponseEntity<HttpStatus> deleteEvaluationById(@PathVariable Long evaluationId) {
        evaluationServiceImple.deleteEvaluationById(evaluationId);
        return handleSuccessfulNoContentResponse();
    }

}
