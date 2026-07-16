import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { store } from './app/app.store'
import { Provider } from 'react-redux'
import App from './app/App'
import "./app/index.css"

createRoot(document.getElementById('root')).render(
 
   <BrowserRouter>
   <Provider store={store} >
     <App/>
   </Provider>
   </BrowserRouter>
 
)
