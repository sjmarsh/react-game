import { AICarModel } from "../models/AICarModel";

export class AICarManager {
    
    NEW_CAR_SPAWN_HEIGHT = 120;
    CAR_DESPAWN_HEIGHT = 290;

    constructor() {
        this.reset();
    }

    reset(){
        this.cars = [];
    }

    animate() {
        if (!this.cars.length > 0 || !this.cars.some(a => a.top < this.NEW_CAR_SPAWN_HEIGHT))
        {            
            this.cars = [...this.cars, new AICarModel()];
        }
        
        for (let aiCar of this.cars)
        {
            aiCar.move();
        }
       
        let bottomCarIndex = this.cars.findIndex(a => a.top > this.CAR_DESPAWN_HEIGHT);
        if (bottomCarIndex > -1)
        {
            this.cars = this.cars.filter((_, i) => i !== bottomCarIndex);
        }
    }

    getCarCollidedWithPlayer(playerCar) {
        let carCollidedWithPlayer = null;
        let carNearPlayer = this.getCarNearestToPlayerCar(playerCar);
        if (carNearPlayer) {
            let carHasCollided = (carNearPlayer.rightSide >= playerCar.left && carNearPlayer.left <= playerCar.left)
                || (carNearPlayer.left <= playerCar.rightSide && carNearPlayer.rightSide >= playerCar.rightSide);
                        
            if (carHasCollided)
            {
                carCollidedWithPlayer = carNearPlayer;
            }
        }
        return carCollidedWithPlayer;
    }

    getCarNearestToPlayerCar(playerCar) {
        return this.cars.find(a => a.top === playerCar.top 
                                || (a.bottom >= playerCar.top && a.top < playerCar.top));
    }
}