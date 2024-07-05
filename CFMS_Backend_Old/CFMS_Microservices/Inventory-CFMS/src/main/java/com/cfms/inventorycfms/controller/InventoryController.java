package com.cfms.inventorycfms.controller;

import com.cfms.inventorycfms.dto.InventoryDTO;
import com.cfms.inventorycfms.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("inventory")
public class InventoryController {

    private InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping("inventoryData")
    @ResponseStatus(HttpStatus.CREATED)
    public String productionDataProcess(@RequestBody InventoryDTO inventoryDTO){
        inventoryService.updateInventoryQuantity(inventoryDTO);
        return"Success";
    }

}
