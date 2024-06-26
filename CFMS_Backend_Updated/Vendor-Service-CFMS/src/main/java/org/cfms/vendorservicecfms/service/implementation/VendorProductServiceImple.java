package org.cfms.vendorservicecfms.service.implementation;

import org.cfms.vendorservicecfms.dto.VendorProductDTO;
import org.cfms.vendorservicecfms.entity.Vendor;
import org.cfms.vendorservicecfms.entity.VendorProduct;
import org.cfms.vendorservicecfms.entity.VendorProductKey;
import org.cfms.vendorservicecfms.exception.VendorProductNotFoundException;
import org.cfms.vendorservicecfms.repository.VendorProductRepository;
import org.cfms.vendorservicecfms.service.VendorProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendorProductServiceImple implements VendorProductService {

    private VendorProductRepository vendorProductRepository;

    private ProductionMatrixServiceImple productionMatrixServiceImple;

    @Autowired
    public VendorProductServiceImple(VendorProductRepository vendorProductRepository, ProductionMatrixServiceImple productionMatrixServiceImple) {
        this.vendorProductRepository = vendorProductRepository;
        this.productionMatrixServiceImple = productionMatrixServiceImple;
    }

    public VendorProduct createVendorProduct(Vendor vendor, VendorProductDTO vendorProductDTO) {

        VendorProduct vendorProduct = VendorProduct.builder()
                .vendorProductKey(VendorProductKey.builder()
                        .vendor(vendor)
                        .productName(vendorProductDTO.getProductName().toUpperCase())
                        .build())
                .productionMatrix(productionMatrixServiceImple.createProductionMatrix(vendorProductDTO.getProductionMatrix()))
                .build();

        vendorProductRepository.save(vendorProduct);

        return vendorProduct;

    }

    public void updateVendorProduct(VendorProductKey vendorProductKey, VendorProductDTO vendorProductDTO) {

        VendorProduct vendorProduct = vendorProductRepository.findById(vendorProductKey)
                .orElseThrow(() -> new VendorProductNotFoundException("VendorProduct Not Found with product : " + vendorProductKey.getProductName()));

        vendorProduct.setProductionMatrix(productionMatrixServiceImple.createProductionMatrix(vendorProductDTO.getProductionMatrix()));

    }

    public VendorProduct deleteVendorProduct(VendorProductKey vendorProductKey) {

        VendorProduct vendorProduct = vendorProductRepository.findById(vendorProductKey)
                .orElseThrow(() -> new VendorProductNotFoundException("VendorProduct Not Found with product : " + vendorProductKey.getProductName()));

        vendorProductRepository.deleteById(vendorProductKey);

        return vendorProduct;

    }
}
