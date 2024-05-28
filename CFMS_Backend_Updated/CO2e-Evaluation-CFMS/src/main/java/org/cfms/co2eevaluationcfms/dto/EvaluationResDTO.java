package org.cfms.co2eevaluationcfms.dto;

import lombok.Data;
import org.cfms.co2eevaluationcfms.entity.Result;

import java.util.List;

@Data
public class EvaluationResDTO {

    private Long id;

    private String jobName;

    private Long customerId;

    private Long vehicleId;

    private List<ResultDTO> results;


}
