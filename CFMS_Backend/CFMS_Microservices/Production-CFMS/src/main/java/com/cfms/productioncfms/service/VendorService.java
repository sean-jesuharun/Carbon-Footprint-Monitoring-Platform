package com.cfms.productioncfms.service;

import com.cfms.productioncfms.dto.ProductDetailDataDTO;
import com.cfms.productioncfms.dto.VendorResDTO;
import com.cfms.productioncfms.dto.VendorDataDTO;
import com.cfms.productioncfms.entity.ProductionMatrix;
import com.cfms.productioncfms.entity.Vendor;
import com.cfms.productioncfms.entity.VendorSupply;
import com.cfms.productioncfms.entity.VendorSupplyKey;
import com.cfms.productioncfms.repository.ProductionMatrixRepository;
import com.cfms.productioncfms.repository.VendorRepository;
import com.cfms.productioncfms.repository.VendorSupplyRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VendorService {

    private VendorRepository vendorRepository;

    private ProductionMatrixService productionMatrixService;

    private ModelMapper modelMapper;
    private final ProductionMatrixRepository productionMatrixRepository;
    private final VendorSupplyRepository vendorSupplyRepository;

    @Autowired
    public VendorService(VendorRepository vendorRepository, ProductionMatrixService productionMatrixService, ModelMapper modelMapper,
                         ProductionMatrixRepository productionMatrixRepository,
                         VendorSupplyRepository vendorSupplyRepository) {
        this.vendorRepository = vendorRepository;
        this.productionMatrixService = productionMatrixService;
        this.modelMapper = modelMapper;
        this.productionMatrixRepository = productionMatrixRepository;
        this.vendorSupplyRepository = vendorSupplyRepository;
    }

    // Adding a New Vendor Details.
    @Transactional
    public void addNewVendor(VendorDataDTO vendorDataDTO) {

        // Building Vendor entity to save in database
        // Convert VendorName to UpperCase
        Vendor vendor = Vendor.builder()
                .vendorName(vendorDataDTO.getVendorName().toUpperCase())
                .location(vendorDataDTO.getLocation())
                .build();

        // Saving New Vendor.
        vendorRepository.save(vendor);

        // Adding New ProductionMatrix if available.
        productionMatrixService.addProductionMatrix(vendorDataDTO.getSupplyProductDetailList(), vendor);

    }


    // Fetching all vendor Details.
    public List<VendorResDTO> getAllVendorDetails() {

        // Creating a list for storing vendor details.
        List<VendorResDTO> vendorResDTOList = new ArrayList<>();

        // Fetching all Vendors and mapping those to VendorResDTO.
        for (Vendor vendor: vendorRepository.findAll()){
            VendorResDTO vendorResDTO = modelMapper.map(vendor, VendorResDTO.class);
            vendorResDTOList.add(vendorResDTO);
        }

        return vendorResDTOList;

    }

    // (NOT COMPLETED) Not Completed Need to add logic for removing and adding new production matrix.
    @Transactional
    public void updateVendor(Long vendorId, VendorDataDTO vendorDataDTO){

        // Retrieving the vendor using the vendor_id (Managed by persistence context)
        Vendor vendor = vendorRepository.findById(vendorId).get();

        // Setting the vendorName and Location.
        vendor.setVendorName(vendor.getVendorName());
        vendor.setLocation(vendorDataDTO.getLocation());


        for (ProductDetailDataDTO productDetailDataDTO : vendorDataDTO.getSupplyProductDetailList()){

            ProductionMatrix productionMatrix = productionMatrixRepository.findByRegionAndAnimalSpeciesAndProductionSystemAndCommodity(productDetailDataDTO.getRegion(), productDetailDataDTO.getAnimalSpecies(), productDetailDataDTO.getProductionSystem(), productDetailDataDTO.getCommodity());

            // If Production Matrix is Not available then save it in the database.
            if (productionMatrix == null){

                // Building ProductionMatrix entity to save in database
                productionMatrix = ProductionMatrix.builder()
                        .region(productDetailDataDTO.getRegion())
                        .animalSpecies(productDetailDataDTO.getAnimalSpecies())
                        .productionSystem(productDetailDataDTO.getProductionSystem())
                        .commodity(productDetailDataDTO.getCommodity())
                        .build();

                // Saving ProductionMatrix.
                // (Changed to SEQUENCE) :- Since it has auto-generated IDENTITY value then previous queries will be flushed with this.
                productionMatrixRepository.save(productionMatrix);
            }

            // Getting vendorSupply if one exist or assigning null.
            VendorSupply vendorSupply = vendorSupplyRepository.findById(VendorSupplyKey.builder()
                            .vendor(vendor)
                            .productName(productDetailDataDTO.getProductName())
                            .build())
                    .orElse(null);

            if (vendorSupply == null){

                // Creating vendorSupplyKey (composite key) & Transient vendorSupply Entity
                vendorSupply = VendorSupply.builder()
                        .vendorSupplyKey(VendorSupplyKey.builder()
                                .vendor(vendor)
                                .productName(productDetailDataDTO.getProductName())
                                .build())
                        .productionMatrix(productionMatrix)
                        .build();

                vendorSupplyRepository.save(vendorSupply);

            } else {

                // Updating production matrix
                vendorSupply.setProductionMatrix(productionMatrix);

            }

        }

    }

}
