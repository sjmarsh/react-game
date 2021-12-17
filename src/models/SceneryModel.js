import { SceneryItemModel } from "./SceneryItemModel";

export class SceneryModel {

    HORIZONTAL_MOVE_DISTANCE = 5.9;
    
    moveLeftDistance;

    constructor(props) {
        this.leftItem = new SceneryItemModel({leftXAxis: 125, stageType: props.stageType});
        this.rightItem = new SceneryItemModel({leftXAxis: 345, stageType: props.stageType});
        
        this.moveLeftDistance = this.HORIZONTAL_MOVE_DISTANCE;
    }

    move() {
        this.leftItem.moveVertical();
        this.rightItem.moveVertical();
        this.moveHorizontal();
    }

    moveHorizontal() {
        // Need to compensate for left item model size increase as it moves down the screen
        this.moveLeftDistance += this.leftItem.width * 0.01;
        this.leftItem.moveHorizontal(-this.moveLeftDistance);
        this.rightItem.moveHorizontal(this.HORIZONTAL_MOVE_DISTANCE);
    }
}