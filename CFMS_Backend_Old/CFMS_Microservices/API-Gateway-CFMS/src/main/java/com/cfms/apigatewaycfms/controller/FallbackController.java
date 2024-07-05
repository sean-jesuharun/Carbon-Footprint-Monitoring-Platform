package com.cfms.apigatewaycfms.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("fallback")
public class FallbackController {

    @PostMapping("transportationFallback")
    public String transportationFallback(){
        return "Transportation Service Currently not Available";
    }

    @PostMapping("productionFallback")
    public String productionFallback(){
        return "Production Service Currently not Available";
    }

//    @PostMapping("transportationFallback/{segment}")
//    public String transportationFallbackSegment(@PathVariable("segment") String testSegment){
//        return testSegment + " Service Currently not Available";
//    }

}
