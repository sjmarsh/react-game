export class SceneryType {
    
    stageType;
    sceneryName;

    constructor(props){
        this.stageType = props.stageType;
        this.sceneryName = props.sceneryName;
    }

    get fullName() {
        return `${this.stageType.toLowerCase()}-${this.sceneryName.toLowerCase()}`;
    }
}