
import React from 'react';
import GlobalLayout from './pages/_layout'

const DynamicIndex = React.lazy(() => import('./pages/index'));
const DynamicProductItem = React.lazy(() => import('./components/product/ProductItem'));
const DynamicProductIndex = React.lazy(() => import('./pages/products/index'));
const DynamicProductId = React.lazy(() => import('./pages/products/[id]'));
const DynamicCartIndex = React.lazy(() => import('./pages/cart/index'));


export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <DynamicIndex />, index: true},
      { path: '/products', element: <DynamicProductIndex />, index: true},
      { path: '/products/:id', element: <DynamicProductId />, },
      { path: '/cart', element: <DynamicCartIndex/>, index:true}
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/components/product/ProductItem' },
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/cart' },
]
