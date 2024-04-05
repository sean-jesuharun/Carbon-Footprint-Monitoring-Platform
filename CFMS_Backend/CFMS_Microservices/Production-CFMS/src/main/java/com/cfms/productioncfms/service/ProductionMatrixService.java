package com.cfms.productioncfms.service;

import com.cfms.productioncfms.dto.ProductionMatrixDTO;
import com.cfms.productioncfms.entity.ProductionMatrix;
import com.cfms.productioncfms.entity.Vendor;
import com.cfms.productioncfms.entity.VendorSupply;
import com.cfms.productioncfms.entity.VendorSupplyKey;
import com.cfms.productioncfms.repository.ProductionMatrixRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionMatrixService {

    private ProductionMatrixRepository productionMatrixRepository;

    private VendorSupplyService vendorSupplyService;

    @Autowired
    public ProductionMatrixService(ProductionMatrixRepository productionMatrixRepository, VendorSupplyService vendorSupplyService) {
        this.productionMatrixRepository = productionMatrixRepository;
        this.vendorSupplyService = vendorSupplyService;
    }

    // Add new ProductionMatrix if it's not available already.
    public void addProductionMatrix(List<ProductionMatrixDTO> productMatrixList, Vendor vendor){

        for (ProductionMatrixDTO productionMatrixDTO: productMatrixList){

            ProductionMatrix productionMatrix = getProductionMatrix(productionMatrixDTO);

            // If Production Matrix is Not available then save it in the database.
            if (productionMatrix == null){

                // Building ProductionMatrix entity to save in database
                productionMatrix = ProductionMatrix.builder()
                        .region(productionMatrixDTO.getRegion())
                        .animalSpecies(productionMatrixDTO.getAnimalSpecies())
                        .productionSystem(productionMatrixDTO.getProductionSystem())
                        .commodity(productionMatrixDTO.getCommodity())
                        .build();

                // Saving ProductionMatrix.
                productionMatrix = saveProductionMatrix(productionMatrix);

            }

            // Adding the VendorSupply with Vendor, ProductName, ProductionMatrix.
            vendorSupplyService.addVendorSupply(vendor, productionMatrixDTO.getProductName(), productionMatrix);

        }

    }

    public ProductionMatrix saveProductionMatrix(ProductionMatrix productionMatrix){
        return productionMatrixRepository.save(productionMatrix);
    }

    public ProductionMatrix getProductionMatrix(ProductionMatrixDTO productionMatrixDTO){
        return productionMatrixRepository.getProductionMatrix(productionMatrixDTO.getRegion(), productionMatrixDTO.getAnimalSpecies(), productionMatrixDTO.getProductionSystem(), productionMatrixDTO.getCommodity());
    }

    public ProductionMatrix getProductionMatrix(Long productionMatrixId){
        return productionMatrixRepository.findById(productionMatrixId).get();
    }
}
