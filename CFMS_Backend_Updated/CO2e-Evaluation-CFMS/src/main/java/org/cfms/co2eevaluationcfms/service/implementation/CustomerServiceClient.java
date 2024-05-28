package org.cfms.co2eevaluationcfms.service.implementation;

import org.cfms.co2eevaluationcfms.dto.customer.CustomerDTO;
import org.cfms.co2eevaluationcfms.dto.vendor.VendorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CustomerServiceClient {

    private WebClient webClient;

    @Autowired
    public CustomerServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://Customer-Service-CFMS/customers").build();
    }


    public CustomerDTO getCustomerById(Long customerId) {

        return webClient.get()
                .uri("/{customerId}", customerId)
                .retrieve()
                .bodyToMono(CustomerDTO.class)
                .block();

    }

}
