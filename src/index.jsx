import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './modules/App'
import './index.css'

const worker = new Worker('../worker.js')

worker.onmessage = msg => {
  console.log('--@index.js received: ', msg.data)
}

worker.postMessage('apple')


console.log('--worker setup done')
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
