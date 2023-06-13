
// todo: import external script
// self.importScripts('./src/utils/worker.js');

const _genCSVData = rawData => {
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

const _heavyCalc = () => {
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

console.log('into worker.js')


self.onmessage = event => {
  const data = event.data
  const { type, rawData } = data

  console.log('--@worker received: ', event.data)

  switch (type) {
    case 'heavy-calc': {
      const csvContent = _genCSVData(rawData)

      const blob = new Blob(
        [csvContent],
        { type: 'text/csv;charset=utf-8,' }
      )

      console.log('-_heavyCalc start')
      _heavyCalc()
      console.log('-_heavyCalc end')
      postMessage({
        type: type,
        rawData: blob,
      });
      break;
    }
    case 'blob': {
      const csvContent = _genCSVData(rawData)

      const blob = new Blob(
        [csvContent],
        { type: 'text/csv;charset=utf-8,' }
      )
      postMessage({
        type: type,
        rawData: blob,
      });
      break;
    }
    default: {
      console.error('invalid type passed in');
    }
  }
}