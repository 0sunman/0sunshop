import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CartLength } from "../../recoils/cart";
import { UserLoginState } from "../../recoils/user";

const Logout = () =>{
    const navigate = useNavigate();
    const [cartLength, setCartLength] = useRecoilState(CartLength);
    const [isLogin,setIsLogin] = useRecoilState(UserLoginState);
    useEffect(()=>{
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userid");
        window.localStorage.setItem("userid","nouser");
        setIsLogin(false);
        setCartLength(0);
        navigate(-1);
    })
    return <div>로그아웃</div>
}
export default Logout;