console.log('mod glue on');
var PNG = require('pngjs').PNG;
module.exports.right_glue = right_glue;
module.exports.down_glue = down_glue;
 

function right_glue(global_memory,nm1,nm2) {
 

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
						
							width: old_png.width + big_image.width,
							height: old_png.height + big_image.height,
							filterType: 4
					} );
					
					
						for(var j=0;j<result_png.height;j++)
						{
							for(var i=0;i<result_png.width;i++)
							{
								 
					//		  var n=i-t4;
					//		  var m=j-k4;
					
								var idx_r = (result_png.width * j + i) << 2;
								var idx_r = (result_png.width * j + i) << 2;
								
								result_png.data[idx+0] = 0;
								result_png.data[idx+1] = 0; 
								result_png.data[idx+2] = 255; 
								result_png.data[idx+3] = 255; 
							}
						}							
								
					
				//	  var t4 = (old_png.width-big_image.width)/2;
				//	 var k4 = (old_png.height-big_image.height)/2;	
						
				//		if(old_png.width!=big_image.width) return null;
				//		if(old_png.height!=big_image.height) return null;
						
						var n = 0;
						var m = 0;
						for(var j=0;j<big_image.height;j++)
						{
							n = 0;
							for(var i=0;i<big_image.width;i++)
							{
								var idx = (big_image.width * j + i) << 2;	
							
								 
					//		  var n=i-t4;
					//		  var m=j-k4;
					
								var idx_r = (result_png.width * m + n) << 2;
								
								
								result_png.data[idx_r] = big_image.data[idx];
								result_png.data[idx_r+1] =  big_image.data[idx+1]; 
								result_png.data[idx_r+2] =  big_image.data[idx+2]; 
								result_png.data[idx_r+3] =  big_image.data[idx+3]; 
								
								n++;
							}
							
							m++;
						}

						n=0;
						m=0;	
						
						for(var j=0;j<old_png.height;j++)
						{
							n=0;
							for(var i=0;i<old_png.width;i++)
							{
								var idx = (old_png.width * j + i) << 2;	
								
								var idx_r = (result_png.width * m + (n + big_image.width)) << 2;
								
								
								result_png.data[idx_r] =   old_png.data[idx];
								result_png.data[idx_r+1] =   old_png.data[idx+1]; 
								result_png.data[idx_r+2] =   old_png.data[idx+2]; 
								result_png.data[idx_r+3] =   old_png.data[idx+3]; 
								
								n++;
							}
							
							m++;
						}
							

				 
					return result_png;
					
				 
 
	
}


function down_glue(global_memory,nm1,nm2) {
 

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
						
							width: old_png.width + big_image.width,
							height: old_png.height + big_image.height,
							filterType: 4
					} );
					
					
						for(var j=0;j<result_png.height;j++)
						{
							for(var i=0;i<result_png.width;i++)
							{
								 
					//		  var n=i-t4;
					//		  var m=j-k4;
					
								var idx_r = (result_png.width * j + i) << 2;
								var idx_r = (result_png.width * j + i) << 2;
								
								result_png.data[idx+0] = 0;
								result_png.data[idx+1] = 0; 
								result_png.data[idx+2] = 255; 
								result_png.data[idx+3] = 255; 
							}
						}							
								
					
				//	  var t4 = (old_png.width-big_image.width)/2;
				//	 var k4 = (old_png.height-big_image.height)/2;	
						
				//		if(old_png.width!=big_image.width) return null;
				//		if(old_png.height!=big_image.height) return null;
						
						var n = 0;
						var m = 0;
						for(var j=0;j<big_image.height;j++)
						{
							n = 0;
							for(var i=0;i<big_image.width;i++)
							{
								var idx = (big_image.width * j + i) << 2;	
							
								 
					//		  var n=i-t4;
					//		  var m=j-k4;
					
								var idx_r = (result_png.width * m + n) << 2;
								
								
								result_png.data[idx_r] = big_image.data[idx];
								result_png.data[idx_r+1] =  big_image.data[idx+1]; 
								result_png.data[idx_r+2] =  big_image.data[idx+2]; 
								result_png.data[idx_r+3] =  big_image.data[idx+3]; 
								
								n++;
							}
							
							m++;
						}

						n=0;
						m=0;	
						
						for(var j=0;j<old_png.height;j++)
						{
							n=0;
							for(var i=0;i<old_png.width;i++)
							{
								var idx = (old_png.width * j + i) << 2;	
								
								var idx_r = (result_png.width * (m+ big_image.height) + n ) << 2;
								
								
								result_png.data[idx_r] =   old_png.data[idx];
								result_png.data[idx_r+1] =   old_png.data[idx+1]; 
								result_png.data[idx_r+2] =   old_png.data[idx+2]; 
								result_png.data[idx_r+3] =   old_png.data[idx+3]; 
								
								n++;
							}
							
							m++;
						}
							

				 
					return result_png;
					
				 
 
	
}



		