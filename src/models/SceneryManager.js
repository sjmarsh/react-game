import { SceneryModel } from "./SceneryModel";

export class SceneryManager {

    NEW_SCENERY_SPAWN_HEIGHT = 60;
    SCENERY_DESPAWN_HEIGHT = 180;

    constructor(props) {
        this.reset(props.currentStageType);
    }

    animate() {   
        if (!this.scenery.length > 0 || !this.scenery.some(a => a.leftItem.top < this.NEW_SCENERY_SPAWN_HEIGHT))
        {
            this.scenery.push(new SceneryModel({stageType: this.currentStageType}));
        }

        for (let sceneryModel of this.scenery)
        {
            sceneryModel.move();
        }

        var bottomSceneryIndex = this.scenery.findIndex(a => a.leftItem.top > this.SCENERY_DESPAWN_HEIGHT);
        if (bottomSceneryIndex > -1)
        {
            this.scenery = this.scenery.filter((_, i) => i !== bottomSceneryIndex);
        }
    }

    reset(currentStageType) {
        this.scenery = [];
        this.currentStageType = currentStageType;
    }
}