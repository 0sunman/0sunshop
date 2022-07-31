import React, {Suspense} from 'react';
import { Outlet } from 'react-router-dom';
import { GNBLoad } from '../components/gnb';
const Layout = () =>{
    return (
        <div>
            <Suspense fallback={<GNBLoad></GNBLoad>}>
                <Outlet/>
            </Suspense>
        </div>
    )
}

export default Layout;