package org.cfms.vehicleservicecfms.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@Configuration
// stable DTO-based serialization for pageable data, ensuring that the resulting JSON structure is consistent.
// Why this essential is because (serializing this to JSON may lead to unstable or inconsistent JSON structures in Page Output)
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class Config {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
