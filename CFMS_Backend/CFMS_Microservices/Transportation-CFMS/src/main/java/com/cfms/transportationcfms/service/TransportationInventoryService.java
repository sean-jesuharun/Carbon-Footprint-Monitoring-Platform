package com.cfms.transportationcfms.service;

import com.cfms.transportationcfms.dto.TransportInventoryResDTO;
import com.cfms.transportationcfms.dto.TransportedProductDataDTO;
import com.cfms.transportationcfms.entity.Transportation;
import com.cfms.transportationcfms.entity.TransportationInventory;
import com.cfms.transportationcfms.entity.TransportationInventoryKey;
import com.cfms.transportationcfms.repository.TransportationInventoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class TransportationInventoryService {

    private TransportationInventoryRepository transportationInventoryRepository;

    private ModelMapper modelMapper;


    @Autowired
    public TransportationInventoryService(TransportationInventoryRepository transportationInventoryRepository, ModelMapper modelMapper) {
        this.transportationInventoryRepository = transportationInventoryRepository;
        this.modelMapper = modelMapper;
    }

    // Add Transportation Inventory.
    public void addTransportationInventory(List<TransportedProductDataDTO> transportInventoryDetailList, Transportation transportation){

        // Finding the Total Quantity of Products Being involved in the Transportation.
        int totalQuantity = transportInventoryDetailList.stream()
                .mapToInt(TransportedProductDataDTO::getQuantity)
                .sum();

        // Distributing total Transportation emission between products and updating the TransportationInventory Table
        for(TransportedProductDataDTO transportInventory : transportInventoryDetailList) {

            // Creating TransportationInventoryKey (composite key) & Transient TransportationInventory Entity
            TransportationInventory transportationInventory = TransportationInventory.builder()
                    .transportationInventoryKey(TransportationInventoryKey.builder()
                            .transportation(transportation)
                            .productName(transportInventory.getProductName())
                            .build())
                    .productQuantity(transportInventory.getQuantity())
                    .co2eEmission(((double)transportInventory.getQuantity()/totalQuantity)*transportation.getCo2eEmission())
                    .build();

            // Saving TransportationInventory
            transportationInventoryRepository.save(transportationInventory);

        }
    }


    // Retrieve TransportInventory Details
    public List<TransportInventoryResDTO> retrieveTransportInventories(String productName, String vendorName) {

        // Retrieving all Transport Inventories and map to TransportInventoryResDTO
        List<TransportInventoryResDTO> transportInventoryResDTOList = transportationInventoryRepository.findAll()
                .stream()
                .map(transportationInventory -> modelMapper.map(transportationInventory, TransportInventoryResDTO.class))
                .toList();

        // Filter TransportInventories by ProductName && VendorName
        if (productName != null && vendorName != null){
            return transportInventoryResDTOList.stream()
                    .filter(transportInventoryResDTO -> productName.equalsIgnoreCase(transportInventoryResDTO.getProductName()) && vendorName.equalsIgnoreCase(transportInventoryResDTO.getVendorName()))
                    .toList();
        } else if (productName != null){
            return transportInventoryResDTOList.stream()
                    .filter(transportInventoryResDTO -> productName.equalsIgnoreCase(transportInventoryResDTO.getProductName()))
                    .toList();
        } else if (vendorName != null) {
            return transportInventoryResDTOList.stream()
                    .filter(transportInventoryResDTO -> vendorName.equalsIgnoreCase(transportInventoryResDTO.getVendorName()))
                    .toList();
        } else {
            return transportInventoryResDTOList;
        }

    }


//    public TransportationInventoryCo2eDTO getProductTransportationEmission(String productName) {
//
//        return transportationInventoryRepository.retrieveProductTransportationC02eEmissionData(productName);
//
//    }

}
