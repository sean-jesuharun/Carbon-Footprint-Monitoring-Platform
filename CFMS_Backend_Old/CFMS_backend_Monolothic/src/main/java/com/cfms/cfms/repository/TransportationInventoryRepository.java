package com.cfms.cfms.repository;

import com.cfms.cfms.entity.TransportationInventory;
import com.cfms.cfms.entity.TransportationInventoryKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportationInventoryRepository extends JpaRepository<TransportationInventory, TransportationInventoryKey> {
}
