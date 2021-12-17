import './Dialog.css';

function Dialog(props) {

    const getHeading = (displayMode) => {
        const headings = [
            { displayMode: 'Start', heading:'Click to Start' },
            { displayMode: 'GameOver', heading:'Game Over!' },
            { displayMode: 'Complete', heading:'You Win!' }
        ]

        let foundHeading = headings.find(h => h.displayMode === displayMode);
        return foundHeading ? foundHeading.heading : '';
    }

    const getSubHeading = (displayMode) => {
        if(displayMode === 'GameOver' || displayMode === 'Complete') {
            return 'Click to Play Again';
        }
        return '';
    }

    const invokeOnClickAction = () => {
        if(props.onClickAction) {
            props.onClickAction();
        }
    }

    return (
        <div className="dialog" hidden={props.displayMode === 'Hide'} onClick={invokeOnClickAction}>
            <h1>{getHeading(props.displayMode)}</h1>
            {getSubHeading(props.displayMode).length > 0 &&
                <p>{getSubHeading(props.displayMode)}</p>
            }
        </div>
    );
}

export default Dialog;