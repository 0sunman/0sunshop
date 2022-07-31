import { atom, selectorFamily, selector } from "recoil";

type ShopLayoutType = {
    topColor:string
    SiteScrollY:number
    GNBTopDisplay:boolean
    isLoading:boolean
    doneCart:boolean
    GNBBottomDisplay:boolean
}

export const ShopLayout = atom<ShopLayoutType>({
    key:"ShopLayout",
    default:{
        topColor:"black",
        isLoading:false,
        doneCart:false,
        SiteScrollY:0,
        GNBTopDisplay:true,
        GNBBottomDisplay:true
    }
})


export const ShopisLoading = selector<boolean>({
    key:"ShopisLoading",
    get:({get})=>get(ShopLayout).isLoading,
    set:({get,set},newValue)=>{
        if(typeof newValue === "boolean"){
            set(ShopLayout,{...get(ShopLayout), isLoading:newValue})
        }
    }
})

export const ShopHeaderTextColor = selector<string>({
    key:"ShopHeaderTextColor",
    get:({get})=>get(ShopLayout).topColor,
    set:({get,set},newValue)=>{
        if(typeof newValue === "string"){
            set(ShopLayout,{...get(ShopLayout), topColor:newValue})
        }
    }
})


export const ShopDoneCart = selector<boolean>({
    key:"ShopDoneCart",
    get:({get})=>get(ShopLayout).doneCart,
    set:({get,set},newValue)=>{
        if(typeof newValue === "boolean"){
            set(ShopLayout,{...get(ShopLayout), doneCart:newValue})
        }
    }
})
export const ShopLayoutScrollY = selector<number>({
    key:"ShopLayoutScrollY",
    get:({get})=>get(ShopLayout).SiteScrollY,
    set:({get,set},newValue)=>{
        if(typeof newValue === "number"){
            set(ShopLayout,{...get(ShopLayout), SiteScrollY:newValue})
        }
    }
})

export const ShopLayoutGNBTopDisplay = selector<boolean>({
    key:"ShopLayoutGNBTopDisplay",
    get:({get})=>(get(ShopLayout).GNBTopDisplay),
    set:({get,set},newValue)=>{
        if(typeof newValue === "boolean"){
            set(ShopLayout,{...get(ShopLayout), GNBTopDisplay:newValue})
        }
    }
})

export const ShopLayoutGNBBottomDisplay = selector<boolean>({
    key:"ShopLayoutGNBBottomDisplay",
    get:({get})=>(get(ShopLayout).GNBBottomDisplay),
    set:({get,set},newValue)=>{
        if(typeof newValue === "boolean"){
            set(ShopLayout,{...get(ShopLayout), GNBBottomDisplay:newValue})
        }
    }
})