package com.cfms.cfms.repository;

import com.cfms.cfms.entity.VendorSupplyProduct;
import com.cfms.cfms.entity.VendorSupplyProductKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorSupplyProductRepository extends JpaRepository<VendorSupplyProduct, VendorSupplyProductKey> {
}
