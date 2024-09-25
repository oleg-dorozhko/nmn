console.log('mod delete in memory on');
module.exports.delete_in_memory = delete_in_memory;
const { Worker } = require('worker_threads')

function runDeleteInMemoryService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/mod_serviceDeleteInMemoryWorker.js', {workerData} );
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}


async function delete_in_memory( addr, addr2, callback )
{
	console.log('in mod_delete_in_memory.delete_in_memory:');
	console.log("addr="+addr);
	//console.log("addr2="+addr2);
	let arr = addr.split(",");
	for(let i=0;i<arr.length;i++) {
		const result = await runDeleteInMemoryService( {  addr:addr[i] } );
	}
	callback (result);
	
}