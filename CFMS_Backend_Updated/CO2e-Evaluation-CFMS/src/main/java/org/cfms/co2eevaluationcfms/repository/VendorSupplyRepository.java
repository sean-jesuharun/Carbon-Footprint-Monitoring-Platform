package org.cfms.co2eevaluationcfms.repository;

import org.cfms.co2eevaluationcfms.entity.VendorSupply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorSupplyRepository extends JpaRepository<VendorSupply, Long> {

    List<VendorSupply> findByVendorIdAndProductNameOrderByDateAsc(Long vendorId, String productName);

}
