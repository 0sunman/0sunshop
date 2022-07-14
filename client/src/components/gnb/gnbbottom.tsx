import { useEffect, useRef } from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ShopLayoutGNBBottomDisplay, ShopLayoutScrollY } from '../../recoils/layout';
import {CartLength} from "../../recoils/cart";
import { useQuery } from 'react-query';
import { CartDatas } from '../../types';
import { graphqlFetcher } from '../../queryClient';
import { GET_CART } from '../../graphql/carts';

const Bottom = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [display,setDisplay] = useRecoilState(ShopLayoutGNBBottomDisplay);
    const [scrollY,setScrollY] = useRecoilState(ShopLayoutScrollY);
    const [cartLength,setCartLength] = useRecoilState(CartLength);
    const gnbBottomRef = useRef<HTMLDivElement>(null);
    const bannedArea = ['cart','payment']

    const {refetch} = useQuery<CartDatas>("getCart",()=>graphqlFetcher(GET_CART),{staleTime:0, cacheTime:0,
        onSuccess:({cart})=>{
            setCartLength(cart.length);
        }
    });

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
        refetch()
    })


    return (
            <div className="gnb bottom" ref={gnbBottomRef}>
                <ul>
                    <li><Link to='/'>홈</Link></li>
                    <li><Link to='/products'>상품목록</Link></li>
                    <li><Link to='/admin'>어드민</Link></li>
                    <li><Link to='/cart'>장바구니</Link><br/>({cartLength ? cartLength : 0})</li>
                </ul>
            </div>
        );
}

export default Bottom;