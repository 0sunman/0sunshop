import { ProductCustom,MutableProduct } from "../../types";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { ADD_CART } from "../../graphql/carts";
import { getQueryClient, graphqlFetcher, QueryKeys } from "../../queryClient";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "../../graphql/products";
import arrToObj from "../../utill/arrToObj";
import { SyntheticEvent } from "react";

const AdminItem = ({
    id,
    imageUrl,
    price,
    title,
    description,
    createdAt,
    isEditing,
    startEdit,
    doneEdit
}:ProductCustom & {isEditing:boolean, startEdit:()=>void, doneEdit:()=>void})=>{
    const client = getQueryClient();
    const {mutate:updateProduct} = useMutation("updateProduct",({title,imageUrl,price,description}:MutableProduct)=>graphqlFetcher(UPDATE_PRODUCT,{id, title,imageUrl,price,description}),{
        onSuccess:({updateProduct})=>{
            client.invalidateQueries(QueryKeys.PRODUCTS,{
                exact:false,
                refetchInactive:true,
            })
            doneEdit();
        }
    })
    const {mutate:deleteProduct} = useMutation("deleteProduct",({id}:{id:string})=>graphqlFetcher(DELETE_PRODUCT,{id}),{
        onSuccess:({deleteProduct})=>{
            client.invalidateQueries(QueryKeys.PRODUCTS,{
                exact:false,
                refetchInactive:true,
            })
        }
    })
    const handleSubmit = (e:SyntheticEvent)=>{
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const ObjectWrappedformData = arrToObj([...formData]) as MutableProduct;
        ObjectWrappedformData.price = Number(ObjectWrappedformData.price)
        console.log(ObjectWrappedformData);
        updateProduct(ObjectWrappedformData);
    }
    const deleteItem = ()=>{
        deleteProduct({id});
    }

    if(isEditing){
        return (
            <li className="product-item">
            <form onSubmit={handleSubmit}>
                <label>상품명 : <input name="title" type="text" defaultValue={title}/></label>
                <label>이미지 경로 : <input name="imageUrl" type="text" defaultValue={imageUrl}/></label>
                <label>상품가격 : <input name="price" type="number" required min="1000" defaultValue={price}/></label>
                <label>상세 : <textarea name="description" defaultValue={description}/></label>
                <button type="submit">저장</button>
            </form>
            </li>
        )
    }else{
        return (<li className="product-item">
            <Link to={`/products/${id}`}>
                <p  className="product-item__title">{title}</p>
                <p><img  className="product-item__image" src={imageUrl}/></p>
                <p><span  className="product-item__price">₩{price}</span></p>
            </Link>
            {!createdAt && <span>삭제된 상품</span>}
            <p><button onClick={startEdit}> 수정</button><button onClick={deleteItem}> 삭제</button></p>
        </li>)
    }
    }

export default AdminItem


