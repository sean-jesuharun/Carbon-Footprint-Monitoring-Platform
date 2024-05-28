package org.cfms.co2eevaluationcfms.dto.customer;

import lombok.Data;


@Data
public class CustomerDTO {

    private Long id;
    private String customerName;
    private String location;
    private Double distanceFromWarehouse;

}
