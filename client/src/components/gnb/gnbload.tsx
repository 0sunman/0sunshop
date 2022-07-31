import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import { useRecoilValue } from 'recoil';
import { ShopisLoading } from '../../recoils/layout';

const popLoad = ()=>{
    const isLoading = useRecoilValue(ShopisLoading);
    return (<div className="payment-popup-area" style={{"display":isLoading?"flex":"none"}}>
        <ReactLoading type="spinningBubbles" color="#46675c"/>
    </div>)
}
export default popLoad;