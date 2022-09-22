import { Resolver, Users } from "./types";
import {v4 as uuid} from 'uuid';
import { DBField, writeDB } from "../dbController";
import { collection, doc, getDocs, where,query, addDoc, getDoc } from "firebase/firestore";
import {db} from "../firebase"
import { idText } from "typescript";
import { generateAccessToken } from "../util/jwt";
import { getUser, pushUser, removeUser } from '../var/users';
import { Token } from "graphql";


const setJSON = (data:Users) => writeDB(DBField.USER, data);

const userResolver:Resolver = {
    Query:{
       users: async ()=>{
        const user = await collection(db,"user");
        const snapshot = await getDocs(user);
        return snapshot.docs.map(doc=>({...doc.data()}))
       },
       user: async (parent,{userid,password})=>{
        const user = await collection(db,"user");
        const snapshot = await getDocs(query(user,where("userid","==",userid),where("password","==",password)))
        console.log(snapshot.docs.map(doc=>({...doc.data()})));
        return snapshot.docs.map(doc=>({...doc.data()}))[0]
       }

    },
    Mutation:{
        isLogin:async (parent,{userid,token})=>{
            if(getUser(token).userid === userid){
                return {userid,isLogin:true};
            }else{
                return {userid,isLogin:false};
            }
        },
        loginUser:async (parent,{userid,password})=>{
            const user = await collection(db,"user");
            const snapshot = await getDocs(query(user,where("userid","==",userid),where("password","==",password)))
            const jwtresult = generateAccessToken(userid);
            const result:any = snapshot.docs.map(doc=>({...doc.data()}))
            if(result.length === 0) return {state:"Fail to login."}
            console.log(result);
            pushUser(userid,jwtresult,result[0].role);
            return {...result[0],token:jwtresult};
       },
       logoutUser:async (parent,{userid})=>{
            removeUser(userid);
            return {userid,isDone:true};
        },
        addUser:async (parent,{userid,password})=>{
            const newUser = {
                userid,
                password,
                role:"person"
            }
            const jwtresult = generateAccessToken(userid);
            const result = await addDoc(collection(db,'user'), newUser);
            const snapshot = await getDoc(result);
            console.log(snapshot.data())
            pushUser(userid,jwtresult,"person")
            return {
                ...snapshot.data(),
                id:snapshot.id,
                token:jwtresult
            }
       },
       updateUser:(parent,{id,password},{db})=>{
        /* TODO */
    },
       deleteUser:(parent,{id,password},{db})=>{
        /* TODO */
       },
    }
}

export default userResolver