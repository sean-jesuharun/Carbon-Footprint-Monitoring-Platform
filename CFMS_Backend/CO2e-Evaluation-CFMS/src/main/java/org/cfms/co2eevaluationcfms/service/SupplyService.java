package org.cfms.co2eevaluationcfms.service;

import org.cfms.co2eevaluationcfms.dto.SupplyDTO;
import org.cfms.co2eevaluationcfms.dto.SupplyDetailDTO;

import java.util.List;

public interface SupplyService {

    List<SupplyDetailDTO> getSupplies();

    SupplyDTO createSupply(SupplyDTO supplyDTO);

    void removeProductFromSupply(Long supplyId, String productName);
}
