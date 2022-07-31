import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass,faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ShopHeaderTextColor, ShopLayoutGNBTopDisplay, ShopLayoutScrollY } from "../../recoils/layout"


const Top = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const textWhiteArea = ['/']
    const gnbTopRef = useRef<HTMLDivElement>(null);
    const [scrollY,setScrollY] = useRecoilState(ShopLayoutScrollY);
    const [headerTextColor,setHeaderTextColor] = useRecoilState(ShopHeaderTextColor);
    const display = useRecoilValue(ShopLayoutGNBTopDisplay);
    const TopMenuEvent = () => {
        setScrollY(window.scrollY);
        if(!gnbTopRef.current) return;
        if(scrollY > 60){
            gnbTopRef.current.classList.add("floating-menu")
        }else{
            gnbTopRef.current.classList.remove("floating-menu")
        }
    }
   
    useEffect(()=>{
        window.scrollY = scrollY;
    },[scrollY])

    
    textWhiteArea.some(path => {
        if(location.pathname === "/"){
        }else{
            scrollTo(0,0);
            setHeaderTextColor("black")
        }
    })
    useEffect(()=>{
        window.addEventListener('scroll',TopMenuEvent);
        return ()=>window.removeEventListener("scroll",TopMenuEvent);
    });
    useEffect(()=>{
        if(display){
            gnbTopRef.current!.style.display = "block";
        }else{
            gnbTopRef.current!.style.display = "none";
        }
    },[display])


/*
            <li className="top__searchArea"><input type="text"/><button><FontAwesomeIcon icon={faMagnifyingGlass}/></button></li>

*/
    return (<div className="gnb top" ref={gnbTopRef}>
        <ul>
            <li className="top__logo">
                <Link to="/" style={{color:"black",textDecoration:"none"}}>
                    <small className={headerTextColor}>THE</small><h2 className={headerTextColor}>YOUNGSUN</h2>
                </Link>
            </li>
        </ul>
        {location.pathname !== "/" && <button className="goback" onClick={()=>navigate(-1)}><FontAwesomeIcon icon={faArrowLeft}/></button>}
    </div>)
}
export default Top