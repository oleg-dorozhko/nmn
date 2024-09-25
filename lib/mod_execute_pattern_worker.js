console.log('mod execute pattern worker on');

module.exports.executePatternWorker = executePatternWorker;
 
const { Worker } = require('worker_threads')

function runExecutePatternWorkerService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/mod_serviceExecutePatternWorker.js', {workerData} );
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}
 

async function executePatternWorker(commands,img_list,callback)
{
	//console.log('in executePatternWorker:');
	//console.log(commands);
	let obj = {};
	obj.commands = commands;
	for(let i=0;i<img_list.length;i++) {
		if(i==0) obj["img"] = img_list[i];
		else obj["img"+(i+1)] = img_list[i];
	}
	const result = await runExecutePatternWorkerService( obj );
	callback (result);
	
}
	 