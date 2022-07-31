import { SyntheticEvent } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_CART } from "../../graphql/carts";
import { GET_USER, LOGIN_USER } from "../../graphql/users";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { CartLength } from "../../recoils/cart";
import { ShopisLoading } from "../../recoils/layout";
import { UserLoginState } from "../../recoils/user";
import { CartDatas, User } from "../../types";
import arrToObj from "../../utill/arrToObj";

const Userpage = () => {
    const navigate = useNavigate();
    const [cartLength, setCartLength] = useRecoilState(CartLength);
    const [isLoadingSite,setIsLoading] = useRecoilState(ShopisLoading);
    const [isLogin,setIsLogin] = useRecoilState(UserLoginState);

    if(isLogin){
        navigate("/")
    }
    const {refetch} = useQuery<CartDatas>("getCart",()=>graphqlFetcher(GET_CART,{userid:window.localStorage.getItem("userid")}),{staleTime:0, cacheTime:0,
        onSuccess:({cart})=>{
            console.log(cart);
            setCartLength(cart.length);
        }
    })
    const {mutate:login} = useMutation(({userid,password}:User)=>graphqlFetcher(LOGIN_USER,{
        userid, password
    }),{onSuccess:({loginUser})=>{
        const {userid, token} = loginUser;
        setIsLoading(false);
        window.localStorage.setItem("userid",userid);
        if(token){
            window.localStorage.setItem("token",token);
        }
        setIsLogin(true);
        navigate(-1);
        refetch();
    },onError:(err)=>{
        console.log(err);
        setIsLoading(false);
    }}) 
    const doLogin = (e:SyntheticEvent)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const formData = new FormData(e.target as HTMLFormElement);
            const {userid,password} =(arrToObj([...formData]))
            login({userid,password})    
        }catch(e){
            alert("로그인 에러 발생!");
            setIsLoading(false);
        }
    }
    return (
        <div className="userpage">
            <div className="wrapper">
                <div className="top">
                    <h2>로그인 페이지 입니다.</h2>
                </div>
                <form onSubmit={doLogin}>
                    <input className="userpage__input" name="userid" placeholder="아이디를 입력해주세요."></input>
                    <input className="userpage__input" name="password" placeholder="비밀번호를 입력해주세요."></input>
                    <input type="submit" className="userpage__loginbutton" value="로그인"></input>
                </form>
                <div className="bottom">
                    <Link className="join-button" to={"/join"}><span className='join-text'>회원가입</span> <span className="material-symbols-outlined icon" style={{fontSize:"15px"}}>arrow_forward_ios</span></Link>
                </div>
            </div>
        </div>
    );
}

export default Userpage;