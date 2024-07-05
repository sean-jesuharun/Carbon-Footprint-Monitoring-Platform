package com.cfms.inventorycfms.repository;

import com.cfms.inventorycfms.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, String> {
}
