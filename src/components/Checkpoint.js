import './Checkpoint.css';

function Checkpoint(props) {

    return(
        <div className="checkpoint" hidden={!props.stageManager.showCheckpoint}>
            {props.stageManager.isFinalStage ? 'ALMOST AT THE FINISH LINE!' : `GET READY FOR STAGE ${props.stageManager.currentStage.stageNumber + 1}`}
        </div>
    );
}

export default Checkpoint;