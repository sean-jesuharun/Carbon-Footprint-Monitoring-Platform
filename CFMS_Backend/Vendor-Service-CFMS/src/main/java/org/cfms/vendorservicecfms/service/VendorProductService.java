package org.cfms.vendorservicecfms.service;

import org.cfms.vendorservicecfms.dto.VendorProductDTO;
import org.cfms.vendorservicecfms.entity.Vendor;
import org.cfms.vendorservicecfms.entity.VendorProduct;
import org.cfms.vendorservicecfms.entity.VendorProductKey;

public interface VendorProductService {
    VendorProduct createVendorProduct(Vendor vendor, VendorProductDTO vendorProductDTO);

    void updateVendorProduct(VendorProductKey vendorProductKey, VendorProductDTO vendorProductDTO);

    VendorProduct deleteVendorProduct(VendorProductKey vendorProductKey);
}
