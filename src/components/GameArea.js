import AICars from "./AICars";
import Checkpoint from "./Checkpoint";
import Dialog from "./Dialog";
import HighScores from "./HighScores";
import MedianStrip from "./MedianStrip";
import PlayerCar from "./PlayerCar";
import Scenery from "./Scenery";
import Stats from "./Stats";

import { GameModel } from "../models/GameModel";
import { useState } from "react";

function GameArea(props) {

    const [game, setGameState] = useState(new GameModel());
    const [timer, setTimer] = useState();

    const mainLoop = () => {
        if(game.getIsRunning()) { 
            game.animate();
            setGameState({...game});
            let thisTimer = setTimeout(mainLoop, 100 / game.stageManager.currentStage.speed);
            setTimer(thisTimer);
        }
        else {
            clearTimeout(timer);
        }
    }
    
    const startGame = () => {
        if(!game.getIsRunning()) {
            game.startGame();
            setGameState({...game});        
            mainLoop();
        }
    }

    const stopGame = () => {
        game.stopGame();
        setGameState({...game});
        clearTimeout(timer);
    }

    const handleKeyDown = (e) => {
        if(e.key === 's') {
            startGame();
        }
        
        if(e.key === 'x') {
            stopGame();
        };

        if(e.key === 'ArrowLeft') {
            game.movePlayerCarLeft();
        }

        if(e.key === 'ArrowRight') {
            game.movePlayerCarRight();
        }

        if(e.key === 'c') {
            game.toggleCollisionsEnabled();           
        }
    }   

    const getDialogDisplayMode = () => {
        let mode = 'Hide';
        if(!game.getIsRunning() && !game.getIsComplete() && !game.playerCar.hasCollision) {
            mode = 'Start';
        }
        else if (game.playerCar.hasCollision) {
            mode = 'GameOver';
        }
        else if (game.getIsComplete()) {
            mode = 'Complete';
        }

        return mode;
    }

    const getHighScoresDisplayMode = () => {
        return game.getIsRunning() ? 'Hide' : 'Button';
    }

    return (<div className="game-area" tabIndex="0" onKeyDown={handleKeyDown}>        
        <div className="fog" hidden={!game.stageManager.currentStage.showFog} />
        <div className="message-area">
            <Dialog displayMode={getDialogDisplayMode()} onClickAction={startGame} />
            <HighScores displayMode={getHighScoresDisplayMode()} currentScore={game.stats.score} currentStage={game.stats.stageNumber}/>
            <Checkpoint stageManager= {game.stageManager} />
        </div>                
        <Stats model={ game.stats }/>
        <div className={`sky sky-${game.stageManager.currentStage.stageType}`} />
        <div className={`ground ground-${game.stageManager.currentStage.stageType}`}>
            <Scenery scenery={ game.sceneryManager.scenery } currentStageType={ game.stageManager.currentStage.stageType } />
            <div className="road">
                <MedianStrip medianStripes={ game.medianStripManager.medianStripes }/>
                <AICars cars={ game.aICarManager.cars }/>
                <PlayerCar car={ game.playerCar } />
            </div>
        </div>

    </div>);
}

export default GameArea;