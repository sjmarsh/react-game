import { CarModel } from "./CarModel";

export class PlayerCarModel extends CarModel {

    MOVE_DISTANCE = 20;
    MAX_HEIGHT = 38;
    MAX_WIDTH = 92;
    ROAD_LEFT_SIDE = -140;
    ROAD_RIGHT_SIDE = 180;
    
    constructor() {
        super();
        super.height = this.MAX_HEIGHT;
        super.width = this.MAX_WIDTH;
        super.color = 'red';
        this.reset();
    }

    reset() {
        this.top = 210;
        this.left = 20;
        this.hasCollision = false;
    }

    moveLeft() {
        if(this.left >= this.ROAD_LEFT_SIDE) {
            this.left -= this.MOVE_DISTANCE;
        }
    }

    moveRight() {
        if(this.left <= this.ROAD_RIGHT_SIDE) {
            this.left += this.MOVE_DISTANCE;
        }
    }
}