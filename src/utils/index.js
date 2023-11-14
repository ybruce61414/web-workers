import { faker } from '@faker-js/faker'

// util functions
// for blocking ui situation:
const _transformToCSV = rawData => {
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

const _transformToCSVWithHeavyCalc = rawData => {
  console.log('--call _transformToCSVWithHeavyCalc in block')
  const refinedData = []
  let csvContent = ''

  const csvTitle = Object.keys(rawData[0])
  refinedData.push(csvTitle)

  rawData.forEach(data => {
    const values = Object.values(data)
    // deliberate and meaningless to simulate heavy calc
    refinedData.push(values.map(val => {
      _heavyCalc(600)
      let newVal = val
      if (typeof val === 'string') {
        newVal = 'heavy-calc-with-block-' + val
      }
      return newVal
    }))
  })
  refinedData.forEach(row => {
    csvContent += row.join(',') + '\n'
  })

  console.log('-- _transformToCSVWithHeavyCalc in block end')

  return csvContent
}

function _saveFile(blob) {
  // console.log('-saveFile this:', this)
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

function _heavyCalc(count) {
  let res = 0
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      for (let k = 0; k < count; k++) {
        res += 1
      }
    }
  }
  return res
}

export const genRandomRawData = size => {
  const res = []

  for (let i = 0; i < size; i++) {
    res.push({
      order: i + 1,
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      mail: faker.internet.email(),
    })
  }
  return res
}

export function onmessage(event) {
  // worker's listener
  /*
    this is in the main thread,
    when worker done the calc,
    this handler will catch the result
  */
  console.log('--@index.js received: ', event.data)
  const data = event.data
  const { type, rawData } = data

  switch (type) {
    case 'heavy-calc':
    case 'blob': {
      _saveFile.bind(this)(rawData)
      break;
    }
    default:
      console.log('onmessage unknown type')
      break;
  }
}

export function exportCSV(rawData, type = 'normal') {
  let csvContent = null
  switch (type) {
    case 'heavy-calc':
      csvContent = _transformToCSVWithHeavyCalc(rawData)
      break
    case 'normal':
    default:
      csvContent = _transformToCSV(rawData)
      break
  }
  // const csvContent = _transformToCSV(rawData)

  console.info(`---Starting call for html5 download---`);

  const blob = new Blob(
      [csvContent],
      { type: 'text/csv;charset=utf-8,' }
  )
  _saveFile.bind(this)(blob)
}

