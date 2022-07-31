import { useEffect, useRef } from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ShopLayoutGNBBottomDisplay, ShopLayoutScrollY } from '../../recoils/layout';
import {CartLength} from "../../recoils/cart";
import { useQuery } from 'react-query';
import { CartDatas } from '../../types';
import { graphqlFetcher } from '../../queryClient';
import { GET_CART } from '../../graphql/carts';
import { UserLoginState } from '../../recoils/user';

const Bottom = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [display,setDisplay] = useRecoilState(ShopLayoutGNBBottomDisplay);
    const [scrollY,setScrollY] = useRecoilState(ShopLayoutScrollY);
    const [isLogin,setIsLogin] = useRecoilState(UserLoginState);
    const [cartLength,setCartLength] = useRecoilState(CartLength);
    const gnbBottomRef = useRef<HTMLDivElement>(null);
    const bannedArea = ['cart','payment','products/']

    
    useEffect(()=>{
        bannedArea.some((path)=>{
            if(location.pathname.indexOf(path) > -1){
                setDisplay(false);
                setScrollY(0);
                return true;
            }else{
                setDisplay(true);
            }
        })

    },[location])
    
    useEffect(()=>{
        if(display){
            gnbBottomRef.current!.style.display = "block";
        }else{
            gnbBottomRef.current!.style.display = "none";
        }
        console.log(display)
    },[display])
    useEffect(()=>{
        console.log(cartLength);
    },[cartLength])
    useEffect(()=>{
        console.log("isLogin",isLogin)
        console.log("DONE")
    },[isLogin])


    return (
            <div className="gnb bottom" ref={gnbBottomRef}>
                <ul>
                    <li>
                        <Link to='/'><span className="material-symbols-outlined">home</span></Link>
                        <span className='menu-submessage'>홈</span>
                    </li>
                    <li>
                        <Link to='/products'>
                            <span className="material-symbols-outlined">category</span>
                        </Link>
                        <span className='menu-submessage'>상품목록</span></li>
                    <li>
                        {isLogin ?  <Link to='/logout' style={{textDecoration:"none"}}>
                                        <span className="material-symbols-outlined">directions_run</span>
                                        <span className='menu-submessage'>로그아웃</span>                    
                                    </Link>:<Link to='/login' style={{textDecoration:"none"}}>
                                        <span className="material-symbols-outlined">face</span>
                                        <span className='menu-submessage'>로그인</span>
                                    </Link>}
                        </li>
                    <li><Link to='/cart'><span className="material-symbols-outlined">shopping_bag</span></Link>
                        <span className='menu-submessage'>장바구니({cartLength ? cartLength : 0})</span></li>
                </ul>
            </div>
        );
}

export default Bottom;