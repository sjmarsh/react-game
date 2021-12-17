import './Stats.css'

function Stats(props) {

    return(
        <div className="stats">
            <div className="timer-label">TIME</div>
            <div className="timer-value">{ props.model.timePlayedFormatted }</div>
            <div className="score-label">SCORE</div>
            <div className="score-value">{ props.model.score }</div>
            <div className="level-label">STAGE</div>
            <div className="level-value">{ props.model.stageNumber }</div>
        </div>
    );
}

export default Stats;