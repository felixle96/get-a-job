var VehicleSize = {
    'Motorcycle': 0,
    'Compact': 1,
    'Large': 2
};

class Vehicle {
    constructor(license, size, spotsNeeded) {
        this.license = license;
        this.size = size;
        this.spotsNeeded;
        this.parkingSpots = [];
    }

    getSpotsNeeded() {
        return this.spotsNeeded;
    }

    getSize() {
        return this.size;
    }

    parkInSpot(parkingSpot) {
        this.parkingSpots.push(parkingSpot);
    }

    clearSpots() {
        this.parkingSpots = [];
    }

    canFitInSpot(parkingSpot) {
        if(this.size <= parkingSpot.getSize()) {
            return true;
        }
    }
}

class Motorcycle extends Vehicle {
    constructor(license) {
        super(license, VehicleSize.Motorcycle, 1);
    }
}

class Car extends Vehicle {
    constructor(license) {
        super(license, VehicleSize.Compact, 1);
    }
}

class Bus extends Vehicle {
    constructor(license) {
        super(license, VehicleSize.Large, 5);
    }
}

class ParkingSpot {
    constructor()
}