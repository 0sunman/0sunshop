
import React from 'react';
import GlobalLayout from './pages/_layout'

const DynamicIndex = React.lazy(() => import('./pages/index'));
const DynamicProductsIndex = React.lazy(() => import('./pages/products/index'));
const DynamicProductsId = React.lazy(() => import('./pages/products/[id]'));
const DynamicComponentsProductProductItem = React.lazy(() => import('./pages/components/product/ProductItem'));


export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <DynamicIndex />, index: true},
      { path: '/products', element: <DynamicProductsIndex />, index: true},
      { path: '/products/:id', element: <DynamicProductsId />, },
      { path: '/components/product/ProductItem', element: <DynamicComponentsProductProductItem />, },
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/components/product/ProductItem' },
]
