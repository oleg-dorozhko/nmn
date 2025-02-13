console.log('mod get cluster worker on');

module.exports.executeGetClusterWorker = executeGetClusterWorker;
 
const { Worker } = require('worker_threads')

function runGetClusterWorkerService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/mod_serviceGetClusterWorker.js', {workerData} );
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}
 

async function executeGetClusterWorker( context, callback )
{
	const result = await runGetClusterWorkerService( context );
	callback (result);
	
}