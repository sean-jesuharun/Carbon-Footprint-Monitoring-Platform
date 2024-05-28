package org.cfms.vendorservicecfms.repository;

import org.cfms.vendorservicecfms.entity.VendorProduct;
import org.cfms.vendorservicecfms.entity.VendorProductKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorProductRepository extends JpaRepository<VendorProduct, VendorProductKey> {
}
