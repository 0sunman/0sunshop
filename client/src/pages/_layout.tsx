import React, {Suspense} from 'react';
import { Outlet } from 'react-router-dom';
import { GNBSpiner } from '../components/gnb';
const Layout = () =>{
    return (
        <div>
            <Suspense fallback={<GNBSpiner/>}>
                <Outlet/>
            </Suspense>
        </div>
    )
}

export default Layout;