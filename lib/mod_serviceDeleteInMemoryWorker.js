const { workerData, parentPort } = require('worker_threads');
let addr = workerData.addr;
console.log("in mod_serviceDIMW:");
console.log("deleting addr");
let obj = JSON.parse(JSON.stringify(global_memory[addr]));
global_memory[addr.addr2] = obj;
parentPort.postMessage( true );