import { StageModel } from "./StageModel";

export class StageManager {

    _currentStageNumber;
    _stages = [
        new StageModel( { stageNumber: 1, stageType: 'rural', durationMinutes: 1, speed: 1.5, showFog: false } ),
        new StageModel( { stageNumber: 2, stageType: 'desert', durationMinutes: 1, speed: 2, showFog: false } ),
        new StageModel( { stageNumber: 3, stageType: 'alpine', durationMinutes: 1, speed: 2, showFog: true } ),
        new StageModel( { stageNumber: 4, stageType: 'city', durationMinutes: 1, speed: 3, showFog: false } ),
        new StageModel( { stageNumber: 5, stageType: 'coast', durationMinutes: 1, speed: 4, showFog: false } )
    ];
        
    allStagesCompleted;
    showCheckpoint;

    constructor() {
        this.reset();
    }

    get currentStage() {
        return this._stages.find(s => s.stageNumber === this._currentStageNumber);
    }

    get isFinalStage() {
        return this._currentStageNumber === this._stages.length;
    }

    reset() {
        this.allStagesCompleted = false;
        this._currentStageNumber = 1;
    }

    incrementStageIfRequired(gameTimeElapsedMinutes) {
        if(gameTimeElapsedMinutes >= this._getEndOfCurrentStageTime()) {
            if(this._currentStageNumber < this._stages.length) {
                this._currentStageNumber++;
            }
            else {
                this.allStagesCompleted = true;
            }
        }
    }

    showCheckpointIfRequired(gameTimeElapsedSeconds) {
        let checkPointDuration = 5;
        let endOfStageSeconds = this._getEndOfCurrentStageTime() * 60;
        this.showCheckpoint = (gameTimeElapsedSeconds >= (endOfStageSeconds - checkPointDuration)) 
                                && gameTimeElapsedSeconds < endOfStageSeconds;
    }

    _getEndOfCurrentStageTime() {
        return this._stages.filter(s => s.stageNumber <= this._currentStageNumber).map(i => i.durationMinutes).reduce((a, b) => a + b, 0);
    }
    
}