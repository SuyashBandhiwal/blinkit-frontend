// Development mein bugs catch karne ke liye
import { StrictMode } from 'react'
// React app ko DOM mein render karta hai — browser pe dikhata hai
import { createRoot } from 'react-dom/client'
// Provider = Redux ka wrapper
import { Provider } from 'react-redux'
// store = actual cart/state data 
import store from './redux/store'
import './index.css'
// Main App component import karta hai
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

// main.jsx = ENTRY POINT
// Ye kehta hai:
// "Browser ko milega HTML element 'root'"
// "Usme Redux Provider wrap karunga"
// "Provider mein App component daal dunga"
// "Ab poora app Redux store access kar sakta hai!"

// Redux store = BANK (jahan paise store ho)
// Provider     = COUNTER (jahan log paise access kar sakte ho)
// App          = CUSTOMERS (jo counter se paise nikal/daal sakte ho)