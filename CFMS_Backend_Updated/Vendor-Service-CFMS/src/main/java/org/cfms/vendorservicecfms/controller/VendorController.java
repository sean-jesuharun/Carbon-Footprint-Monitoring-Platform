package org.cfms.vendorservicecfms.controller;

import jakarta.validation.Valid;
import org.cfms.vendorservicecfms.dto.VendorDTO;
import org.cfms.vendorservicecfms.dto.VendorProductDTO;
import org.cfms.vendorservicecfms.service.implementation.VendorServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vendors")
@CrossOrigin
public class VendorController extends AbstractController {

    private VendorServiceImple vendorServiceImple;

    @Autowired
    public VendorController(VendorServiceImple vendorServiceImple) {
        this.vendorServiceImple = vendorServiceImple;
    }

    @GetMapping
    public ResponseEntity<Object> getVendors() {
        return handleSuccessfulOkResponse(vendorServiceImple.getVendors());
    }

    @PostMapping
    public ResponseEntity<Object> createVendor(@Valid @RequestBody VendorDTO vendorDTO) {
        return handleSuccessfulCreatedResponse(vendorServiceImple.createVendor(vendorDTO));
    }

    @GetMapping("{vendorId}")
    public ResponseEntity<Object> getVendorById(@PathVariable("vendorId") Long vendorId) {
        return handleSuccessfulOkResponse(vendorServiceImple.getVendorById(vendorId));
    }

    @PatchMapping("{vendorId}")
    public ResponseEntity<Object> updateVendorById(@PathVariable("vendorId") Long vendorId, @Valid @RequestBody VendorDTO vendorDTO) {
        return handleSuccessfulOkResponse(vendorServiceImple.updateVendorById(vendorId, vendorDTO));
    }

    @DeleteMapping("{vendorId}")
    public ResponseEntity<HttpStatus> deleteVendorById(@PathVariable("vendorId") Long vendorId) {
        vendorServiceImple.deleteVendorById(vendorId);
        return handleSuccessfulNoContentResponse();
    }

    @PostMapping("{vendorId}/products")
    public ResponseEntity<Object> addProductToVendor(@PathVariable("vendorId") Long vendorId, @Valid @RequestBody VendorProductDTO vendorProductDTO) {
        return handleSuccessfulCreatedResponse(vendorServiceImple.addProductToVendor(vendorId, vendorProductDTO));
    }

//    // Have to look into
//    @PatchMapping("{vendorId}/products/{productName}")
//    public VendorDTO updateVendorProduct(@PathVariable("vendorId") Long vendorId, @PathVariable("productName") String productName, @Valid @RequestBody VendorProductDTO vendorProductDTO) {
//        return vendorServiceImple.updateVendorProduct(vendorId, productName, vendorProductDTO);
//    }

    @DeleteMapping("{vendorId}/products/{productName}")
    public ResponseEntity<Object> removeProductFromVendor(@PathVariable("vendorId") Long vendorId, @PathVariable("productName") String productName) {
        return handleSuccessfulOkResponse(vendorServiceImple.removeProductFromVendor(vendorId, productName));
    }

}
