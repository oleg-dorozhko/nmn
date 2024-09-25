console.log('mod razn colors on');

var PNG = require('pngjs').PNG;
 
module.exports.razn_colors = razn_colors;

const { Worker } = require('worker_threads')

 

function runRaznColorsService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/mod_serviceRaznColorsWorker.js', {workerData} );
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

function getArrayFromPNG( dataArray, width, height ) {
	
	var arr = [];
	
	for(var j=0;j<height;j++)
	{
		for(var i=0;i<width;i++)
		{
			var idx = (width * j + i) << 2;	
						 
			arr[idx] = dataArray[idx];
			arr[idx+1] = dataArray[idx+1];
			arr[idx+2] = dataArray[idx+2];
			arr[idx+3] = dataArray[idx+3];
								
		}
	}
	
	return arr;
}

function getPNGFromArray( dataArray, width, height ) {
	
		var png = new PNG({
			
			width:  width,
			height:  height,
			filterType: 4
			
		});
				
		 
			for(var j=0;j< png.height;j++)
			{
				for(var i=0;i< png.width;i++)
				{
					var idx = ( png.width * j + i) << 2;	
				
				 
					 png.data[idx]= dataArray[idx];
					 png.data[idx+1]= dataArray[idx+1];
					 png.data[idx+2]= dataArray[idx+2];
					 png.data[idx+3]= dataArray[idx+3];
				}
			}
				
	
	return png;
}

async function razn_colors( req, callback ) {
	
	req.pipe(new PNG({filterType: 4})).on('parsed', async function() {
	
		console.log("In razn_colors: ");
		console.log("...processing... " );
		 
		var width = this.width;
		var height = this.height;
		
		var arr = getArrayFromPNG( this.data, width, height );
		
		const result = await runRaznColorsService( { width: width, height: height, data: arr } );
		if(result == -1) callback ( result );		
		callback( getPNGFromArray(result, width , height ) );
		
	});
	
}

