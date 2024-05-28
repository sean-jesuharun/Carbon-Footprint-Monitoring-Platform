package org.cfms.vendorservicecfms.service.implementation;

import org.cfms.vendorservicecfms.dto.ProductionMatrixDTO;
import org.cfms.vendorservicecfms.entity.ProductionMatrix;
import org.cfms.vendorservicecfms.repository.ProductionMatrixRepository;
import org.cfms.vendorservicecfms.service.ProductionMatrixService;
import org.springframework.stereotype.Service;

@Service
public class ProductionMatrixServiceImple implements ProductionMatrixService {

    private final ProductionMatrixRepository productionMatrixRepository;

    public ProductionMatrixServiceImple(ProductionMatrixRepository productionMatrixRepository) {
        this.productionMatrixRepository = productionMatrixRepository;
    }

    public ProductionMatrix createProductionMatrix(ProductionMatrixDTO productionMatrixDTO) {

        ProductionMatrix productionMatrix = productionMatrixRepository.findByRegionAndAnimalSpeciesAndProductionSystemAndCommodity(productionMatrixDTO.getRegion(), productionMatrixDTO.getAnimalSpecies(), productionMatrixDTO.getProductionSystem(), productionMatrixDTO.getCommodity());

        // If Production Matrix is Not available then save it in the database.
        if (productionMatrix == null){

            productionMatrix = ProductionMatrix.builder()
                    .region(productionMatrixDTO.getRegion())
                    .animalSpecies(productionMatrixDTO.getAnimalSpecies())
                    .productionSystem(productionMatrixDTO.getProductionSystem())
                    .commodity(productionMatrixDTO.getCommodity())
                    .build();

            productionMatrixRepository.save(productionMatrix);
        }

        return productionMatrix;

    }
}
