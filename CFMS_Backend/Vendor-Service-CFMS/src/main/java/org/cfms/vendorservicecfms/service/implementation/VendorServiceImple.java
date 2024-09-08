package org.cfms.vendorservicecfms.service.implementation;

import jakarta.transaction.Transactional;
import org.cfms.vendorservicecfms.dto.VendorDTO;
import org.cfms.vendorservicecfms.dto.VendorProductDTO;
import org.cfms.vendorservicecfms.entity.Vendor;
import org.cfms.vendorservicecfms.entity.VendorProductKey;
import org.cfms.vendorservicecfms.exception.VendorNotFoundException;
import org.cfms.vendorservicecfms.repository.VendorRepository;
import org.cfms.vendorservicecfms.service.VendorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VendorServiceImple implements VendorService {

    private VendorRepository vendorRepository;

    private VendorProductServiceImple vendorProductServiceImple;

    private ModelMapper modelMapper;

    @Autowired
    public VendorServiceImple(VendorRepository vendorRepository, VendorProductServiceImple vendorProductServiceImple, ModelMapper modelMapper) {
        this.vendorRepository = vendorRepository;
        this.vendorProductServiceImple = vendorProductServiceImple;
        this.modelMapper = modelMapper;
    }

    public List<VendorDTO> getVendors() {

        return vendorRepository.findAll().stream()
                .map(vendor -> modelMapper.map(vendor, VendorDTO.class))
                .toList();

    }

    @Transactional
    public VendorDTO createVendor(VendorDTO vendorDTO) {

        Vendor vendor = Vendor.builder()
                .vendorName(vendorDTO.getVendorName().toUpperCase())
                .location(vendorDTO.getLocation())
                .distanceFromWarehouse(vendorDTO.getDistanceFromWarehouse())
                .vendorProducts(new ArrayList<>())
                .build();

        vendorRepository.save(vendor);

        for (VendorProductDTO vendorProductDTO: vendorDTO.getVendorProducts()) {

            // Creating the VendorProduct
            // Adding the product to vendorProduct List
            vendor.getVendorProducts().add(vendorProductServiceImple.createVendorProduct(vendor, vendorProductDTO));

        }

        // Returning the Vendor as a VendorDTO
        return modelMapper.map(vendor, VendorDTO.class);

    }

    public VendorDTO getVendorById(Long vendorId) {

        return vendorRepository.findById(vendorId)
                .map(vendor -> modelMapper.map(vendor, VendorDTO.class))
                .orElseThrow(() -> new VendorNotFoundException("Vendor not found with Id : " + vendorId));

    }

    @Transactional
    public VendorDTO updateVendorById(Long vendorId, VendorDTO vendorDTO) {

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new VendorNotFoundException("Vendor not found with Id : " + vendorId));

        vendor.setVendorName(vendorDTO.getVendorName().toUpperCase());
        vendor.setLocation(vendorDTO.getLocation());
        vendor.setDistanceFromWarehouse(vendorDTO.getDistanceFromWarehouse());

        return modelMapper.map(vendor, VendorDTO.class);

    }

    public void deleteVendorById(Long vendorId) {

        vendorRepository.deleteById(vendorId);

    }

    @Transactional
    public VendorDTO addProductToVendor(Long vendorId, VendorProductDTO vendorProductDTO){

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new VendorNotFoundException("Vendor not found with Id : " + vendorId));

        // Creating the VendorProduct
        // Adding the product to vendorProduct List
        vendor.getVendorProducts().add(vendorProductServiceImple.createVendorProduct(vendor, vendorProductDTO));

        return modelMapper.map(vendor, VendorDTO.class);
    }

    public VendorDTO updateVendorProduct(Long vendorId, String productName, VendorProductDTO vendorProductDTO) {

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new VendorNotFoundException("Vendor not found with Id : " + vendorId));

        vendorProductServiceImple.updateVendorProduct(VendorProductKey.builder()
                .vendor(vendor)
                .productName(productName)
                .build(), vendorProductDTO);

        return modelMapper.map(vendor, VendorDTO.class);

    }

    @Transactional
    public VendorDTO removeProductFromVendor(Long vendorId, String productName) {

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new VendorNotFoundException("Vendor not found with Id : " + vendorId));

        vendor.getVendorProducts().remove(vendorProductServiceImple.deleteVendorProduct(VendorProductKey.builder()
                .vendor(vendor)
                .productName(productName)
                .build()));

        return modelMapper.map(vendor, VendorDTO.class);

    }

}
