import { atom, selectorFamily, selector } from "recoil";

type ShopLayoutType = {
    SiteScrollY:number
    GNBTopDisplay:boolean
    GNBBottomDisplay:boolean
}

export const ShopLayout = atom<ShopLayoutType>({
    key:"ShopLayout",
    default:{
        SiteScrollY:0,
        GNBTopDisplay:true,
        GNBBottomDisplay:true
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