package org.cfms.co2eevaluationcfms.dto;

import lombok.Data;

import java.util.List;

@Data
public class EvaluationDTO {

    private Long id;
    private String jobName;
    private Long customerId;
    private Long vehicleId;
    private List<ResultDTO> results;

}
