import { useEffect, useState } from "react";
import { genRandomRawData } from "../utils/index.js";

const initData = { state: 'init', value: [] }

const dataCount = 100000
const useFetchInitData = () => {
  const [data, setData] = useState(initData)

  const fetchData = async () => {
    try {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(genRandomRawData(0.5 * dataCount))
        }, 2000);
      })

      setData({
        state: 'ready',
        value: res,
      })
    } catch (error) {
      setData({
        state: 'error',
        value: [],
      })
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data }
}

export default useFetchInitData