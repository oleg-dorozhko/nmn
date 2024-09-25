console.log('mod axes on');
var PNG = require('pngjs').PNG;
module.exports.bothAxesMinus = bothAxesMinus;
module.exports.bothAxesPlus = bothAxesPlus;
   
const { Worker } = require('worker_threads')

function runBothAxesMinusService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/mod_serviceBothAxesMinusWorker.js', {workerData} );
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

function runBothAxesPlusService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/mod_serviceBothAxesPlusWorker.js', {workerData} );
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

async function bothAxesMinus(req,callback)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', async function() {
	
		console.log("In bothAxesMinus: ");
		console.log("...processing... ");
		
		if((this.width < 2) || (this.height < 2)) {
			callback( -1 );
			return;
		}
		 
		var width = this.width;
		var height = this.height;
		
		var arr = getArrayFromPNG( this.data, width, height );
		
		const result = await runBothAxesMinusService( { width: width, height: height, data: arr } );
				
		callback( getPNGFromArray(result.data, result.width, result.height) );
		
	});
}

async function bothAxesPlus(req,callback)
{
	req.pipe(new PNG({filterType: 4})).on('parsed', async function() {
	
		console.log("In bothAxesPlus: ");
		console.log("...processing... ");
		
		if((this.width > 1200) || (this.height > 1200)) {
			callback( -1 );
			return;
		}
		 
		var width = this.width;
		var height = this.height;
		
		var arr = getArrayFromPNG( this.data, width, height );
		
		const result = await runBothAxesPlusService( { width: width, height: height, data: arr } );
		 
		callback( getPNGFromArray(result.data, result.width, result.height));
		
	});
}




function both_axes_minus_with_param( s, callback )
{
	var n = Number(s.trim());
	if(isNaN(n)) return;
	for (var i = 0; i < n; i++) {
		
		both_axes_minus();
		
	}
	callback();
}







function horizontal_axe_minus( ) //minus one horizontal line
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	if( h==1 )
		{
			
			errror("mod_axes: horizontal_axe_minus: error: too small size (need height > 1)");
			return;
			
		}
	
	var im0 = context.getImageData(0,0,canvas.width,(canvas.height/2|0));
	var im1 = context.getImageData(0,(canvas.height/2|0)+1,canvas.width,(canvas.height/2|0));
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w;
		canvas2.height = h-1;
		var context2 = canvas2.getContext("2d");
		
		context2.putImageData(im0, 0,0);
		context2.putImageData(im1, 0,(canvas.height/2|0));
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);
		
		
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('horizontal_axe_minus'); //after or before? what question
			}, 200 );	
			
			
			
			
}			


function vertical_axe_minus( ) //minus one vertical line
{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var w = canvas.width;
	var h = canvas.height;
	
	if( w==1 )
		{
			
			errror("mod_axes: vertical_axe_minus: error: too small size (need width > 1)");
			return;
			
		}
	
	var im0 = context.getImageData(0,0,(canvas.width/2|0),canvas.height);
	var im1 = context.getImageData((canvas.width/2|0)+1,0,(canvas.width/2|0),canvas.height);
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w-1;
		canvas2.height = h;
		var context2 = canvas2.getContext("2d");
		
		context2.putImageData(im0, 0,0);
		context2.putImageData(im1, (canvas.width/2|0),0);
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);
		
		
			canvas.width = canvas2.width;
			canvas.height = canvas2.height;
			context = canvas.getContext("2d");
			context.putImageData(im,0,0);
			
			setTimeout( function(){
				logg('vertical_axe_minus'); //after or before? what question
			}, 200 );	
			
			
			
			
}			