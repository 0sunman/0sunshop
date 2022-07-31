
import React from 'react';
import GlobalLayout from './pages/_layout'

const DynamicIndex = React.lazy(() => import('./pages/index'));
const DynamicProductItem = React.lazy(() => import('./components/product/ProductItem'));
const DynamicProductIndex = React.lazy(() => import('./pages/products/index'));
const DynamicProductId = React.lazy(() => import('./pages/products/[id]'));
const DynamicCartIndex = React.lazy(() => import('./pages/cart/index'));
const DynamicTextIndex = React.lazy(() =>import('./pages/test/index'));
const DynamicPaymentIndex = React.lazy(() =>import('./pages/payment/index'));
const DynamicAdminIndex = React.lazy(()=>import('./pages/admin/index'));
const DynamicUserIndex = React.lazy(()=>import('./pages/user/index'));
const DynamicUserJoinIndex = React.lazy(()=>import('./pages/user/join'));
const DynamicUserLogoutIndex = React.lazy(()=>import('./pages/user/logout'));



export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <DynamicIndex />, index: true},
      { path: '/products', element: <DynamicProductIndex />, index: true},
      { path: '/products/:id', element: <DynamicProductId />, },
      { path: '/cart', element: <DynamicCartIndex/>, index:true},
      { path: '/login', element: <DynamicUserIndex/>, index:true},
      { path: '/logout', element: <DynamicUserLogoutIndex/>, index:true},
      { path: '/join', element: <DynamicUserJoinIndex/>, index:true},
      { path: '/test', element: <DynamicTextIndex/>, index:true},
      { path: '/payment', element: <DynamicPaymentIndex/>, index:true},
      { path: '/admin', element: <DynamicAdminIndex/>, index:true},
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/components/product/ProductItem' },
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/cart' },
  { route: '/test'},
  { route: '/payment'}
]
