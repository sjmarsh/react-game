export class StageModel {
    
    stageNumber;
    stageType;
    durationMinutes;
    speed;
    showFog;

    constructor(props) {
        this.stageNumber = props.stageNumber;
        this.stageType = props.stageType;
        this.durationMinutes = props.durationMinutes;
        this.speed = props.speed;
        this.showFog = props.showFog;
    }

    get stageName() {
        return this.stageType.toLowerCase();
    }
}