package org.cfms.co2eevaluationcfms.repository;

import org.cfms.co2eevaluationcfms.entity.Supply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplyRepository extends JpaRepository<Supply, Long> {

//    List<Supply> findByVendorIdAndProductNameOrderByDateAsc(Long vendorId, String productName);

}
