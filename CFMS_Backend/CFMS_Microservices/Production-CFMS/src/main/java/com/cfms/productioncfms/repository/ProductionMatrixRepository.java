package com.cfms.productioncfms.repository;

import com.cfms.productioncfms.entity.ProductionMatrix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionMatrixRepository extends JpaRepository<ProductionMatrix, Long> {

    @Query(value = "select p from ProductionMatrix p where p.region=:region and p.animalSpecies=:animal_species and p.productionSystem=:production_system and p.commodity=:commodity")
    ProductionMatrix getProductionMatrix(@Param("region") String region,@Param("animal_species") String animalSpecies,@Param("production_system") String productionSystem,@Param("commodity") String commodity);

}
