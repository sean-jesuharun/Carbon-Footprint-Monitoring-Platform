package org.cfms.vendorservicecfms.service;

import org.cfms.vendorservicecfms.dto.VendorDTO;
import org.cfms.vendorservicecfms.dto.VendorProductDTO;

import java.util.List;

public interface VendorService {

    List<VendorDTO> getVendors();

    VendorDTO createVendor(VendorDTO vendorDTO);

    VendorDTO getVendorById(Long vendorId);

    VendorDTO updateVendorById(Long vendorId, VendorDTO vendorDTO);

    void deleteVendorById(Long vendorId);

    VendorDTO addProductToVendor(Long vendorId, VendorProductDTO vendorProductDTO);

    VendorDTO updateVendorProduct(Long vendorId, String productName, VendorProductDTO vendorProductDTO);

    VendorDTO removeProductFromVendor(Long vendorId, String productName);
}
