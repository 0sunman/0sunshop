import { useCallback, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { TextState1 } from "../../recoils/cart";

const Testpage = ()=>{
    const Text = useRecoilValue(TextState1)
    const setText = useSetRecoilState(TextState1);
    useEffect(()=>{
        setText("TestMan2");

    },[])
    const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value);
    },[]);
    return (<div><input type="text" onChange={onChange}></input>{Text} {Text?.length}</div>)
}

export default Testpage;