import { SyntheticEvent } from "react"
import { QueryClient, useMutation } from "react-query";
import { UPDATE_CART } from "../../graphql/carts";
import { ADD_PRODUCT } from "../../graphql/products";
import { getQueryClient, graphqlFetcher, QueryKeys } from "../../queryClient";
import { MutableProduct, ProductCustom } from "../../types";
import arrToObj from "../../utill/arrToObj";


const AddForm = ()=>{
    const client = getQueryClient();
    const {mutate:addProduct} = useMutation("addProduct",({title,imageUrl,price,description}:MutableProduct)=>graphqlFetcher(ADD_PRODUCT,{title,imageUrl,price,description}),{
        onSuccess:({addProduct})=>{
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
        addProduct(ObjectWrappedformData);

    }
    return (<form onSubmit={handleSubmit}>
        <label>상품명 : <input name="title" type="text"/></label>
        <label>이미지 경로 : <input name="imageUrl" type="text"/></label>
        <label>상품가격 : <input name="price" type="number" required min="1000"/></label>
        <label>상세 : <textarea name="description"/></label>
        <button type="submit">등록</button>
    </form>)
}
export default AddForm