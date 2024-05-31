package org.cfms.co2eevaluationcfms.controller;

import org.cfms.co2eevaluationcfms.dto.SupplyDTO;
import org.cfms.co2eevaluationcfms.service.implementation.SupplyServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("supplies")
@CrossOrigin
public class SupplyController {

    private SupplyServiceImple supplyServiceImple;

    @Autowired
    public SupplyController(SupplyServiceImple supplyServiceImple) {
        this.supplyServiceImple = supplyServiceImple;
    }

    @PostMapping
    public SupplyDTO createSupply(@RequestBody SupplyDTO supplyDTO) {
        return supplyServiceImple.createSupply(supplyDTO);
    }

}
