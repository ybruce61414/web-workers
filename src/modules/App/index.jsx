import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const onClick = () => {
    setCount((count) => count + 1)
  }

  return (
    <div className="layout">
      <div className="logo-section">
        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo" />
        </a>
      </div>

      <div className="content-section">
        <h2>Web Worker Demo</h2>
        <p style={{ margin: 0 }}>
          <code>Crafted by Viola</code>
        </p>
        <section className="export-block">
          Click for non-blocking csv export
        </section>
        <section className="export-block">
          Click for blocking csv export
        </section>
        <section className="testing-block">
          <button onClick={onClick}>
            count is {count}
          </button>
        </section>
      </div>
    </div>
  )
}

export default App
