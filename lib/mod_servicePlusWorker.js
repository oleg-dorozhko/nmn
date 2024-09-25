const { workerData, parentPort } = require('worker_threads');
 
var result_png = plus( workerData.data, workerData.width, workerData.height  );

parentPort.postMessage( result_png );		
	
function plus(img,w,h)
{
	 
		let w2 = w*2;
		let h2 = h*2;
		
		let newpng = [];
		
			for (var y = 0; y < h; y++) {
				
				for (var x = 0; x < w; x++) {
					
					var idx = (w * y + x) << 2;
					
					var new_idx = w2 * (y*2) + (x*2) << 2;
					var new_idx2 = w2 * (y*2+1) + (x*2) << 2;
					
					newpng [new_idx] = img [idx];
					newpng [new_idx+1] = img [idx+1];
					newpng [new_idx+2] = img [idx+2];
					newpng [new_idx+3] = img [idx+3];
					
					newpng [new_idx+4] = img [idx];
					newpng [new_idx+5] = img [idx+1];
					newpng [new_idx+6] = img [idx+2];
					newpng [new_idx+7] = img [idx+3];
					
					newpng [new_idx2] = img [idx];
					newpng [new_idx2+1] = img [idx+1];
					newpng [new_idx2+2] = img [idx+2];
					newpng [new_idx2+3] = img [idx+3];
					
					newpng [new_idx2+4] = img [idx];
					newpng [new_idx2+5] = img [idx+1];
					newpng [new_idx2+6] = img [idx+2];
					newpng [new_idx2+7] = img [idx+3];
					
					
				}
			}
	
	return newpng;
}