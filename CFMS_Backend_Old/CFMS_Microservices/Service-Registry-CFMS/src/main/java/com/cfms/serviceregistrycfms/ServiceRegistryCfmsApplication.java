package com.cfms.serviceregistrycfms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryCfmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceRegistryCfmsApplication.class, args);
	}

}
