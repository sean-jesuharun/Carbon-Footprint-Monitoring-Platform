package org.cfms.co2eevaluationcfms.service;

import org.cfms.co2eevaluationcfms.dto.SupplyReqDTO;
import org.cfms.co2eevaluationcfms.dto.SupplyResDTO;

import java.util.List;

public interface SupplyService {

    List<SupplyResDTO> getSupplies();

    SupplyReqDTO createSupply(SupplyReqDTO supplyReqDTO);

}
