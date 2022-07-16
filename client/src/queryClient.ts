import request, { RequestDocument } from 'graphql-request';
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
        if(!client) client = new QueryClient({
          defaultOptions:{
            queries:{
              cacheTime:1000*60*60*24,
              staleTime:1000,
              refetchOnMount:false,
              refetchOnReconnect:false,
              refetchOnWindowFocus:false
            }
          }
        });
        return client
    }
})()

const BASE_URL = import.meta.env.VITE_SERVER_URL as string
console.log(BASE_URL);

export const graphqlFetcher = async(query:RequestDocument, variables={})=>request(BASE_URL + "/graphql", query, variables,{
  'Content-Type':'application/json',
  'Access-Control-Allow-Origin':BASE_URL
}); // query => GraphQL이 들어감.

export const QueryKeys = {
  PRODUCTS : 'PRODUCTS',
  CARTS : 'CARTS',
  FUCK:"FUCKS"
}


/*

interface AnyOBJ{ [key:string]:any };

export const restFetcher = async ({
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
  }} // RestAPI (method와 path)가 들어감.
*/