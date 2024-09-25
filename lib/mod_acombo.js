console.log('mod acombo on');
var PNG = require('pngjs').PNG;
module.exports.acombo = acombo;
 


function alfa_pixel (a,b)
{
	//console.log("------------");
	//console.log(a);
	//console.log(b);
	let c = null;
	if((a[0] == 0) && (a[1] == 0) && (a[2] == 0) && (a[3]==255)) { 
		//console.log("#1");
		c = [b[0],b[1],b[2],50];
	}
	else {
		//console.log("#2");
		c = [b[0],b[1],b[2],b[3]];	
	}
	
	//console.log(c);
	return c;
}	

function acombo(global_memory,nm1,nm2) {
 

		var old_png =  new PNG({
			
			width: global_memory[nm1].img.width,
			height: global_memory[nm1].img.height,
			filterType: 4
			
			
			});
		
		
		
		
		var arr = global_memory[nm1].img.data;
		
		
		 
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								var idx = (old_png.width * j + i) << 2;	
							
							 
								old_png.data[idx]=arr[idx];
								old_png.data[idx+1]=arr[idx+1];
								old_png.data[idx+2]=arr[idx+2];
								old_png.data[idx+3]=arr[idx+3];
							}
						}
		
		
		
		
		
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
		
		 
				 	var result_png = new PNG ( {
						
							width: old_png.width,
							height: old_png.height,
							filterType: 4
					} );
					
					
				//	  var t4 = (old_png.width-big_image.width)/2;
				//	 var k4 = (old_png.height-big_image.height)/2;	
						
						if(old_png.width!=big_image.width) return null;
						if(old_png.height!=big_image.height) return null;
						
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								 
					//		  var n=i-t4;
					//		  var m=j-k4;
					
								var idx = (old_png.width * j + i) << 2;
									
							  var  idx1 = idx; // big_image.width * m + n << 2;
									
									
								 var clr1 = [old_png.data[idx+0],old_png.data[idx+1],old_png.data[idx+2],255];
								 var clr2 = [big_image.data[idx1+0],big_image.data[idx1+1],big_image.data[idx1+2],255];
								 let clr4 = alfa_pixel( clr1, clr2 );
							
									result_png.data[idx+0] =  clr4[0];
									result_png.data[idx+1] = clr4[1]; //otnimanie_cvetov( big_image.data[new_idx1+1], old_png.data[idx+1] );
									result_png.data[idx+2] = clr4[2]; //otnimanie_cvetov( big_image.data[new_idx1+2], old_png.data[idx+2] );
									result_png.data[idx+3] = clr4[3];
									
									
									
								 
							}
						}
						
					return result_png;
					
				 
 
	
}


		