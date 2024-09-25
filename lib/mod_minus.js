console.log('mod minus on');
var PNG = require('pngjs').PNG;
const { Worker } = require('worker_threads')
module.exports.minus = minus;

function runMinusService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/mod_serviceMinusWorker.js', {workerData} );
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

async function minus( req, callback ) {
	
	req.pipe(new PNG({filterType: 4})).on('parsed', async function() {
	
		console.log("In minus: ");
		console.log("Minusing... ");
		
		if((this.width < 2) || (this.height < 2)) {
			callback( -1 );
			return;
		}
		 
		var width = this.width;
		var height = this.height;
		
		var arr = getArrayFromPNG( this.data, width, height );
		
		const result = await runMinusService( { width: width, height: height, data: arr } );
				
		callback( getPNGFromArray(result, width/2|0, height/2|0) );
		
	});
	
}