package org.cfms.vehicleservicecfms.service;

import org.cfms.vehicleservicecfms.dto.VehicleDTO;

import java.util.List;

public interface VehicleService {
    List<VehicleDTO> getVehicles();

    VehicleDTO createVehicle(VehicleDTO vehicleDTO);

    VehicleDTO getVehicleById(Long vehicleId);
}
