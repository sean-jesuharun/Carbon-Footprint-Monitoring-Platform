package com.cfms.cfms.model;

public class Transportation {

    private String vehicleMake;
    private String vehicleModel;
    private double engineSize;
    private int cylinders;
    private double fuelConsumption;

    private String vehicleClass;
    private String transmission;
    private String fuelType;

    private double co2Emission;

    public Transportation(String vehicleMake, String vehicleModel, double engineSize, int cylinders, double fuelConsumption, String vehicleClass, String transmission, String fuelType, double co2Emission) {
        this.vehicleMake = vehicleMake;
        this.vehicleModel = vehicleModel;
        this.engineSize = engineSize;
        this.cylinders = cylinders;
        this.fuelConsumption = fuelConsumption;
        this.vehicleClass = vehicleClass;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.co2Emission = co2Emission;
    }

    //    public String getVehicleMake() {
//        return vehicleMake;
//    }
//
//    public void setVehicleMake(String vehicleMake) {
//        this.vehicleMake = vehicleMake;
//    }
//
//    public String getVehicleModel() {
//        return vehicleModel;
//    }
//
//    public void setVehicleModel(String vehicleModel) {
//        this.vehicleModel = vehicleModel;
//    }
//
//    public double getEngineSize() {
//        return engineSize;
//    }
//
//    public void setEngineSize(double engineSize) {
//        this.engineSize = engineSize;
//    }
//
//    public int getCylinders() {
//        return cylinders;
//    }
//
//    public void setCylinders(int cylinders) {
//        this.cylinders = cylinders;
//    }
//
//    public double getFuelConsumption() {
//        return fuelConsumption;
//    }
//
//    public void setFuelConsumption(double fuelConsumption) {
//        this.fuelConsumption = fuelConsumption;
//    }
//
//    public String getVehicleClass() {
//        return vehicleClass;
//    }
//
//    public void setVehicleClass(String vehicleClass) {
//        this.vehicleClass = vehicleClass;
//    }
//
//    public String getTransmission() {
//        return transmission;
//    }
//
//    public void setTransmission(String transmission) {
//        this.transmission = transmission;
//    }
//
//    public String getFuelType() {
//        return fuelType;
//    }
//
//    public void setFuelType(String fuelType) {
//        this.fuelType = fuelType;
//    }
//
//    public double getCo2Emission() {
//        return co2Emission;
//    }
//
//    public void setCo2Emission(double co2Emission) {
//        this.co2Emission = co2Emission;
//    }

    @Override
    public String toString() {
        return "Transportation{" +
                "vehicleMake='" + vehicleMake + '\'' +
                ", vehicleModel='" + vehicleModel + '\'' +
                ", engineSize=" + engineSize +
                ", cylinders=" + cylinders +
                ", fuelConsumption=" + fuelConsumption +
                ", vehicleClass='" + vehicleClass + '\'' +
                ", transmission='" + transmission + '\'' +
                ", fuelType='" + fuelType + '\'' +
                ", co2Emission=" + co2Emission +
                '}';
    }
}
