package com.cfms.productioncfms.service;

import com.cfms.productioncfms.dto.ProductionDTO;
import com.cfms.productioncfms.dto.TransportInventoryQuantityDTO;
import com.cfms.productioncfms.entity.ProductionMatrix;
import com.cfms.productioncfms.entity.VendorSupply;
import com.cfms.productioncfms.entity.VendorSupplyKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductionService {

    private VendorSupplyService vendorSupplyService;

    private VendorService vendorService;

    private ProductionMatrixService productionMatrixService;

    private ProductionEmissionService productionEmissionService;

    @Autowired
    public ProductionService(VendorSupplyService vendorSupplyService, VendorService vendorService, ProductionMatrixService productionMatrixService, ProductionEmissionService productionEmissionService) {
        this.vendorSupplyService = vendorSupplyService;
        this.vendorService = vendorService;
        this.productionMatrixService = productionMatrixService;
        this.productionEmissionService = productionEmissionService;
    }

    // Process the Transported Product Data for production Purposes.
//    public void processTransportedProductData(ProductQuantity transportedProductData){
//
//        // Convert transportationType from Utf8 to String.
//        String transportationType = transportedProductData.getTransportationType().toString();
//
//        if (transportationType.equals("INBOUND")){
//
//            // Retrieving the VendorSupply from the DataBase using VendorSupplyKey.
//            VendorSupply vendorSupply = vendorSupplyService.getVendorSupply(VendorSupplyKey.builder()
//                    .vendor(vendorService.getVendor(transportedProductData.getVendor().toString()))
//                    .productName(transportedProductData.getProductName().toString())
//                    .build());
//
//            // Retrieving the ProductionMatrix Details of the relevant VendorSupply.
//            ProductionMatrix productionMatrix = productionMatrixService.getProductionMatrix(vendorSupply.getProductionMatrix().getProductionMatrixId());
//
//            // Predicting Production CO2eEmission Per Kg.
//            double predictedProductionCO2eEmissionPerKg = productionEmissionService.predictProductionEmission(productionMatrix.getRegion(), productionMatrix.getAnimalSpecies(), productionMatrix.getProductionSystem(), productionMatrix.getCommodity());
//
//            // Calculating Total Production CO2e Emission.
//            double totalProductionCO2eEmission = calculateTotalProductionCO2eEmission(predictedProductionCO2eEmissionPerKg, transportedProductData.getQuantity());
//
//            // Updating Production Emission.
//            vendorSupply.setCo2eEmission(vendorSupply.getCo2eEmission() + totalProductionCO2eEmission);
//
//            // Updating Product Supplied Quantity
//            vendorSupply.setSuppliedQuantity(vendorSupply.getSuppliedQuantity() + transportedProductData.getQuantity());
//
//            // Saving the Updated vendor Supply with added Emission and Quantity Details.
//            vendorSupplyService.saveVendorSupply(vendorSupply);
//        }
//
//    }

    // Process the Transported Product Data for production Purposes.
    public void processProduction(ProductionDTO productionDTO) {

        if (productionDTO.getTransportationType().equals("INBOUND")){

            for (TransportInventoryQuantityDTO transportInventory: productionDTO.getTransportInventoryList()) {

                // Retrieving the VendorSupply from the DataBase using VendorSupplyKey.
                VendorSupply vendorSupply = vendorSupplyService.getVendorSupply(VendorSupplyKey.builder()
                        .vendor(vendorService.getVendor(productionDTO.getVendor()))
                        .productName(transportInventory.getProductName())
                        .build());

                // Retrieving the ProductionMatrix Details of the relevant VendorSupply.
                ProductionMatrix productionMatrix = productionMatrixService.getProductionMatrix(vendorSupply.getProductionMatrix().getProductionMatrixId());

                // Predicting Production CO2eEmission Per Kg.
                double predictedProductionCO2eEmissionPerKg = productionEmissionService.predictProductionEmission(productionMatrix.getRegion(), productionMatrix.getAnimalSpecies(), productionMatrix.getProductionSystem(), productionMatrix.getCommodity());

                // Calculating Total Production CO2e Emission.
                double totalProductionCO2eEmission = calculateTotalProductionCO2eEmission(predictedProductionCO2eEmissionPerKg, transportInventory.getQuantity());

                // Updating Production Emission.
                vendorSupply.setCo2eEmission(vendorSupply.getCo2eEmission() + totalProductionCO2eEmission);

                // Updating Product Supplied Quantity
                vendorSupply.setSuppliedQuantity(vendorSupply.getSuppliedQuantity() + transportInventory.getQuantity());

                // Saving the Updated vendor Supply with added Emission and Quantity Details.
                vendorSupplyService.saveVendorSupply(vendorSupply);

            }
        }

    }

    // Calculating Total Production Emission using Quantity and predictedProductionCO2eEmissionPerKg.
    public double calculateTotalProductionCO2eEmission(double predictedProductionCO2eEmissionPerKg, int quantity){

        return predictedProductionCO2eEmissionPerKg*quantity;
    }


}
