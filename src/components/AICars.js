function AICars(props) {
    
    const getColor = (model) => {
        return model.color.toLowerCase();
    }

    const getCss = (model) => {
        return model.hasCollision ? 'car-crash' : '';
    }

    const getCarClass = (model) => {
        return `ai-car ${getColor(model)}-car ${getCss(model)}`;
    }

    const getStyles = (model) => {
        return {
            top: `${model.top}px`,
            left: `${model.left}px`,
            height: `${model.height}px`, 
            width: `${model.width}px`
        };
    }

    return (
        props.cars.map((aiCar, index) => {
            return(
                <div key={index} className={getCarClass(aiCar)} style={getStyles(aiCar)} />
            )
        })
    );
}

export default AICars;