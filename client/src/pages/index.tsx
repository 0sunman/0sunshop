import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ShopHeaderTextColor } from "../recoils/layout";
import {calcValues} from "./animate";


const Home = ()=> {

    const [headerTextColor,setHeaderTextColor] = useRecoilState(ShopHeaderTextColor);
    const [currentSceneIndex,setCurrentSceneIndex] = useState(0);
    const [section0_MessageAOpacity,setSection0_MessageAOpacity] = useState(0);
    const [section0_MessageBOpacity,setSection0_MessageBOpacity] = useState(0);
    const [section1_MessageAOpacity,setSection1_MessageAOpacity] = useState(0);
    const [section1_MessageBOpacity,setSection1_MessageBOpacity] = useState(0);
    const [undericon, setUndericon] = useState(false);
    const sections = [
        {
            height:3000,
            values:{
                messageA_opacity_in: [0, 1, { start: 0, end: 0.25 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.5 }],
                messageB_opacity_in: [0, 1, { start: 0.5, end: 0.75 }],
                messageB_opacity_out: [1, 0, { start: 0.75, end: 1 }],
            },
            links:[
                "/products/TApPIO7RvtP3bacIxDmx",
                "/products/wW3cP6JI9yokZDVN8oL7",
            ]
        },
        {
            height:3000,
            values:{
                messageA_opacity_in: [0, 1, { start: 0, end: 0.25 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.5 }],
                messageB_opacity_in: [0, 1, { start: 0.5, end: 0.75 }],
                messageB_opacity_out: [1, 0, { start: 0.75, end: 1 }],
            }
        },
    ]
    type SectionBorderResult = number;
    const sectionInfo = {
        totalHeight:sections.reduce((result,element) => (result+element.height),0),
        sectionBorders:sections.reduce((result:any,element:{height:number})=>{
            const data = (result.length == 0) ? element.height : result[result.length-1] + element.height;
            result.push(data);
            return result;
        },[])
    }
    const {totalHeight, sectionBorders} = sectionInfo;

    const currentScene = (posY:number)=>{
        sectionBorders.some((data:number,idx:number)=>{
            if(data > posY){
                setCurrentSceneIndex(idx);
                return true;
            }else{
                return false;
            }
        })
    }
    const homePage = useRef<HTMLDivElement>(null);
    const homeScrollEvent:EventListener = (e)=>{
        currentScene(window.pageYOffset);
        sceneEvent();
    }
    useEffect(()=>{
        window.addEventListener("scroll",homeScrollEvent);
        sceneEvent();
        return (()=>{
            window.removeEventListener("scroll",homeScrollEvent);
        })
    });
    const clearEffect = ()=>{
        setSection0_MessageAOpacity(0);
        setSection0_MessageBOpacity(0);
        setSection1_MessageAOpacity(0);
        setSection1_MessageBOpacity(0);
        
    }
    const sceneEvent = ()=>{
        clearEffect();
        console.log(headerTextColor, currentSceneIndex)
        const {height,values} = sections[currentSceneIndex]
        const currentYOffset = (currentSceneIndex === 0) ? window.pageYOffset : window.pageYOffset - sectionBorders[currentSceneIndex - 1];
        const scrollRatio = currentYOffset/height;
        switch(currentSceneIndex){
            case 0:
                if(scrollRatio <= 0.25){
                    setSection0_MessageAOpacity(calcValues(height, values!.messageA_opacity_in, currentYOffset));
                }else if(scrollRatio <= 0.5){
                    setSection0_MessageAOpacity(calcValues(height, values!.messageA_opacity_out, currentYOffset));
                }else if(scrollRatio <= 0.75){
                    setSection0_MessageBOpacity(calcValues(height, values!.messageB_opacity_in, currentYOffset));
                }else if(scrollRatio <= 1){
                    setSection0_MessageBOpacity(calcValues(height, values!.messageB_opacity_out, currentYOffset));
                }
                setHeaderTextColor("white");
                
                break;
            case 1:

                if(scrollRatio <= 0.25){
                    setSection1_MessageAOpacity(calcValues(height, values!.messageA_opacity_in, currentYOffset));
                }else if(scrollRatio <= 0.5){
                    setSection1_MessageAOpacity(calcValues(height, values!.messageA_opacity_out, currentYOffset));
                }else if(scrollRatio <= 0.75){
                    setSection1_MessageBOpacity(calcValues(height, values!.messageB_opacity_in, currentYOffset));
                }else if(scrollRatio <= 1){
                    setSection1_MessageBOpacity(calcValues(height, values!.messageB_opacity_out, currentYOffset));
                }

                setHeaderTextColor("black");
                break;
        }
        if(window.pageYOffset + window.innerHeight === document.querySelector("html")!.scrollHeight){
            setUndericon(false)
        }else{
            setUndericon(true)
        }
    }

    
    return (<div className={`home section-${currentSceneIndex}`} ref={homePage} style={{height:totalHeight}}>
        <Link to="/products/TApPIO7RvtP3bacIxDmx" style={{color:"white",textDecoration:"none",width:"100%",height:"100%",position:"fixed"}}>
        <div className="section home__section0">

            <div className="a" style={{color:"white",opacity:section0_MessageAOpacity,position:"fixed",top:"29%", left:"13%", transform:"translate(-7%)"}}>

                    <h2 style={{fontSize:"25px"}}>오버사이즈 핏 저지 폴로 셔츠</h2>
                    <p style={{marginTop:"15px",fontSize:"15px",width:"320px"}}>순수 코튼 저지 소재로 만들어진 폴로 셔츠입니다. 오버사이즈 핏으로 이루어져 있으며, 깔끔하게 마감된 가장자리와 버튼 타입의 플래킷이 특징입니다. 측면에 슬릿이 있어 착용 시 편안함을 더해 줍니다.</p>
                              
            </div>
            <div className="b" style={{color:"white",opacity:section0_MessageBOpacity,position:"fixed",bottom:"20%", right:"10%", transform:"translate(-10%)"}}>
                <Link to="/products/wW3cP6JI9yokZDVN8oL7" style={{color:"white",textDecoration:"none"}}>
                    <h2 style={{fontSize:"25px"}}>더블 스트랩 러버 슬라이드</h2>
                    <p style={{marginTop:"15px",fontSize:"15px",width:"270px"}}>환경친화적인 블룸 폼™ 소재를 활용한 슬라이드입니다. 더블 스트랩으로 이루어져 있으며, 밑창에 COS 로고를 더해 미니멀한 형태로 완성되었습니다.</p>
                </Link>
            </div>
        </div>
        <div className="section home__section1">
            <div className="a" style={{color:"white",opacity:section1_MessageAOpacity,position:"fixed",top:"40%", right:"5%", transform:"translate(-7%)"}}>
                <Link to="/products/TApPIO7RvtP3bacIxDmx" style={{color:"black",textDecoration:"none"}}>
                    <h2 style={{fontSize:"25px"}}>레귤러 오가닉 코튼 티셔츠</h2>
                    <p style={{marginTop:"15px",fontSize:"15px",width:"280px"}}>여유로운 실루엣의 크루넥 티셔츠예요. 너비감 있는 슬리브가 자리해 있답니다.</p>
                </Link>                
            </div>
            <div className="b" style={{color:"white",opacity:section1_MessageBOpacity,position:"fixed",bottom:"20%", left:"10%", transform:"translate(-10%)"}}>
                <Link to="/products/wW3cP6JI9yokZDVN8oL7" style={{color:"black",textDecoration:"none"}}>
                    <h2 style={{fontSize:"25px"}}>컷 아웃 퍼프 슬리브 탑</h2>
                    <p style={{marginTop:"15px",fontSize:"15px",width:"320px"}}>퍼프 슬리브와 스퀘어 네크라인이 돋보이는 탑이에요. 뒷면의 삼각 컷 아웃은 단추로 여미는 디자인이랍니다.</p>
                </Link>
            </div>
        </div>
        <div>
            <span className="material-symbols-outlined scroll-under-icon" style={{display:(undericon?"block":"none"),color:"white",position:"fixed",left:"50%", bottom:"calc(1% + 67px)", transform:"linear-gradient(45deg, red, yellow 40%, blue)"}}>
            keyboard_double_arrow_down
            </span>
        </div>
        </Link>  
    </div>)}
export default Home;