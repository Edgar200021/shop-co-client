import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

import './styles/index.css'
import { SkeletonTheme } from 'react-loading-skeleton'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
            minWidth: '150px',
            maxWidth: '250px',
            width: '100%',
          },
        }}
      />
    </Provider>
  </SkeletonTheme>
)
