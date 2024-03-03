package com.cfms.cfms.controller;

import com.cfms.cfms.model.Transportation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class TransportationController {

    private RestTemplate restTemplate;

    @Autowired
    public TransportationController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping("/transportationData")
    public void transportationDataProcess(@RequestBody Transportation transportation){

        // URL of Flask-API
        String url = "";

        // Create Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create request entity with Transportation Data
        HttpEntity<Transportation> requestEntity = new HttpEntity<>(transportation, headers);

        // make a POST request for Flask API to get Transportation object with predicted co2Emission value
        ResponseEntity<Transportation> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Transportation.class);

    }

}
