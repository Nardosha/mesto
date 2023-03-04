const worker = new SharedWorker('../worker.js')

console.log('123')

worker.port.postMessage("HELLO");

worker.port.onmessage = function (message) {
    console.log("FROM WORKER: ", message.data);
};
