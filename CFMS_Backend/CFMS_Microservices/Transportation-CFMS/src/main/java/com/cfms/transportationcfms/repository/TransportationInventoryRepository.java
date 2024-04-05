package com.cfms.transportationcfms.repository;

import com.cfms.transportationcfms.entity.TransportationInventory;
import com.cfms.transportationcfms.entity.TransportationInventoryKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportationInventoryRepository extends JpaRepository<TransportationInventory, TransportationInventoryKey> {
}
