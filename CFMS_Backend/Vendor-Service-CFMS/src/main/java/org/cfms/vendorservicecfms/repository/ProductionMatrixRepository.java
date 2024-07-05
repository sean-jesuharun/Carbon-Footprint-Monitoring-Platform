package org.cfms.vendorservicecfms.repository;

import org.cfms.vendorservicecfms.entity.ProductionMatrix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionMatrixRepository extends JpaRepository<ProductionMatrix, Long> {

    ProductionMatrix findByRegionAndAnimalSpeciesAndProductionSystemAndCommodity(String region, String animalSpecies, String productionSystem, String commodity);

}
