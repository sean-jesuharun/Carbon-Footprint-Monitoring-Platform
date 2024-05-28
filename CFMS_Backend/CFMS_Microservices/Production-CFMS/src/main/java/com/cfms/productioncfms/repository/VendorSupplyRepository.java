package com.cfms.productioncfms.repository;

import com.cfms.productioncfms.entity.Vendor;
import com.cfms.productioncfms.entity.VendorSupply;
import com.cfms.productioncfms.entity.VendorSupplyKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorSupplyRepository extends JpaRepository<VendorSupply, VendorSupplyKey> {

//    @Modifying
//    @Query(value = "insert into vendor_supply(vendor_name, product_name) values (:vendor_name, :product_name)", nativeQuery = true)
//    void saveVendorSupply(@Param("vendor_name") String vendorName, @Param("product_name") String productName);

//    @Query("SELECT NEW com.cfms.productioncfms.dto.ProductionInventoryCo2eDTO(vs.vendorSupplyKey.productName, SUM(vs.co2eEmission), SUM(vs.suppliedQuantity)) FROM VendorSupply vs WHERE vs.vendorSupplyKey.productName = :productName GROUP BY vs.vendorSupplyKey.productName")
//    ProductionInventoryCo2eDTO retrieveInventoryProductionC02eEmissionData(String productName);


    // Retrieve vendorSupplies by vendor.
    List<VendorSupply> findByVendorSupplyKey_Vendor(Vendor vendor);

    // Retrieve vendorSupplies by productName.
    List<VendorSupply> findByVendorSupplyKey_ProductName(String productName);

}
