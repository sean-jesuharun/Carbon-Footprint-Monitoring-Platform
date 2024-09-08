package com.cfms.inventorycfms.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class config {

    @Bean
    public ModelMapper modelMapper(){
        ModelMapper modelMapper = new ModelMapper();

//        // Custom mapping for VendorSupply to VendorSupplyDTO
//        modelMapper.typeMap(Vendor.class, VendorDTO.class).addMappings(mapper -> {
//            mapper.map(src -> src.getVendorSupplies(),
//                    VendorDTO::setProductList);
//        });

        // Custom mapping for VendorSupply to VendorSupplyDTO
        modelMapper.typeMap(VendorSupply.class, VendorSupplyDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getProductionMatrix().getRegion(),
                    VendorSupplyDTO::setRegion);
            mapper.map(src -> src.getProductionMatrix().getAnimalSpecies(),
                    VendorSupplyDTO::setAnimalSpecies);
            mapper.map(src -> src.getProductionMatrix().getProductionSystem(),
                    VendorSupplyDTO::setProductionSystem);
            mapper.map(src -> src.getProductionMatrix().getCommodity(),
                    VendorSupplyDTO::setCommodity);
        });

        return modelMapper;
    }

}
