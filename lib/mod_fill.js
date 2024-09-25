console.log('mod fill on');
var PNG = require('pngjs').PNG;
module.exports.fill = fill;
 
function getColDec( cccol, cccol1 )
	{
		var cccol2=0;
		if(cccol+cccol1>255) cccol2=    ((cccol+cccol1)-255)+10;
		else cccol2=cccol+cccol1;
		return cccol2;
	}
	
function fill(global_memory,nm1,nm2) {


		console.log("img.nm1.width="+global_memory[nm1].img.width);
		console.log("img.nm1.height="+global_memory[nm1].img.height);

		var small_image =  new PNG({
			
			width: global_memory[nm1].img.width,
			height: global_memory[nm1].img.height,
			filterType: 4
			
			
			});
		
		
		
		
		var arr = global_memory[nm1].img.data;
		
		
		 
						for(var j=0;j<small_image.height;j++)
						{
							for(var i=0;i<small_image.width;i++)
							{
								var idx = (small_image.width * j + i) << 2;	
							
							 
								small_image.data[idx]=arr[idx];
								small_image.data[idx+1]=arr[idx+1];
								small_image.data[idx+2]=arr[idx+2];
								small_image.data[idx+3]=arr[idx+3];
							}
						}
		
		
		
		console.log("img.nm2.width="+global_memory[nm2].img.width);
		console.log("img.nm2.height="+global_memory[nm2].img.height);

		
		var big_image =  new PNG({
			
			width: global_memory[nm2].img.width,
			height: global_memory[nm2].img.height,
			filterType: 4
			
			
			});
		
		
		
		arr = global_memory[nm2].img.data;
		
						for(var j=0;j<big_image.height;j++)
						{
							for(var i=0;i<big_image.width;i++)
							{
								var idx = (big_image.width * j + i) << 2;	
							
						 
								big_image.data[idx]=arr[idx];
								big_image.data[idx+1]=arr[idx+1];
								big_image.data[idx+2]=arr[idx+2];
								big_image.data[idx+3]=arr[idx+3];
							}
						}
		
		 
		 
		if(big_image.width * small_image.width > 1600 || big_image.height *  small_image.height > 1600 )
		{
			console.log("fill: error: too big size (need result width * height <= 1200)");
			return null;
		
			
		}
					var newpng = new PNG ( {
						
							width: big_image.width * small_image.width,
							height: big_image.height * small_image.height,
							filterType: 4
					} );
					
		 
		for (var y = 0; y < big_image.height; y++) {
				
				for (var x = 0; x < big_image.width; x++) {
					
					
					var idxBig = ( big_image.width * y + x ) << 2;
					
					
					for (var m = 0; m < small_image.height; m++) {
						
						for (var n = 0; n < small_image.width; n++) {
							
								var idxSim = ( small_image.width * m + n ) << 2;
								
								k=x*small_image.width+n;
								p=y*small_image.height+m;
								var idxRes = newpng.width*p + k << 2;
								
								newpng.data[idxRes+0] = getColDec( big_image.data[idxBig+0] , small_image.data[idxSim+0]);
					
								newpng.data[idxRes+1] = getColDec( big_image.data[idxBig+1] , small_image.data[idxSim+1]);
								
								newpng.data[idxRes+2] = getColDec( big_image.data[idxBig+2] , small_image.data[idxSim+2]);
								
								newpng.data[idxRes+3] = 255;
								
						}
					}
					
					
				}
			}

			return newpng; 
		 
		 
}