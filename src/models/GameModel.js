import { AICarManager } from "./AICarManager";
import { MedianStripManager } from "./MedianStripManager";
import { PlayerCarModel } from "./PlayerCarModel";
import { SceneryManager } from "./SceneryManager";
import { StageManager } from "./StageManager";
import { StatsModel } from "./StatsModel";

export class GameModel {
       
    _isRunning;
    _isComplete;
    _startTime;
    _isCollisionsEnabled;
    
    constructor() {
        this.aICarManager = new AICarManager();
        this.medianStripManager = new MedianStripManager();
        this.playerCar = new PlayerCarModel();
        this.stageManager = new StageManager();
        this.sceneryManager = new SceneryManager({currentStageType: this.stageManager.currentStage.currentStageType});
        this.stats = new StatsModel();
        this._isRunning = false;
        this._isComplete = false;
    }
    
    startGame = () => {
        this._resetGame();
        this._isRunning = true;
        this._isComplete = false;
    }

    stopGame = () => {
        this._gameOver(false);        
    }

    movePlayerCarLeft = () => { 
        if(this._isRunning) {
            this.playerCar.moveLeft();            
        }          
    }

    movePlayerCarRight = () => {
        if(this._isRunning) {
            this.playerCar.moveRight();
        }
    }

    toggleCollisionsEnabled = () => {
        this._isCollisionsEnabled = !this._isCollisionsEnabled;
    }

    animate = () => {
        if(this._isRunning) {
            let timeEllapsed = Math.abs(new Date() - this._startTime);
            let timeEllapsedSeconds = timeEllapsed / 1000;
            let timeEllapsedMinutes = timeEllapsedSeconds / 60;

            if(this._hasCollision()) {
                this._gameOver(false);
            }

            this.medianStripManager.animate();
            this.aICarManager.animate();
            this.stageManager.showCheckpointIfRequired(timeEllapsedSeconds);
            this.stageManager.incrementStageIfRequired(timeEllapsedMinutes);
            this.sceneryManager.currentStageType = this.stageManager.currentStage.stageType;
            this.sceneryManager.animate();

            if (this.stageManager.allStagesCompleted) {
                this._gameOver(true);
            }

            this.stats.update(timeEllapsed, this.stageManager.currentStage.stageNumber);
        }
    }

    getIsRunning = () => {
        return this._isRunning;
    }

    getIsComplete = () => {
        return this._isComplete;
    }

    _resetGame() {
        this._startTime = new Date();
        this.isComplete = false;
        this._isCollisionsEnabled = true;
        this.aICarManager.reset();
        this.medianStripManager.reset();
        this.playerCar.reset();
        this.stageManager.reset();
        this.stats.reset();
        this.sceneryManager.reset(this.stageManager.currentStage.stageType); 
    }
    
    _gameOver(isGameComplete) {
        this._isRunning = false;
        this._isComplete = isGameComplete;
    }
    
    _hasCollision() {        
        if(!this._isCollisionsEnabled) {
            return false;
        }
        
        let hasCarCollided = false;
        
        let aiCarCollidedWithWithPlayer = this.aICarManager.getCarCollidedWithPlayer(this.playerCar);

        if (aiCarCollidedWithWithPlayer) {
            this.playerCar.crash();
            aiCarCollidedWithWithPlayer.crash();
            hasCarCollided = true;
        }
        
        return hasCarCollided;
    }
}
