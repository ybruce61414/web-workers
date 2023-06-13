export const heavyCalc = () => {
  const times = 1500
  let res = 0
  for (let i = 0; i < times; i++) {
    for (let j = 0; j < times; j++) {
      for (let k = 0; k < times; k++) {
        res += 1
      }
    }
  }
  return res
}
export const _genCSVData = rawData => {
  const refinedData = []
  let csvContent = ''

  const csvTitle = Object.keys(rawData[0])
  refinedData.push(csvTitle)

  rawData.forEach(data => {
    refinedData.push(Object.values(data))
  })

  refinedData.forEach(row => {
    csvContent += row.join(',') + '\n'
  })

  return csvContent
}

export function onmessage(event) {
  // worker's listener
  console.log('--@index.js received: ', event.data)
  const data = event.data
  const { type, rawData } = data

  switch (type) {
    case 'heavy-calc':
    case 'blob': {
      saveFile.bind(this)(rawData)
      break;
    }
    default:
      break;
  }
}
export function saveFile(blob) {
  console.log('-saveFile this--', this)
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = this.URL.createObjectURL(blob)
    const uniqTime = new Date().getTime()
    const filename = `my-csv-${uniqTime}`

    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
export function exportCSV(rawData) {
  const csvContent = _genCSVData(rawData)

  console.info(`Starting call for html5 download`);

  const blob = new Blob(
    [csvContent],
    { type: 'text/csv;charset=utf-8,' }
  )

  saveFile.bind(this)(blob)
}