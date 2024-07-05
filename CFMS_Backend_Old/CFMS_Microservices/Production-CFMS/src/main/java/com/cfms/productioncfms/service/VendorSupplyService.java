package com.cfms.productioncfms.service;

import com.cfms.productioncfms.dto.VendorSupplyResDTO;
import com.cfms.productioncfms.entity.ProductionMatrix;
import com.cfms.productioncfms.entity.Vendor;
import com.cfms.productioncfms.entity.VendorSupply;
import com.cfms.productioncfms.entity.VendorSupplyKey;
import com.cfms.productioncfms.repository.ProductionMatrixRepository;
import com.cfms.productioncfms.repository.VendorRepository;
import com.cfms.productioncfms.repository.VendorSupplyRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class VendorSupplyService {

    private VendorSupplyRepository vendorSupplyRepository;
    private final VendorRepository vendorRepository;
    private final ProductionMatrixRepository productionMatrixRepository;
    private ProductionEmissionService productionEmissionService;
    private ProductionKafkaProducerService productionKafkaProducerService;
    private ModelMapper modelMapper;

    @Autowired
    public VendorSupplyService(VendorSupplyRepository vendorSupplyRepository, VendorRepository vendorRepository, ProductionMatrixRepository productionMatrixRepository, ProductionEmissionService productionEmissionService, ProductionKafkaProducerService productionKafkaProducerService, ModelMapper modelMapper) {
        this.vendorSupplyRepository = vendorSupplyRepository;
        this.vendorRepository = vendorRepository;
        this.productionMatrixRepository = productionMatrixRepository;
        this.productionEmissionService = productionEmissionService;
        this.productionKafkaProducerService = productionKafkaProducerService;
        this.modelMapper = modelMapper;
    }

    // Adding Vendor Supply.
    public void addVendorSupply(Vendor vendor, String productName, ProductionMatrix productionMatrix){

        // Creating vendorSupplyKey (composite key) & Transient vendorSupply Entity
        VendorSupply vendorSupply = VendorSupply.builder()
                .vendorSupplyKey(VendorSupplyKey.builder()
                        .vendor(vendor)
                        .productName(productName)
                        .build())
                .productionMatrix(productionMatrix)
                .build();

        // Saving VendorSupply
        vendorSupplyRepository.save(vendorSupply);

        // // Produce VendorSupplyInventory Data
        // productionKafkaProducerService.produceVendorSupplyInventory(vendor.getVendorName(), productName);
    }

    // Process the INBOUND Transported Product Data for production Purposes.
    @Transactional
    public void updateQuantityAndCO2eEmission(String vendorName, String productName, Integer quantity) {

        // Retrieving the VendorSupply from the DataBase using VendorSupplyKey (Vendor & ProductName).
        VendorSupply vendorSupply = vendorSupplyRepository.findById(VendorSupplyKey.builder()
                .vendor(vendorRepository.findByVendorName(vendorName))
                .productName(productName)
                .build()).get();

        // Retrieving the ProductionMatrix Details of the relevant VendorSupply.
        ProductionMatrix productionMatrix = productionMatrixRepository.findById(vendorSupply.getProductionMatrix().getProductionMatrixId()).get();

        // Predicting Production CO2eEmission Per Kg.
        double predictedProductionCO2eEmissionPerKg = productionEmissionService.predictProductionEmission(productionMatrix.getRegion(), productionMatrix.getAnimalSpecies(), productionMatrix.getProductionSystem(), productionMatrix.getCommodity());

        // Calculating Total Production CO2e Emission.
        double totalProductionCO2eEmission = calculateTotalProductionCO2eEmission(predictedProductionCO2eEmissionPerKg, quantity);

        // Updating Production Emission.
        vendorSupply.setCo2eEmission(vendorSupply.getCo2eEmission() + totalProductionCO2eEmission);

        // Updating Product Supplied Quantity
        vendorSupply.setSuppliedQuantity(vendorSupply.getSuppliedQuantity() + quantity);

    }

    // Calculating Total Production Emission using Quantity and predictedProductionCO2eEmissionPerKg.
    public double calculateTotalProductionCO2eEmission(double predictedProductionCO2eEmissionPerKg, int quantity){

        return predictedProductionCO2eEmissionPerKg*quantity;
    }


    // Retrieve Supply Details of a particular Product.
    public List<VendorSupplyResDTO> retrieveSupplyData(String productName, String vendorName) {

        // Retrieving all VendorSupplies and map to VendorSupplyResDTO
        List<VendorSupplyResDTO> vendorSupplyResDTOList = vendorSupplyRepository.findAll().stream()
                .map(vendorSupply -> modelMapper.map(vendorSupply, VendorSupplyResDTO.class))
                .toList();

        // Filter Vendor Supplies by ProductName && VendorName
        if (productName != null && vendorName != null){
            return vendorSupplyResDTOList.stream()
                    .filter(VendorSupplyResDTO -> productName.equalsIgnoreCase(VendorSupplyResDTO.getProductName()) && vendorName.equalsIgnoreCase(VendorSupplyResDTO.getVendorName()))
                    .toList();
        } else if (productName != null){
            return vendorSupplyResDTOList.stream()
                    .filter(VendorSupplyResDTO -> productName.equalsIgnoreCase(VendorSupplyResDTO.getProductName()))
                    .toList();
        } else if (vendorName != null) {
            return vendorSupplyResDTOList.stream()
                    .filter(VendorSupplyResDTO -> vendorName.equalsIgnoreCase(VendorSupplyResDTO.getVendorName()))
                    .toList();
        } else {
            return vendorSupplyResDTOList;
        }

    }

//    // Process the INBOUND Transported Product Data for production Purposes.
//    @Transactional
//    public void processProduction(TransportationDataDTO transportationDataDTO) {
//
//        if (transportationDataDTO.getTransportationType().equals("INBOUND")){
//
//            for (TransportInventoryDataDTO transportInventory: transportationDataDTO.getTransportInventoryList()) {
//
//                // Retrieving the VendorSupply from the DataBase using VendorSupplyKey (Vendor & ProductName).
//                VendorSupply vendorSupply = vendorSupplyRepository.findById(VendorSupplyKey.builder()
//                        .vendor(vendorRepository.findByVendorName(transportationDataDTO.getVendorName()))
//                        .productName(transportInventory.getProductName())
//                        .build()).get();
//
//                // Retrieving the ProductionMatrix Details of the relevant VendorSupply.
//                ProductionMatrix productionMatrix = productionMatrixRepository.findById(vendorSupply.getProductionMatrix().getProductionMatrixId()).get();
//
//                // Predicting Production CO2eEmission Per Kg.
//                double predictedProductionCO2eEmissionPerKg = productionEmissionService.predictProductionEmission(productionMatrix.getRegion(), productionMatrix.getAnimalSpecies(), productionMatrix.getProductionSystem(), productionMatrix.getCommodity());
//
//                // Calculating Total Production CO2e Emission.
//                double totalProductionCO2eEmission = calculateTotalProductionCO2eEmission(predictedProductionCO2eEmissionPerKg, transportInventory.getQuantity());
//
//                // Updating Production Emission.
//                vendorSupply.setCo2eEmission(vendorSupply.getCo2eEmission() + totalProductionCO2eEmission);
//
//                // Updating Product Supplied Quantity
//                vendorSupply.setSuppliedQuantity(vendorSupply.getSuppliedQuantity() + transportInventory.getQuantity());
//
//            }
//        }
//
//    }

}
