const { workerData, parentPort } = require('worker_threads');
 
var result_png = border_plus( workerData.data, workerData.width, workerData.height  );

parentPort.postMessage( result_png );	


function border_plus(source_png, w, h) {

	let nw = w+2; 
	let nh = h+2;
	var newpng = [];


		
			for (var y = 0; y < nh; y++) {
				
				for (var x = 0; x < nw; x++) {
					
					
					
					var new_idx1 = nw * (y) + (x) << 2;
					
					newpng[new_idx1+0] = 255;
					newpng[new_idx1+1] = 255;
					newpng[new_idx1+2] = 255;
					newpng[new_idx1+3] = 255;
					
				}
				
			}
		

			for (var y = 0; y < h; y++) {
				
				for (var x = 0; x < w; x++) {
					
					var idx = w * y + x << 2;
					
					var new_idx1 = nw * (y+1) + (x+1) << 2;
					
					newpng[new_idx1+0] = source_png[idx];
					newpng[new_idx1+1] = source_png[idx+1];
					newpng[new_idx1+2] = source_png[idx+2];
					newpng[new_idx1+3] = source_png[idx+3];
					
				}
				
			}


	return { data:newpng, width: nw, height: nh };

}