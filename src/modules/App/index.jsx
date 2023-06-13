import {useState, useCallback, useMemo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AppHeader from './AppHeader.jsx'
import {exportCSV, heavyCalc, onmessage } from "../../utils/worker.js";
import { _genRandomRawData } from "../../utils/index.js";
import './App.scss'
import CardComponents from "./CardComponents.jsx";

// 1M may trigger slow calc
const unit = 100000

const worker = new Worker('../../worker.js')

worker.addEventListener('message', onmessage.bind(window))

// worker.onmessage = msg => {
//   console.log('--@index.js received: ', msg.data, window)
//   const data = msg.data
//   const { type, rawData } = data
//
//   switch (type) {
//     case 'heavy-calc':
//     case 'blob': {
//       saveFile.bind(window)(rawData)
//       break;
//     }
//     default:
//       break;
//   }
// }


function App() {
  const [count, setCount] = useState(0)

  // callbacks
  const addCount = useCallback(() => {
    setCount((count) => count + 1)
  }, [])

  const onBlockDownload = useCallback((size) => {
    return () => {
      exportCSV.bind(window)(_genRandomRawData(size))
    }
  }, [])

  const onBlockHeavyDownload = useCallback(() => {
    console.log('--onBlock heavyCalc start')
    heavyCalc()
    console.log('--onBlock heavyCalc end')
    exportCSV.bind(window)(_genRandomRawData(10))
  }, [])

  const onNonBlockDownload = useCallback((size) => {
    return () => {
      worker.postMessage({
        type: 'blob',
        rawData: _genRandomRawData(size)
      })
    }
  }, [])

  const onNonBlockHeavyDownload = useCallback(() => {
    console.log('--non-block heavyCalc')
    worker.postMessage({
      type: 'heavy-calc',
      rawData: _genRandomRawData(10)
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
            onClick: onBlockDownload(10),
            btnContent: 'download',
          },
          {
            content: 'Export 1M records',
            onClick: onBlockDownload(5 * unit),
            btnContent: 'download',
          },
          {
            content: 'Export with CPU heavy task',
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
            content: 'Export with CPU heavy task',
            onClick: onNonBlockHeavyDownload,
            btnContent: 'download',
          }
        ],
      }
    ]
  }, [
    onBlockDownload,
    onBlockHeavyDownload,
    onNonBlockDownload,
    onNonBlockHeavyDownload,
  ])


  return (
    <div className="layout">
      <div className="content-section">
        <AppHeader />
        <CardComponents config={cardConfig} />
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
