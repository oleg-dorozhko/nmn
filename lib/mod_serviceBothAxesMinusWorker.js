const { workerData, parentPort } = require('worker_threads');
 
var result_png = bothAxesMinus( workerData.data, workerData.width, workerData.height  );

parentPort.postMessage( result_png );	


function bothAxesMinus(im0, w, h)
{
	 
	
		var n=0;
		var m=0;
		
		var x1=0;
		var x2=0;
		var w1=0;
		var w2=0;
		var y1=0;
		var y2=0;
		var h1=0;
		var h2=0;
		
		if( w%2 == 0  )
		{
			x1=0;
			w1=w/2;
			x2=w/2+1;
			w2= w-1;
			
		}
		else if( w%2 == 1  ) 
		{
			x1=0;
			w1=(w/2|0);
			x2=(w/2|0)+1;
			w2 = w-1; 
		}
		
		if(h%2 == 0) 
		{  
			y1=0;
			h1=h/2;
			y2=h/2+1;
			h2=h/2-1;
			h2=h-1;
	
		}
		else if(h%2 == 1)
		{

			y1=0;
			h1=(h/2|0);
			y2=(h/2|0)+1;
			h2=(h/2|0);
			h2=h-1;
			
			
		}
		
	
	// var im = new PNG ( {
			
				// width: w-1,
				// height: h-1,
				// filterType: 4
		// } );
		
		let nwidth = w-1;
		let nheight = h-1;
		let im = [];
			
			for (var y = 0; y < nheight; y++) {
				
				
				
				for (var x = 0; x < nwidth; x++) {
					
								
					var idx = (nwidth * y + x) << 2;
					
					
					
						im[idx] = 255;
						im[idx+1] = 255;
						im[idx+2] = 255;
						im[idx+3] = 255;
						
					
					
					
				}
				
				
			}
		
		

		//left top
		//	var mm=0;
			for (var y = y1; y < h1; y++) {
				
				
				//var nn=0;
				for (var x = x1; x < w1; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = nwidth * y + x << 2;
					
				//	nn++;
					

					
						im[new_idx] = im0[idx];
						im[new_idx+1] =  im0[idx+1];
						im[new_idx+2] =  im0[idx+2];
						im[new_idx+3] =  im0[idx+3];
						
					
					
					
				}
			//	mm++;
				
			}
			
			
		
		
			//var mm=0;
			for (var y = y1; y < h1; y++) {
				
				
				var nn=x2-1;
				for (var x = x2; x < w; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = nwidth * y + nn << 2;
					
					
					

					
						im[new_idx] = im0[idx];
						im[new_idx+1] =  im0[idx+1];
						im[new_idx+2] =  im0[idx+2];
						im[new_idx+3] =  im0[idx+3];
						
					nn++;
					
					
				}
			//	mm++;
				
			}
				
			
			var mm=y2-1;
			for (var y = y2; y < h; y++) {
				
				
				//var nn=0;
				for (var x = x1; x < w1; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = nwidth * mm + x << 2;
					
				//	nn++;
					

					
						im[new_idx] = im0[idx];
						im[new_idx+1] =  im0[idx+1];
						im[new_idx+2] =  im0[idx+2];
						im[new_idx+3] =  im0[idx+3];
						
					
					
					
				}
				mm++;
				
			}
			
			
			
		
			
			var mm=y2-1;
				for (var y = y2; y < h; y++) {
				
				
				var nn=x2-1;
				for (var x = x2; x < w; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = nwidth * mm + nn << 2;
					
					
					

					
						im[new_idx] = im0[idx];
						im[new_idx+1] =  im0[idx+1];
						im[new_idx+2] =  im0[idx+2];
						im[new_idx+3] =  im0[idx+3];
						
					nn++;
					
					
				}
				mm++;
				
			}
			
			
			
			return { data:im, width: nwidth, height:nheight };
 
			
			
}
