function PlayerCar(props) {

    const color = (model) => {
        return model.color ?? 'red';
    }

    const css = (model) => {
        return model.hasCollision ? 'car-crash' : '';
    }

    const styles = (model) => {
        return {
            top: `${model.top}px`,
            left: `${model.left}px`, 
            height: `${model.height}px`, 
            width: `${model.width}px`
        }
    }

    return (
        <div className={`player-car ${color(props.car)}-car ${css(props.car)}`} style={styles(props.car)}></div>
    );
}

export default PlayerCar;