package org.cfms.co2eevaluationcfms.repository;

import org.cfms.co2eevaluationcfms.entity.SupplyItem;
import org.cfms.co2eevaluationcfms.entity.SupplyItemKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplyItemRepository extends JpaRepository<SupplyItem, SupplyItemKey> {

    @Query("SELECT si FROM SupplyItem si JOIN si.supply s WHERE s.vendorId = :vendorId AND si.supplyItemKey.productName = :productName ORDER BY s.date ASC")
    List<SupplyItem> findByVendorIdAndProductNameOrderByDateAsc(@Param("vendorId") Long vendorId, @Param("productName") String productName);

}
