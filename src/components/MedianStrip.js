import './MedianStrip.css'

function MedianStrip(props) {
        
    const getId = (model) =>
    {
        return `id-${model.id}`;
    }

    const getStyle = (model) =>
    {
        return {
            top: `${model.top}px`, 
            height: `${model.height}px`, 
            width: '5px', 
            backgroundColor: 'white', 
            position: 'absolute'
        }; 
    }
    
    return (
        <div className="median-strip">
            {props.medianStripes.map((ms) => {
                return (<div key={ms.id} className={ getId(ms)} style={ getStyle(ms)} />);
            })}
        </div>
    );    
}

export default MedianStrip;