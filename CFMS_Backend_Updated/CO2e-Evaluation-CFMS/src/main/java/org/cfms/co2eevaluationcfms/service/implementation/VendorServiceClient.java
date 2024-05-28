package org.cfms.co2eevaluationcfms.service.implementation;

import org.cfms.co2eevaluationcfms.dto.vendor.VendorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


@Service
public class VendorServiceClient {

    private WebClient webClient;

    @Autowired
    public VendorServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://Vendor-Service-CFMS/vendors").build();
    }


    public VendorDTO getVendorById(Long vendorId) {

        return webClient.get()
                .uri("/{vendorId}", vendorId)
                .retrieve()
                .bodyToMono(VendorDTO.class)
                .block();

    }
}
