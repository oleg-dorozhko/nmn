console.log('mod genrndseed on');
//var PNG = require('pngjs').PNG;
module.exports.generate_random_seed_f = generate_random_seed_f;
//var mod_generate_random_seed = require('./mod_generate_random_seed');
   
const { Worker } = require('worker_threads')

function runGenerateRandomSeedService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/mod_serviceGenerateRandomSeedWorker.js', {workerData} );
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

// function getArrayFromPNG( dataArray, width, height ) {
	
	// var arr = [];
	
	// for(var j=0;j<height;j++)
	// {
		// for(var i=0;i<width;i++)
		// {
			// var idx = (width * j + i) << 2;	
						 
			// arr[idx] = dataArray[idx];
			// arr[idx+1] = dataArray[idx+1];
			// arr[idx+2] = dataArray[idx+2];
			// arr[idx+3] = dataArray[idx+3];
								
		// }
	// }
	
	// return arr;
// }

// function getPNGFromArray( dataArray, width, height ) {
	
		// var png = new PNG({
			
			// width:  width,
			// height:  height,
			// filterType: 4
			
		// });
				
		 
			// for(var j=0;j< png.height;j++)
			// {
				// for(var i=0;i< png.width;i++)
				// {
					// var idx = ( png.width * j + i) << 2;	
				
				 
					 // png.data[idx]= dataArray[idx];
					 // png.data[idx+1]= dataArray[idx+1];
					 // png.data[idx+2]= dataArray[idx+2];
					 // png.data[idx+3]= dataArray[idx+3];
				// }
			// }
				
	
	// return png;
// }

async function generate_random_seed_f( cmd, callback)
{
		console.log("In generate_random_seed: ");
		console.log("...processing... ");
		
		
		
		res_png = await runGenerateRandomSeedService( { cmd } );
//		mod_generate_random_seed.generate_random_seed(params);
		 
		console.log("...processed... ");		
		callback( res_png );
		
	
}
