package com.cfms.transportationcfms.configuration;

import com.cfms.transportationcfms.dto.TransportInventoryResDTO;
import com.cfms.transportationcfms.dto.TransportedProductResDTO;
import com.cfms.transportationcfms.dto.TransportationResDTO;
import com.cfms.transportationcfms.entity.Transportation;
import com.cfms.transportationcfms.entity.TransportationInventory;
import org.modelmapper.ModelMapper;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class Config {

    // Creating a Bean Of WebClient Builder.
    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }


    @Bean
    public ModelMapper modelMapper(){

        ModelMapper modelMapper = new ModelMapper();

        // Custom mapping for Transportation to TransportationResDTO
        modelMapper.typeMap(Transportation.class, TransportationResDTO.class).addMappings(mapper -> {
            mapper.map(Transportation::getTransportationId,
                    TransportationResDTO::setTransportationId);
            mapper.map(Transportation::getDate,
                    TransportationResDTO::setDate);
            mapper.map(src -> src.getVehicle().getVehicleId(),
                    TransportationResDTO::setVehicleId);
            mapper.map(Transportation::getFuelType,
                    TransportationResDTO::setFuelType);
            mapper.map(Transportation::getFuelConsumption,
                    TransportationResDTO::setFuelConsumption);
            mapper.map(Transportation::getTransportationType,
                    TransportationResDTO::setTransportationType);
            mapper.map(Transportation::getVendor,
                    TransportationResDTO::setVendor);
            mapper.map(Transportation::getTransportationInventories,
                    TransportationResDTO::setTransportInventoryDetailList);
        });

        // Custom mapping for TransportationInventory to TransportedProductResDTO.
        modelMapper.typeMap(TransportationInventory.class, TransportedProductResDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getTransportationInventoryKey().getProductName(),
                    TransportedProductResDTO::setProductName);
            mapper.map(TransportationInventory::getProductQuantity,
                    TransportedProductResDTO::setQuantity);
        });

        // Custom mapping for TransportationInventory to TransportInventoryResDTO.
        modelMapper.typeMap(TransportationInventory.class, TransportInventoryResDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getTransportationInventoryKey().getProductName(),
                    TransportInventoryResDTO::setProductName);
            mapper.map(src -> src.getTransportationInventoryKey().getTransportation().getVendor(),
                    TransportInventoryResDTO::setVendorName);
            mapper.map(TransportationInventory::getProductQuantity,
                    TransportInventoryResDTO::setTransportedQuantity);
            mapper.map(TransportationInventory::getCo2eEmission,
                    TransportInventoryResDTO::setCo2eEmission);
        });

        return modelMapper;

    }

}
