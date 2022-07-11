import products from "../../pages/products";
import { ProductCustoms, ProductCustom } from "../../types";
import AdminItem from "./adminItem";

const AdminList = ({
    list,
    editingIndex,
    startEdit,
    doneEdit
    }:{
        list:{
            products: ProductCustom[]
        }[],
        editingIndex:number|null,
        startEdit:(index:number)=>()=>void,
        doneEdit:()=>void
    })=>{
    return (
        <ul className="products">
            {list?.map(page => page.products.map((product, i) => (
                    <AdminItem {...product} key={product.id}
                        isEditing={editingIndex === i}
                        startEdit={startEdit(i)}
                        doneEdit={doneEdit}
                    ></AdminItem>
            )))}
            
        </ul>
        )
}

export default AdminList;
