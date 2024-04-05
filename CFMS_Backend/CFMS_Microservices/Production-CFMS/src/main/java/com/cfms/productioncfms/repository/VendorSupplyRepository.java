package com.cfms.productioncfms.repository;

import com.cfms.productioncfms.entity.VendorSupply;
import com.cfms.productioncfms.entity.VendorSupplyKey;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorSupplyRepository extends JpaRepository<VendorSupply, VendorSupplyKey> {

//    @Modifying
//    @Query(value = "insert into vendor_supply(vendor_name, product_name) values (:vendor_name, :product_name)", nativeQuery = true)
//    void saveVendorSupply(@Param("vendor_name") String vendorName, @Param("product_name") String productName);

}
