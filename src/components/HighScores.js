import './HighScores.css';
import { ScoreModel } from '../models/ScoreModel';
import { useState, useEffect } from 'react';

function HighScores(props) {
    const MAX_HIGH_SCORE_COUNT = 10;
    const HIGH_SCORES_STORAGE_KEY = 'highScores';

    const [displayMode, setDisplayMode] = useState(props.displayMode);
    const [highScores, setHighScores] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [hidePlayerNameEntry, setHidePlayerNameEntry] = useState(1);
    const [hasEnteredHighScore, setHasEnteredHighScore] = useState(0);
    
    useEffect(() => {
        setDisplayMode(props.displayMode);
        setHasEnteredHighScore(0);
    }, [props.displayMode]);

    const showHighScores = () => {
        let storedScores = localStorage.getItem(HIGH_SCORES_STORAGE_KEY);
        if(storedScores && storedScores.length > 0) {
            setHighScores(JSON.parse(storedScores));
        }
        setHidePlayerNameEntry(0);
        setDisplayMode('Show');
    }

    const hideHighScores = () => {
        setDisplayMode('Button');
    }

    const newScoreEntryIsHidden = () => {
        let scores = highScores.map(h => h.Score);
        return (props.currentScore <= Math.min(scores) && scores.length > MAX_HIGH_SCORE_COUNT)
            || hasEnteredHighScore
            || props.currentScore === 0
            || hidePlayerNameEntry;
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            addNewHighScore();
        }
    }

    const addNewHighScore = () => {
        if(playerName && playerName.length > 0) {
            if(highScores.length >= MAX_HIGH_SCORE_COUNT) {
                setHighScores(highScores.splice(-1));
            }
            
            highScores.push(new ScoreModel({ playerName: playerName, score: props.currentScore, stage: props.currentStage, scoreDate: new Date() }));
            let orderedScores = highScores.sort((a, b) => parseInt(b.score) - parseInt(a.score));
            setHighScores(orderedScores);
            setHidePlayerNameEntry(1);
            setPlayerName('');
                        
            localStorage.setItem(HIGH_SCORES_STORAGE_KEY, JSON.stringify(highScores));

            setHasEnteredHighScore(1);
        }
    }

    if(displayMode === 'Button'){
        return (
            <div>
                <div className="high-scores-button" onClick={showHighScores}>
                    <p>High Scores</p>
                </div>
            </div>
        );
    }
    else if(displayMode === 'Show') {
        return (
            <div>
                <div className="high-scores">
                    <h1>High Scores</h1>
                    <button className="high-scores-close-button" onClick={hideHighScores}>X</button>
                    <div hidden={newScoreEntryIsHidden()}>
                        <p>Enter Your Name:</p>
                        <input autoFocus id="playerNameInput" type="text" value={playerName}
                            maxLength="15" onKeyDown={handleKeyDown} onChange={e => setPlayerName(e.target.value)} />
                    </div>
                    <table className="high-scores-table">
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Stage</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {highScores.map((s, index) => {
                                return(
                                <tr key={index}>
                                    <td>{s.playerName}</td>
                                    <td>{s.stage}</td>
                                    <td>{s.score}</td>
                                </tr>)}
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    else {
        return null;
    }
}

export default HighScores