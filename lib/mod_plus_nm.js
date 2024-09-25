console.log('mod plus nm on');
var PNG = require('pngjs').PNG;
module.exports.plus_nm = plus_nm;
 
	function plus_nm(global_memory, nm1, n, m ) {
 

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
		
		
		

		
  
		 
		var width = old_png.width;
		var height = old_png.height;
		
		if((n==2) &&  (m==2)) {
		//console.log("n="+n+",m="+m+" lagan");
		
				 	var newpng = new PNG ( {
						
							width:  width * n,
							height: height * m,
							filterType: 4
					} );
					
					for (var y = 0; y < height; y++) {
				for (var x = 0; x < width; x++) {
					
					var idx = (width * y + x) << 2;
					
					var new_idx = newpng.width * (y*m) + (x*n) << 2;
					//кількість індексів що дорівнює кількості строк
					var new_idx2 = newpng.width * (y*m+1) + (x*n) << 2;
					
					newpng.data[new_idx] = old_png.data[idx];
					newpng.data[new_idx+1] = old_png.data[idx+1];
					newpng.data[new_idx+2] = old_png.data[idx+2];
					newpng.data[new_idx+3] = old_png.data[idx+3];
					
					newpng.data[new_idx+4] = old_png.data[idx];
					newpng.data[new_idx+5] = old_png.data[idx+1];
					newpng.data[new_idx+6] = old_png.data[idx+2];
					newpng.data[new_idx+7] = old_png.data[idx+3];
					//-------------------------------------------------
					newpng.data[new_idx2] = old_png.data[idx];
					newpng.data[new_idx2+1] = old_png.data[idx+1];
					newpng.data[new_idx2+2] = old_png.data[idx+2];
					newpng.data[new_idx2+3] = old_png.data[idx+3];
					
					newpng.data[new_idx2+4] = old_png.data[idx];
					newpng.data[new_idx2+5] = old_png.data[idx+1];
					newpng.data[new_idx2+6] = old_png.data[idx+2];
					newpng.data[new_idx2+7] = old_png.data[idx+3];
					
					
				}
			}
			return newpng;
		}
		
		if((n==3) &&  (m==3)) {
		//console.log("n="+n+",m="+m+" lagan");
		
				 	var newpng = new PNG ( {
						
							width:  width * n,
							height: height * m,
							filterType: 4
					} );
					
					for (var y = 0; y < height; y++) {
				for (var x = 0; x < width; x++) {
					
					var idx = (width * y + x) << 2;
					
					var new_idx = newpng.width * (y*m+0) + (x*n) << 2;
					//кількість індексів що дорівнює кількості строк
					var new_idx2 = newpng.width * (y*m+1) + (x*n) << 2;
					var new_idx4 = newpng.width * (y*m+2) + (x*n) << 2;
					
					newpng.data[new_idx] = old_png.data[idx];
					newpng.data[new_idx+1] = old_png.data[idx+1];
					newpng.data[new_idx+2] = old_png.data[idx+2];
					newpng.data[new_idx+3] = old_png.data[idx+3];
					
					newpng.data[new_idx+4] = old_png.data[idx];
					newpng.data[new_idx+5] = old_png.data[idx+1];
					newpng.data[new_idx+6] = old_png.data[idx+2];
					newpng.data[new_idx+7] = old_png.data[idx+3];
					
					newpng.data[new_idx+8] = old_png.data[idx];
					newpng.data[new_idx+9] = old_png.data[idx+1];
					newpng.data[new_idx+10] = old_png.data[idx+2];
					newpng.data[new_idx+11] = old_png.data[idx+3];
					//-------------------------------------------------
					
					newpng.data[new_idx2] = old_png.data[idx];
					newpng.data[new_idx2+1] = old_png.data[idx+1];
					newpng.data[new_idx2+2] = old_png.data[idx+2];
					newpng.data[new_idx2+3] = old_png.data[idx+3];
					
					newpng.data[new_idx2+4] = old_png.data[idx];
					newpng.data[new_idx2+5] = old_png.data[idx+1];
					newpng.data[new_idx2+6] = old_png.data[idx+2];
					newpng.data[new_idx2+7] = old_png.data[idx+3];
					
					newpng.data[new_idx2+8] = old_png.data[idx];
					newpng.data[new_idx2+9] = old_png.data[idx+1];
					newpng.data[new_idx2+10] = old_png.data[idx+2];
					newpng.data[new_idx2+11] = old_png.data[idx+3];
					
					//-------------------------------------------------
					
					newpng.data[new_idx4] = old_png.data[idx];
					newpng.data[new_idx4+1] = old_png.data[idx+1];
					newpng.data[new_idx4+2] = old_png.data[idx+2];
					newpng.data[new_idx4+3] = old_png.data[idx+3];
					
					newpng.data[new_idx4+4] = old_png.data[idx];
					newpng.data[new_idx4+5] = old_png.data[idx+1];
					newpng.data[new_idx4+6] = old_png.data[idx+2];
					newpng.data[new_idx4+7] = old_png.data[idx+3];
					
					newpng.data[new_idx4+8] = old_png.data[idx];
					newpng.data[new_idx4+9] = old_png.data[idx+1];
					newpng.data[new_idx4+10] = old_png.data[idx+2];
					newpng.data[new_idx4+11] = old_png.data[idx+3];
					
				}
			}
			return newpng;
		}
	
		//	if((n==5) &&  (m==5)) {
		//console.log("n="+n+",m="+m+" lagan");
		
				 	var newpng = new PNG ( {
						
							width:  width * n,
							height: height * m,
							filterType: 4
					} );
					
					for (var y = 0; y < height; y++) {
				for (var x = 0; x < width; x++) {
					
					var idx = (width * y + x) << 2;
					
					var new_idx_arr = [];
					//кількість індексів що дорівнює кількості строк
					for(var ii=0;ii<m;ii++) {
						var new_idx = newpng.width * (y*m+ii) + (x*n) << 2;
						new_idx_arr.push(new_idx);
					}
					
					//var new_idx2 = newpng.width * (y*m+1) + (x*n) << 2;
					//var new_idx4 = newpng.width * (y*m+2) + (x*n) << 2;
					
					for(var jj=0;jj<m;jj++) {
						for(var ii=3;ii<m*4;ii+=4) {
							
							newpng.data[new_idx_arr[jj]+ii-3] = old_png.data[idx];
							newpng.data[new_idx_arr[jj]+ii-2] = old_png.data[idx+1];
							newpng.data[new_idx_arr[jj]+ii-1] = old_png.data[idx+2];
							newpng.data[new_idx_arr[jj]+ii] = old_png.data[idx+3];
							
							//newpng.data[new_idx_arr[jj]+4] = old_png.data[idx];
							//newpng.data[new_idx_arr[jj]+5] = old_png.data[idx+1];
							//newpng.data[new_idx_arr[jj]+6] = old_png.data[idx+2];
							//newpng.data[new_idx_arr[jj]+7] = old_png.data[idx+3];
						
						}
						
					}
					
					 
					
				}
			}
			
			return newpng;
	//	}
	//	return null;
		 
		
	}
