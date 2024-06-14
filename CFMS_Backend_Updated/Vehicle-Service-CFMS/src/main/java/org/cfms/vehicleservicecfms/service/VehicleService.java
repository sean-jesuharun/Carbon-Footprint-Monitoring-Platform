package org.cfms.vehicleservicecfms.service;

import org.cfms.vehicleservicecfms.dto.VehicleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VehicleService {
    Page<VehicleDTO> getVehicles(Pageable pageable);

    VehicleDTO createVehicle(VehicleDTO vehicleDTO);

    VehicleDTO getVehicleById(Long vehicleId);

    VehicleDTO updateVehicleById(Long vehicleId, VehicleDTO vehicleDTO);

    void deleteVehicleById(Long vehicleId);
}
