
// todo: import external script
// self.importScripts('./src/utils/worker.js');

console.log('into worker.js')

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
  console.log('--call _transformToCSVWithHeavyCalc')
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
        newVal = 'heavy-calc-with-non-block-' + val
      }
      return newVal
    }))
  })
  refinedData.forEach(row => {
    csvContent += row.join(',') + '\n'
  })

  console.log('-- _transformToCSVWithHeavyCalc end')
  return csvContent
}

function _heavyCalc(count) {
  let res = 0
  // console.log('-_heavyCalc start')
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      for (let k = 0; k < count; k++) {
        res += 1
      }
    }
  }
  // console.log('-_heavyCalc end')
  return res
}

self.onmessage = event => {
  const data = event.data
  const { type, rawData } = data

  console.log('--@worker received: ', event.data)

  switch (type) {
    case 'heavy-calc': {
      const csvContent = _transformToCSVWithHeavyCalc(rawData)

      const blob = new Blob(
        [csvContent],
        { type: 'text/csv;charset=utf-8,' }
      )

      postMessage({
        type: type,
        rawData: blob,
      });
      break
    }
    case 'blob': {
      const csvContent = _transformToCSV(rawData)

      const blob = new Blob(
        [csvContent],
        { type: 'text/csv;charset=utf-8,' }
      )
      postMessage({
        type: type,
        rawData: blob,
      });
      break
    }
    default: {
      console.error('invalid type passed in');
      break
    }
  }
}