import ReactLoading from 'react-loading';

const Spinner = ()=>{
    return (<div className="payment-popup-area" style={{"display":"flex"}}>
        <ReactLoading type="spinningBubbles" color="#46675c"/>
    </div>)
}
export default Spinner;