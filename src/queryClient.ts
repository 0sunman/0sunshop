import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
  
  // Create a client
export const getQueryClient = (() => {
    let client:(QueryClient | null) = null
    return ()=>{
        if(!client) client = new QueryClient();
        return client
    }
})()

interface AnyOBJ{ [key:string]:any };
const BASE_URL = `https://fakestoreapi.com`

export const fetcher = async ({
  method,
  path,
  body,
}:{
  method : 'GET'|'POST'|'PUT'|'DELETE'|'PATCH',
  path : string,
  body? : AnyOBJ,
  param? : AnyOBJ
})=>{
  try{
    const url = `${BASE_URL}${path}`;
    console.log(url);
    const fetchOptions:RequestInit = {
      method,
      headers:{
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin':BASE_URL
      }
    }
    const res = await fetch(url,fetchOptions);
    const json = await res.json();
    return json;
  }catch(e){
    console.error(e);
  }}

export const QueryKeys = {
  PRODUCTS : 'PRODUCTS',
  FUCK:"FUCKS"
}