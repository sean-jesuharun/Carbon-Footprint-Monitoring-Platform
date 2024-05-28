package org.cfms.vendorservicecfms.service;

import org.cfms.vendorservicecfms.dto.VendorProductDTO;
import org.cfms.vendorservicecfms.entity.Vendor;
import org.cfms.vendorservicecfms.entity.VendorProduct;

public interface VendorProductService {
    VendorProduct createVendorProduct(Vendor vendor, VendorProductDTO vendorProductDTO);
}
