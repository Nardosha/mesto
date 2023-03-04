const browserInstances = [];
let counter = 0

onconnect = function (event) {

    const port = event.ports [0]
    browserInstances.push(port)

    port.onmessage = function (e) {
        console.log("From main thread: ", e);

        browserInstances.forEach(instance => {
            instance.postMessage(JSON.stringify(instance));
        })
    }
};
