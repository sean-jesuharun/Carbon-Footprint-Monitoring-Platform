package org.cfms.co2eevaluationcfms.controller;

import jakarta.validation.Valid;
import org.cfms.co2eevaluationcfms.dto.SupplyDTO;
import org.cfms.co2eevaluationcfms.service.implementation.SupplyServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("supplies")
@CrossOrigin
public class SupplyController extends AbstractController{

    private SupplyServiceImple supplyServiceImple;

    @Autowired
    public SupplyController(SupplyServiceImple supplyServiceImple) {
        this.supplyServiceImple = supplyServiceImple;
    }

    @GetMapping
    public ResponseEntity<Object> getSupplies() {
        return handleSuccessfulOkResponse(supplyServiceImple.getSupplies());
    }

    @PostMapping
    public ResponseEntity<Object> createSupply(@Valid @RequestBody SupplyDTO supplyDTO) {
        return handleSuccessfulCreatedResponse(supplyServiceImple.createSupply(supplyDTO));
    }

    @DeleteMapping("{supplyId}/products/{productName}")
    public void removeProductFromSupply(@PathVariable Long supplyId, @PathVariable String productName) {
        supplyServiceImple.removeProductFromSupply(supplyId, productName);
    }

}
