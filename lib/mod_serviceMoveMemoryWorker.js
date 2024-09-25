const { workerData, parentPort } = require('worker_threads');
let addr = workerData;
console.log("in mod_serviceMMW:");
let obj = JSON.parse(JSON.stringify(global_memory[addr.addr1]));
global_memory[addr.addr2] = obj;
parentPort.postMessage( true );