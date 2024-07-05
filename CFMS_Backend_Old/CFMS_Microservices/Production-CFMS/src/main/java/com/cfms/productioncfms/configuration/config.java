package com.cfms.productioncfms.configuration;

import com.cfms.productioncfms.dto.VendorResDTO;
import com.cfms.productioncfms.dto.VendorSupplyResDTO;
import com.cfms.productioncfms.dto.ProductDetailResDTO;
import com.cfms.productioncfms.entity.Vendor;
import com.cfms.productioncfms.entity.VendorSupply;
import org.apache.kafka.clients.admin.NewTopic;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class config {

    // Creating a Bean Of WebClient Builder.
    @Bean
    public WebClient.Builder webClientBuilder(){
        return WebClient.builder();
    }

    // Creating a Kafka Topic called "vendorSupplyInventory"
    @Bean
    public NewTopic vendorSupplyInventory(){
        return TopicBuilder.name("vendorSupplyInventory")
                .build();
    }


    // ModelMapper Configurations.
    @Bean
    public ModelMapper modelMapper(){

        // Creating ModelMapper Instance.
        ModelMapper modelMapper = new ModelMapper();

        // Custom mapping for Vendor to VendorResDTO
        modelMapper.typeMap(Vendor.class, VendorResDTO.class).addMappings(mapper -> {
            mapper.map(Vendor::getVendorName,
                    VendorResDTO::setVendorName);
            mapper.map(Vendor::getLocation,
                    VendorResDTO::setLocation);
            mapper.map(Vendor::getVendorSupplies,
                    VendorResDTO::setSupplyProductDetailList);
        });

        // Custom mapping for VendorSupply to ProductDetailResDTO
        modelMapper.typeMap(VendorSupply.class, ProductDetailResDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getVendorSupplyKey().getProductName(),
                    ProductDetailResDTO::setProductName);
            mapper.map(src -> src.getProductionMatrix().getRegion(),
                    ProductDetailResDTO::setRegion);
            mapper.map(src -> src.getProductionMatrix().getAnimalSpecies(),
                    ProductDetailResDTO::setAnimalSpecies);
            mapper.map(src -> src.getProductionMatrix().getProductionSystem(),
                    ProductDetailResDTO::setProductionSystem);
            mapper.map(src -> src.getProductionMatrix().getCommodity(),
                    ProductDetailResDTO::setCommodity);
        });

        // Custom mapping for VendorSupply to VendorSupplyResDTO
        modelMapper.typeMap(VendorSupply.class, VendorSupplyResDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getVendorSupplyKey().getProductName(),
                    VendorSupplyResDTO::setProductName);
            mapper.map(src -> src.getVendorSupplyKey().getVendor().getVendorName(),
                    VendorSupplyResDTO::setVendorName);
            mapper.map(VendorSupply::getSuppliedQuantity,
                    VendorSupplyResDTO::setSuppliedQuantity);
            mapper.map(VendorSupply::getCo2eEmission,
                    VendorSupplyResDTO::setCo2eEmission);
        });

        return modelMapper;
    }



}
