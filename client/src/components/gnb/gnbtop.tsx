import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass,faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react";


const Top = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const gnbTop = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        console.log(gnbTop.current)
    },[window.scrollY])
    return (<div className="gnb top" ref={gnbTop}>
        <ul>
            <li className="top__logo">쇼핑몰</li>
            <li className="top__searchArea"><input type="text"/><button><FontAwesomeIcon icon={faMagnifyingGlass}/></button></li>
        </ul>
        {location.pathname !== "/" && <button className="goback" onClick={()=>navigate(-1)}><FontAwesomeIcon icon={faArrowLeft}/></button>}
    </div>)
}
export default Top