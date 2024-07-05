package com.cfms.transportationcfms.repository;

import com.cfms.transportationcfms.dto.TransportationInventoryCo2eDTO;
import com.cfms.transportationcfms.entity.TransportationInventory;
import com.cfms.transportationcfms.entity.TransportationInventoryKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransportationInventoryRepository extends JpaRepository<TransportationInventory, TransportationInventoryKey> {

//    @Query("select ti.transportationInventoryKey.productName as product_name, SUM(ti.co2eEmission) as total_co2e_emission, SUM(ti.productQuantity) as total_quantity from TransportationInventory ti where ti.transportationInventoryKey.productName = :productName group by ti.transportationInventoryKey.productName")
    @Query("SELECT NEW com.cfms.transportationcfms.dto.TransportationInventoryCo2eDTO(ti.transportationInventoryKey.productName, SUM(ti.co2eEmission), SUM(ti.productQuantity)) FROM TransportationInventory ti WHERE ti.transportationInventoryKey.productName = :productName GROUP BY ti.transportationInventoryKey.productName")
    TransportationInventoryCo2eDTO retrieveProductTransportationC02eEmissionData(@Param("productName") String productName);

    // Retrieve transportInventories by productName.
    List<TransportationInventory> findByTransportationInventoryKey_ProductName(String productName);

}
