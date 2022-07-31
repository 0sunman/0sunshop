import { atom, selector } from "recoil";
import { User } from "../types";
/* new */

type UserStateType = Pick<User,"userid"> & {
    isLogin?:boolean
}

export const UserState = atom<UserStateType>({
    key:"UserState",
    default:{
        userid:"",
        isLogin:false
    }
})

export const UserIdState = selector({
    key:"UserLoginState",
    get:({get})=>get(UserState).userid,
    set:({get,set},newValue)=>{
        if(typeof newValue === "string"){
            set(UserState,{...get(UserState), userid:newValue})
        }
    }
})

export const UserLoginState = selector({
    key:"UserLoginState",
    get:({get})=>get(UserState).isLogin,
    set:({get,set},newValue)=>{
        if(typeof newValue === "boolean"){
            set(UserState,{...get(UserState), isLogin:newValue})
        }
    }
})