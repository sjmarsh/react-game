import { UIElement } from "./UIElement";

export class CarModel extends UIElement {
        
    color;
    hasCollision;
        
    get rightSide() {
        return this.left + this.width;
    }

    get bottom() {
        return this.top + this.height;
    }

    crash() {
        this.hasCollision = true;
    }
}