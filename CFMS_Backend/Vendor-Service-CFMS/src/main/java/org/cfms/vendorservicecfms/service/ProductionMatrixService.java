package org.cfms.vendorservicecfms.service;

import org.cfms.vendorservicecfms.dto.ProductionMatrixDTO;
import org.cfms.vendorservicecfms.entity.ProductionMatrix;

public interface ProductionMatrixService {
    ProductionMatrix createProductionMatrix(ProductionMatrixDTO productionMatrix);
}
