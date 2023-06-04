
// eslint-disable-next-line no-undef
// importScripts('./src/constant.js');

console.log('hello from web worker.js')

self.onmessage = msg => {
  console.log('--@worker received: ', msg.data)

  postMessage('banana')
}