package org.cfms.co2eevaluationcfms.configuration;

import org.cfms.co2eevaluationcfms.dto.SupplyDetailDTO;
import org.cfms.co2eevaluationcfms.dto.SupplyItemDTO;
import org.cfms.co2eevaluationcfms.entity.SupplyItem;
import org.modelmapper.ModelMapper;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class Config {

    @Bean
    public ModelMapper modelMapper() {

        ModelMapper modelMapper = new ModelMapper();

        // Custom mapping for SupplyItem to SupplyItemDTO.
        modelMapper.typeMap(SupplyItem.class, SupplyItemDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getSupplyItemKey().getProductName(),
                    SupplyItemDTO::setProductName);
        });

        // Custom mapping for SupplyItem to SupplyDetailDTO.
        modelMapper.typeMap(SupplyItem.class, SupplyDetailDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getSupply().getVendorId(),
                    SupplyDetailDTO::setVendorId);
            mapper.map(src -> src.getSupply().getVehicleId(),
                    SupplyDetailDTO::setVehicleId);
            mapper.map(src -> src.getSupply().getDate(),
                    SupplyDetailDTO::setDate);
            mapper.map(src -> src.getSupplyItemKey().getProductName(),
                    SupplyDetailDTO::setProductName);
        });

        return modelMapper;
    }

    @Bean
    @LoadBalanced
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

    @Bean
    public WebClient.Builder webClientBuilderSample() {
        return WebClient.builder();
    }

}
