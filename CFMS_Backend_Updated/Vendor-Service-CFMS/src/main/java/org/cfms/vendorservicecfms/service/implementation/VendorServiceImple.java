package org.cfms.vendorservicecfms.service.implementation;

import jakarta.transaction.Transactional;
import org.cfms.vendorservicecfms.dto.VendorDTO;
import org.cfms.vendorservicecfms.dto.VendorProductDTO;
import org.cfms.vendorservicecfms.entity.Vendor;
import org.cfms.vendorservicecfms.repository.VendorRepository;
import org.cfms.vendorservicecfms.service.VendorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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
                .build();

        vendorRepository.save(vendor);

        vendor.setVendorProducts(new ArrayList<>());

        for (VendorProductDTO vendorProductDTO: vendorDTO.getVendorProducts()) {

            vendor.getVendorProducts().add(vendorProductServiceImple.createVendorProduct(vendor, vendorProductDTO));

        }

        // Returning the Vendor as a VendorDTO
        return modelMapper.map(vendor, VendorDTO.class);

    }

    public VendorDTO getVendorById(Long vendorId) {

        return vendorRepository.findById(vendorId)
                .map(vendor -> modelMapper.map(vendor, VendorDTO.class))
                .orElseThrow(() -> new NoSuchElementException("Vendor not found with Id : " + vendorId));

    }

    public void deleteVendorById(Long vendorId) {

        vendorRepository.deleteById(vendorId);

    }
}
