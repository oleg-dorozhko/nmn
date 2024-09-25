console.log('mod move memory on');
var PNG = require('pngjs').PNG;
module.exports.move = move;
   
const { Worker } = require('worker_threads')

function runMoveMemoryService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/mod_serviceMoveMemoryWorker.js', {workerData} );
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}


async function move( addr1, addr2, callback )
{
	console.log('in mod_move_memory.move:');
	console.log("addr1="+addr1);
	console.log("addr2="+addr2);
	const result = await runMoveMemoryService( {  addr1:addr1, addr2: addr2 } );
	callback (result);
	
}