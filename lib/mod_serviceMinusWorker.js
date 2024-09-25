const { workerData, parentPort } = require('worker_threads');
 
var result_png = minus( workerData.data, workerData.width, workerData.height  );

parentPort.postMessage( result_png );		
	
function minus(img,w,h)
{
	 
		let w2 = w/2|0;
		let h2 = h/2|0;
		
		let newpng = [];
		
			for (var y = 0; y < h; y+=2) {
				
				for (var x = 0; x < w; x+=2) {
					
					var idx = (w * y + x) << 2;
					
					var new_idx = w2 * (y/2) + (x/2) << 2;
					 
					
					newpng [new_idx] = img [idx];
					newpng [new_idx+1] = img [idx+1];
					newpng [new_idx+2] = img [idx+2];
					newpng [new_idx+3] = img [idx+3];
					
					 
					
				}
			}
	
	return newpng;
}