const { workerData, parentPort } = require('worker_threads');
 
var result_png = mirror_right( workerData.data, workerData.width, workerData.height  );

parentPort.postMessage( result_png );	


//	return { data:newpng, width: nw, height: nh };


function mirror_right(imageData, w, h)
{
		
		
		// var newpng = new PNG ( {
			
				// width: imageData.width*2,
				// height: imageData.height,
				// filterType: 4
		// } );
		
		let newpng= [];
		let nw = w*2;
		let nh = h;
		
		console.log("  -=       MIRROR WAS USED  (EXAMPLE OF GOOD WORK OF WORKER SCHEMAS)        =- ");

			for (var y = 0; y < nh; y++) {
				
				n=0;
				for (var x = 0; x < nw; x++) {
					
					var idx=null; 
					var new_idx1 = nw * y + x << 2;
					if(x < w)
					{
					
						idx = (w * y + x) << 2;
						
						newpng[new_idx1+0] = imageData[idx+0];
						newpng[new_idx1+1] = imageData[idx+1];
						newpng[new_idx1+2] = imageData[idx+2];
						newpng[new_idx1+3] = imageData[idx+3];
						n++;
					}
					else
					{
						idx = (w * y + (n-1)) << 2;
						
						newpng[new_idx1+0] = imageData[idx+0];
						newpng[new_idx1+1] = imageData[idx+1];
						newpng[new_idx1+2] = imageData[idx+2];
						newpng[new_idx1+3] = imageData[idx+3];
						
						n--;

					}
					
					
					
				}
				
			}
			
			//return newpng;
			return { data:newpng, width: nw, height: nh };
			
}
