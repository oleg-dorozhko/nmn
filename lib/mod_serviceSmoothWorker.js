const { workerData, parentPort } = require('worker_threads');
 
var arr =  smooth(   workerData.data, workerData.width, workerData.height  );
 
parentPort.postMessage( arr );		
	


function isNeighborsOtherThen(glob_pixelsPro_pg_main_image,x,y,w,h)
{
 
	
	var x0=x-1;
	var x1=x+1;
	var y0=y-1;
	var y1=y+1;
	
	var index = w * (y) + (x) << 2;
	var clr = [
					glob_pixelsPro_pg_main_image[index],
					glob_pixelsPro_pg_main_image[index+1],
					glob_pixelsPro_pg_main_image[index+2],
					glob_pixelsPro_pg_main_image[index+3]
				];
	
	
	
		var index = w * (y) + (x0) << 2;
				color = [
					glob_pixelsPro_pg_main_image[index],
					glob_pixelsPro_pg_main_image[index+1],
					glob_pixelsPro_pg_main_image[index+2],
					glob_pixelsPro_pg_main_image[index+3]
				];
				
				
				
				
	
		if( (color[0]==clr[0]) && (color[1]==clr[1]) && (color[2]==clr[2]) && (color[3]==clr[3]) ) ;
		else return true;
		
	
				index = w * (y) + (x1) << 2;
				color = [
					glob_pixelsPro_pg_main_image[index],
					glob_pixelsPro_pg_main_image[index+1],
					glob_pixelsPro_pg_main_image[index+2],
					glob_pixelsPro_pg_main_image[index+3]
				];
		
		if( (color[0]==clr[0]) && (color[1]==clr[1]) && (color[2]==clr[2]) && (color[3]==clr[3]) ) ;
		else return true;
		
				
				index = w * (y0) + (x) << 2;
				color = [
					glob_pixelsPro_pg_main_image[index],
					glob_pixelsPro_pg_main_image[index+1],
					glob_pixelsPro_pg_main_image[index+2],
					glob_pixelsPro_pg_main_image[index+3]
				];
			
		if( (color[0]==clr[0]) && (color[1]==clr[1]) && (color[2]==clr[2]) && (color[3]==clr[3]) ) ;
		else return true;
		
				index = w * (y1) + (x) << 2;
				
				var color = [
					glob_pixelsPro_pg_main_image[index],
					glob_pixelsPro_pg_main_image[index+1],
					glob_pixelsPro_pg_main_image[index+2],
					glob_pixelsPro_pg_main_image[index+3]
				];
	
		if( (color[0]==clr[0]) && (color[1]==clr[1]) && (color[2]==clr[2]) && (color[3]==clr[3]) ) return false;
		else return true;
				
	
}


function smooth(im,w,h)
{
	var count=0;
	var indexes=[];
	for (var y = 1; y < h-1; y+=1) {
				
		
				
		for (var x = 1; x < w-1; x+=1) {
					
			
					
				var idx = (w * y + x) << 2;
			
				 
					
					if(isNeighborsOtherThen(im,x,y,w,h))
					{
						indexes.push(idx);
						
					}
				 
		}
	}
	
	
	for (var y = 1; y < h-1; y+=1) {
				
		
				
		for (var x = 1; x < w-1; x+=1) {
					
			
					
				var idx = (w * y + x) << 2;
				
				for(var n7=0;n7<indexes.length;n7++)
			
				{

					 
					
					if(idx==indexes[n7])
					{
						
						var arr = [0,0,0,255]; 
						im [idx+0]=arr[0];
						im [idx+1]=arr[1];		
						im [idx+2]=arr[2];
						im [idx+3]=arr[3];
					}
				}				
		}
	}
	return im;

}