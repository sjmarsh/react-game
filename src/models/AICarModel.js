import { CarModel } from "./CarModel";

export class AICarModel extends CarModel {
    
    MIN_WIDTH = 24;
    MIN_HEIGHT = 10;
    MEIDAN_STRIP_POSITION = 75;

    moveVelocity;

    constructor() {
        super();
        super.top = -20;
        super.left = this.randomizeStartPosition();
        super.height = this.MIN_HEIGHT;
        super.width = this.MIN_WIDTH;
        super.color = this.randomizeCarColor();
        this.moveVelocity = this.randomizeMoveVelocity(); 
    }

    randomizeStartPosition() {
        let positions = [20, 80];
        let randomPosition = Math.floor(Math.random() * positions.length);
        return positions[randomPosition];
    }

    randomizeCarColor(){
        let colors = ['green', 'blue', 'yellow', 'purple', 'orange'];
        let randomColor = Math.floor(Math.random() * colors.length);
        return colors[randomColor];
    }

    randomizeMoveVelocity(){
        let moveVelocityInt = Math.floor(Math.random() * 3) + 1;
        return moveVelocityInt / 3;
    }

    move()  {
        const moveDistance = 5;
        const growPerspectiveRatio = 1.028;
        const moveLeftDistance = 2.7;
        const moveRightDistance = 1.3;

        this.top += moveDistance;
        this.width *= growPerspectiveRatio;
        this.height *= growPerspectiveRatio;
        
        if(this.left < this.MEIDAN_STRIP_POSITION)
        {
            this.left -= (moveLeftDistance * this.moveVelocity);
        }
        else
        {
            this.left += (moveRightDistance * this.moveVelocity);
        }
    }
}