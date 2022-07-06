import { BrowserRouter, useRoutes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
)
