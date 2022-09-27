import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_CART } from "../../graphql/carts";
import { ADD_USER, GET_USER, LOGIN_USER } from "../../graphql/users";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { CartLength } from "../../recoils/cart";
import { ShopisLoading } from "../../recoils/layout";
import { UserLoginState } from "../../recoils/user";
import { CartDatas, User } from "../../types";
import arrToObj from "../../utill/arrToObj";

const Userpage = () => {
    const navigate = useNavigate();
    const [disabledButton, setDisabledButton] = useState(true);
    const [cartLength, setCartLength] = useRecoilState(CartLength);
    const [isLogin,setIsLogin] = useRecoilState(UserLoginState);
    const [isLoadingSite,setIsLoading] = useRecoilState(ShopisLoading);
    const [userid,setUserId]=useState("");
    const [password,setPassword]=useState("");
    const [passwordCheck,setPasswordCheck]=useState("");

    if(isLogin){
        navigate("/")
    }
    const {refetch} = useQuery<CartDatas>("getCart",()=>graphqlFetcher(GET_CART,{userid:{userid:window.localStorage.getItem("userid")?window.localStorage.getItem("userid"):""}}),{staleTime:0, cacheTime:0,
        onSuccess:({cart})=>{
            console.log(cart);
            setCartLength(cart.length);
        }
    })
    const {mutate:join} = useMutation(({userid,password}:User)=>graphqlFetcher(ADD_USER,{
        userid, password
    }),{onSuccess:({addUser})=>{
        const {userid, token} = addUser;
        setIsLoading(false)
        window.localStorage.setItem("userid",userid);
        if(token){
            window.localStorage.setItem("token",token);
        }
        setIsLogin(true);
        navigate("/");
        refetch();
    },onError:(err)=>{
        console.log(err)
        setIsLogin(false);
    }}) 
    const doJoin = (e:SyntheticEvent)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const formData = new FormData(e.target as HTMLFormElement);
            const {userid,password} =(arrToObj([...formData]))
            console.log(userid,password)
            join({userid,password})    
        }catch(e){
            alert("회원가입 에러 발생!");
            setIsLoading(false);
        }
    }
    const onChange = (e:SyntheticEvent)=>{
        e.preventDefault();
        if(e.target.name === "password"){
            setPassword(e.target.value);
        }else if(e.target.name === "passwordCheck"){
            setPasswordCheck(e.target.value);
        }else{
            setUserId(e.target.value);
        }
    }
    useEffect(()=>{
        if(userid.length < 4 || password.length < 4){
            setDisabledButton(true)
        }else{
            if(password === passwordCheck){
                setDisabledButton(false)
            }else{
                setDisabledButton(true)
            }    
        }
    },[passwordCheck,password])
    return (
        <div className="userpage">
            <div className="wrapper">
                <div className="top">
                    <h2>회원가입 페이지 입니다.</h2>
                </div>
                <form onSubmit={doJoin}>
                    <input className="userpage__input" name="userid" onChange={onChange}  placeholder="아이디를 입력해주세요."></input>
                    <input className="userpage__input" name="password" onChange={onChange} placeholder="비밀번호를 입력해주세요."></input>
                    <input className="userpage__input" name="passwordCheck" onChange={onChange} placeholder="비밀번호를 다시한번 입력해주세요."></input>
                    <input type="submit" className={`userpage__loginbutton ${disabledButton ? "disabled":""}`} value="회원가입" disabled={disabledButton}></input>
                </form>
            </div>
        </div>
    );
}

export default Userpage;