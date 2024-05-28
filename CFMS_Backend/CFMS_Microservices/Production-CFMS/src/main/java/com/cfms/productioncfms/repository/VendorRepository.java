package com.cfms.productioncfms.repository;

import com.cfms.productioncfms.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    Vendor findByVendorName(String vendorName);

}
