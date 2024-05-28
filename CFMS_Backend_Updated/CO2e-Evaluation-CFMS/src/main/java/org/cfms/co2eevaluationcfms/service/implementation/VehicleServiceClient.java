package org.cfms.co2eevaluationcfms.service.implementation;

import org.cfms.co2eevaluationcfms.dto.vehicle.VehicleDTO;
import org.cfms.co2eevaluationcfms.dto.vendor.VendorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class VehicleServiceClient {

    private WebClient webClient;

    @Autowired
    public VehicleServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://Vehicle-Service-CFMS/vehicles").build();
    }


    public VehicleDTO getVehicleById(Long vehicleId) {

        return webClient.get()
                .uri("/{vehicleId}", vehicleId)
                .retrieve()
                .bodyToMono(VehicleDTO.class)
                .block();

    }
}
