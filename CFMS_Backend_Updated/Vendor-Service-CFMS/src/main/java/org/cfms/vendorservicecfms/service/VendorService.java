package org.cfms.vendorservicecfms.service;

import org.cfms.vendorservicecfms.dto.VendorDTO;

import java.util.List;

public interface VendorService {

    List<VendorDTO> getVendors();

    VendorDTO createVendor(VendorDTO vendorDTO);

    VendorDTO getVendorById(Long vendorId);

}
