import { useState, useCallback, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AppHeader from './atoms/AppHeader.jsx'
import { exportCSV, genRandomRawData, onmessage } from "../../utils/index.js";
import CardComponents from "./atoms/CardComponents.jsx";
import useFetchInitData from "../../api/useFetchInitData.jsx";
import './App.scss'


const worker = new Worker('../../worker.js')

worker.addEventListener('message', onmessage.bind(window))


function App() {
  // local state
  const [count, setCount] = useState(0)

  // hooks
  const { data } = useFetchInitData()

  // callbacks
  const addCount = useCallback(() => {
    setCount((count) => count + 1)
  }, [])

  const onBlockDownload = useCallback((type) => {
    switch (type) {
      case 'large': {
        return () => {
          if (data.state === 'ready') exportCSV.bind(window)(data.value)
        }
      }
      case 'small':
      default: {
        return () => {
          exportCSV.bind(window)(genRandomRawData(10))
        }
      }
    }
  }, [data.state])

  const onBlockHeavyDownload = useCallback(() => {
    // heavy calc
    exportCSV.bind(window)(genRandomRawData(10), 'heavy-calc')
  }, [])

  const onNonBlockDownload = useCallback((size) => {
    return () => {
      worker.postMessage({
        type: 'blob',
        rawData: genRandomRawData(size)
      })
    }
  }, [])

  const onNonBlockHeavyDownload = useCallback(() => {
    worker.postMessage({
      type: 'heavy-calc',
      rawData: genRandomRawData(10)
    })
  }, [])

  // config
  const cardConfig = useMemo(() => {
    return [
      {
        header: 'Blocking csv export',
        items: [
          {
            content: 'Export 10 records',
            onClick: onBlockDownload('small'),
            btnContent: 'download',
          },
          {
            content: 'Export 50k records',
            onClick: onBlockDownload('large'),
            btnContent: 'download',
            disabled: data.state !== 'ready'
          },
          {
            content: 'Export 10 records with CPU heavy task',
            onClick: onBlockHeavyDownload,
            btnContent: 'download',
          }
        ],
      },
      {
        header: 'Non-blocking csv export (web worker)',
        items: [
          {
            content: 'Export 10 records',
            onClick: onNonBlockDownload(10),
            btnContent: 'download',
          },
          {
            content: 'Export 10 records with CPU heavy task',
            onClick: onNonBlockHeavyDownload,
            btnContent: 'download',
          }
        ],
      }
    ]
  }, [
    data.state,
    onBlockDownload,
    onBlockHeavyDownload,
    onNonBlockDownload,
    onNonBlockHeavyDownload,
  ])


  // console.log('---data', data)

  return (
    <div className="layout">
      <div className="content-section">
        <AppHeader />
        <CardComponents
          config={cardConfig}
        />
        <section className="testing-card">
          <section className="export-block">
            <h3 className="row-item-header">
              Testing for UI block
            </h3>
            <section className="row-item">
              <div className="export-content">
                Count is <span style={{ fontWeight: 'bold'}}>{count}</span>
              </div>
              <button
                className="export-btn"
                onClick={addCount}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon-in-btn"
                />
                <span>add</span>
              </button>
            </section>
            <section className="row-item">
              <input
                type="text"
                className="text-input"
                placeholder="Search" />
            </section>
          </section>
        </section>
      </div>
    </div>
  )
}

export default App
