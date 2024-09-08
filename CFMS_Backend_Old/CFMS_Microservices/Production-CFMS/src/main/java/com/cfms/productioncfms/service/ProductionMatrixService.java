package com.cfms.productioncfms.service;

import com.cfms.productioncfms.dto.ProductDetailDataDTO;
import com.cfms.productioncfms.entity.ProductionMatrix;
import com.cfms.productioncfms.entity.Vendor;
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
    public void addProductionMatrix(List<ProductDetailDataDTO> productionMatrixList, Vendor vendor){

        for (ProductDetailDataDTO productDetailDataDTO : productionMatrixList){

            ProductionMatrix productionMatrix = productionMatrixRepository.findByRegionAndAnimalSpeciesAndProductionSystemAndCommodity(productDetailDataDTO.getRegion(), productDetailDataDTO.getAnimalSpecies(), productDetailDataDTO.getProductionSystem(), productDetailDataDTO.getCommodity());

            // If Production Matrix is Not available then save it in the database.
            if (productionMatrix == null){

                // Building ProductionMatrix entity to save in database
                productionMatrix = ProductionMatrix.builder()
                        .region(productDetailDataDTO.getRegion())
                        .animalSpecies(productDetailDataDTO.getAnimalSpecies())
                        .productionSystem(productDetailDataDTO.getProductionSystem())
                        .commodity(productDetailDataDTO.getCommodity())
                        .build();

                // Saving ProductionMatrix.
                // (Changed to SEQUENCE) :- Since it has auto-generated IDENTITY value then previous queries will be flushed with this.
                productionMatrixRepository.save(productionMatrix);
            }

            // Adding the VendorSupply with Vendor, ProductName, ProductionMatrix.
            // Convert productName to UpperCase
            vendorSupplyService.addVendorSupply(vendor, productDetailDataDTO.getProductName().toUpperCase(), productionMatrix);

        }

    }

}
