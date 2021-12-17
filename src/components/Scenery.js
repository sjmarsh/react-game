import './Scenery.css'

function Scenery(props) {

    const getStyle = (model) => {
        const imageUrl = `${process.env.PUBLIC_URL}/images/scenery/${model.sceneryType.fullName}.png`;
        return {
            top: `${model.top}px`, 
            left: `${model.left}px`, 
            height: `${model.height}px`, 
            width: `${model.width}px`,
            backgroundImage: `url(${imageUrl})`
        }
    }
    
    return(
        props.scenery.map((sceneryModel, index) => { 
            return(
            <div key={index}>
                <div className='scenery-item' style={getStyle(sceneryModel.leftItem)}/>
                <div className='scenery-item' style={getStyle(sceneryModel.rightItem)}/>           </div>
            )
        })
    );
}

export default Scenery;