const { workerData, parentPort } = require('worker_threads');
 
var result_png = border_minus( workerData.data, workerData.width, workerData.height  );

parentPort.postMessage( result_png );	


function border_minus(source_png, w, h) {

	let nw = w-2; 
	let nh = h-2;
	var newpng = [];



	for (var y = 1; y < h-1; y++) {
		
		for (var x = 1; x < w-1; x++) {
			
			var idx = w * y + x << 2;
			
			var new_idx1 = nw * (y-1) + (x-1) << 2;
			
			newpng[new_idx1+0] = source_png[idx];
			newpng[new_idx1+1] = source_png[idx+1];
			newpng[new_idx1+2] = source_png[idx+2];
			newpng[new_idx1+3] = source_png[idx+3];
			
		}
		
	}
	
	return { data:newpng, width: nw, height: nh };

}