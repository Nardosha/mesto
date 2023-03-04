const worker = new SharedWorker('../worker.js')

worker.port.postMessage("HELLO");

worker.port.onmessage = function (message) {
    console.log("FROM WORKER: ", message.data);
};
