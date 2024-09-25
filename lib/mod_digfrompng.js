console.log('mod digfrompng on');
var PNG = require('pngjs').PNG;
module.exports.digfrompng = digfrompng;

function context_getImageData( im, w, i, j )
{
	var idx = (w * j + i) << 2;
	var rgb = [];
	rgb[0] = im.data[idx];
	rgb[1] = im.data[idx+1];
	rgb[2] = im.data[idx+2];
	return rgb;
}
var wt = [255,0,0,255];
function white( rgb )
{
	if( (rgb[0] == wt[0]) && (rgb[1]==wt[1]) && (rgb[2]==wt[2])) return true;
	return false;
}

var blue_color = [];

function blue( rgb )
{
	if((rgb[0] === blue_color[0]) && (rgb[1]===blue_color[1]) && (rgb[2]===blue_color[2])) return true;
	return false;
}



function arr_equals(data1, data2)
{
	
	for(var j=0;j<data1.length;j++)
	{
		if(data1[j] != data2[j]) return false; 
	}
	
	return true;
}


function cornerNeigh (im, w, i,j,n,m  )
{
	
	var dh=n;
	var dw=m;
	
	var imgData = null;
	imgData = [];
	var count=0;
	
	imgData[0] = context_getImageData(im,w,i-dw,j-dh);
	if(white(imgData[0])) count++;
	
	imgData[1] = context_getImageData(im,w,i,j-dh);
	if(white(imgData[1])) count++;
	
	imgData[2] = context_getImageData(im,w,i+dw,j-dh);
	if(white(imgData[2])) count++;
	
	imgData[3] = context_getImageData(im,w,i-dw,j);
	if(white(imgData[3])) count++;
	
	imgData[4] = context_getImageData(im,w,i,j);
	if(blue(imgData[4])) count++;
	
	imgData[5] = context_getImageData(im,w,i+dw,j);
	if(blue(imgData[5])) count++;
	
	imgData[6] = context_getImageData(im,w,i-dw,j+dh);
	if(white(imgData[6])) count++;
	
	imgData[7] = context_getImageData(im,w,i,j+dh);
	if(blue(imgData[7])) count++;
	
	imgData[8] = context_getImageData(im,w,i+dw,j+dh);
	if(white(imgData[8])) count++;
	
	return (count==9)
	
}

function innerFullNeigh(im, w, i,j,n,m  )
{
	
	var dh=n;
	var dw=m;
	
	var imgData = null;
	imgData = [];
	var count=0;
	
	imgData[0] = context_getImageData(im,w,i-dw,j-dh);
	//console.log("imgData[0]=");
	//console.log(imgData[0]);
	if(blue(imgData[0])) count++;
	//console.log("count="+count);
	imgData[1] = context_getImageData(im,w,i,j-dh);
	if(blue(imgData[1])) count++;
	
	imgData[2] = context_getImageData(im,w,i+dw,j-dh);
	if(blue(imgData[2])) count++;
	
	imgData[3] = context_getImageData(im,w,i-dw,j);
	if(blue(imgData[3])) count++;
	
	imgData[4] = context_getImageData(im,w,i,j);
	if(blue(imgData[4])) count++;
	
	imgData[5] = context_getImageData(im,w,i+dw,j);
	if(blue(imgData[5])) count++;
	
	imgData[6] = context_getImageData(im,w,i-dw,j+dh);
	if(blue(imgData[6])) count++;
	
	imgData[7] = context_getImageData(im,w,i,j+dh);
	if(blue(imgData[7])) count++;
	
	imgData[8] = context_getImageData(im,w,i+dw,j+dh);
	if(blue(imgData[8])) count++;
	//console.log("count="+count);
	return count;
	
}
	
	
function innerFullNeighWhite(im, w, i,j,n,m  )
{
	
	var dh=n;
	var dw=m;
	
	var imgData = null;
	imgData = [];
	var count=0;
	
	imgData[0] = context_getImageData(im,w,i-dw,j-dh);
	//console.log("imgData[0]=");
	//console.log(imgData[0]);
	if(white(imgData[0])) count++;
	//console.log("count="+count);
	imgData[1] = context_getImageData(im,w,i,j-dh);
	if(white(imgData[1])) count++;
	
	imgData[2] = context_getImageData(im,w,i+dw,j-dh);
	if(white(imgData[2])) count++;
	
	imgData[3] = context_getImageData(im,w,i-dw,j);
	if(white(imgData[3])) count++;
	
	imgData[4] = context_getImageData(im,w,i,j);
	if(white(imgData[4])) count++;
	
	imgData[5] = context_getImageData(im,w,i+dw,j);
	if(white(imgData[5])) count++;
	
	imgData[6] = context_getImageData(im,w,i-dw,j+dh);
	if(white(imgData[6])) count++;
	
	imgData[7] = context_getImageData(im,w,i,j+dh);
	if(white(imgData[7])) count++;
	
	imgData[8] = context_getImageData(im,w,i+dw,j+dh);
	if(white(imgData[8])) count++;
	//console.log("count="+count);
	return count;
	
}
	

function defBlue(im0) {
var w = im0.width;
	var h = im0.height;
			for (var y = 0; y < h; y++) {
			for (var x = 0; x < w; x++) {
				var color = context_getImageData(im0,w,x,y);
			if(white(color)) continue;
			return color;
			}
			}
			return null;
}	
			

//only blue inners
function  digfrompng(im0)
{

	var w = im0.width;
	var h = im0.height;
	
	var arr = [];
	for(var i=0;i<w;i++) {   arr[i]=0; }
	
	var im = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );
		
	blue_color = defBlue(im0);
	if(blue_color == null) {
		console.log("blue_color==null");
		return im0;
	}
			 

	var i=0;
	var j=0;
			for (var x = 0; x < w ; x++ ) {
				
			
			for (var y = h-1; y > 0 ; y-- ) {
		

				 	 
					
					var idx = (w * y + x) << 2;
					//var idx2 = (w * (y-2) + x) << 2;
					//console.log("x="+x+",y="+y);
					//console.log("context_getImageData(im,w,x,y)=");
					//console.log(context_getImageData(im,w,x,y));
					//var spl = innerFullNeigh( im0, w, x, y, 1, 1 );
					//console.log("spl="+spl);
					
					im.data[idx] = im0.data[idx] ;
					im.data[idx+1] = im0.data[idx+1] ;
					im.data[idx+2] = im0.data[idx+2] ;
					im.data[idx+3] = im0.data[idx+3] ;
					
					if(!blue(context_getImageData(im0,w,x,y))) {
							 

					}	
					else {
								im.data[idx] = im0.data[idx] ;
							 im.data[idx+1] = im0.data[idx+1] ;
							 im.data[idx+2] = im0.data[idx+2] ;
							 im.data[idx+3] = im0.data[idx+3] ;
							 
							 arr[x]++;
					}						
					
					// if(( im0.data[idx+2] == blue_color[2] )  && (im0.data[idx2+1] == 255)) {
						
						// if((innerFullNeigh( im0, w, x, y, 1, 1 )===9) &&(innerFullNeighWhite( im0, w, x, y-2, 1, 1 )===9)) {
							 
							// im.data[idx] = 255;//im0.data[idx] ;
							// im.data[idx+1] = 255//;im0.data[idx+1] ;
							// im.data[idx+2] = 0;//.data[idx+2] ;
							// im.data[idx+3] = 255;//im0.data[idx+3] ;
							 
						// }
						// else {
						    // im.data[idx] = 255 ;
							// im.data[idx+1] = 0;
							// im.data[idx+2] = 0; 
							// im.data[idx+3] = 255; 
						
						// }
					// }
					
					// else {
						    // im.data[idx] = 255 ;
							// im.data[idx+1] = 0;
							// im.data[idx+2] = 0; 
							// im.data[idx+3] = 255; 
						
						// }
					
					//if(x>2) break;
					
					i++;
					//if(i>50) break;
				}
				i=0;
				j++;
				//if(j>20) break;
				//if(y>2) break;
			}
			
			console.log("LINE: ");
			console.log(arr);
			return im; //set_red_lines_array(im0,arr,arr2);
			
			
			
}				


function set_red_lines_array(im0, arr, arr2 )
{

	var w = im0.width;
	var h = im0.height;
	
	
	var im = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );
		
			
			for (var y = 0; y < h; y++) {
				for (var x = 0; x < w; x++) {
							var idx = (w * y + x) << 2;
						 
							im.data[idx] = im0.data[idx] ;
							im.data[idx+1] = im0.data[idx+1] ;
							im.data[idx+2] = im0.data[idx+2] ;
							im.data[idx+3] = im0.data[idx+3] ;
				}
			}	
	
			for(var i=1;i<arr.length;i++) {
				
				var x2 = arr[i][0];
				var y2 = arr[i][1];
				
				var x0 = arr[i-1][0];
				var y0 = arr[i-1][1];
				
				
				for (var x = x0; x < x2; x++) {
				
							var idx = (w * y0 + x) << 2;
						 
							im.data[idx] = 255;
							im.data[idx+1] = 0;
							im.data[idx+2] = 0;
							im.data[idx+3] = 255;
				}
			}
			
			for(var i=1;i<arr2.length;i++) {
				
				var x2 = arr2[i][0];
				var y2 = arr2[i][1];
				
				var x0 = arr2[i-1][0];
				var y0 = arr2[i-1][1];
				
				//console.log("From "+y0+" to "+y2 + " vertical x="+x0);
				for (var y = y0; y < y2; y++) {
				
							var idx = (w * y + x0) << 2;
						 
							im.data[idx] = 255;
							im.data[idx+1] = 0;
							im.data[idx+2] = 255;
							im.data[idx+3] = 255;
				}
			}
			
			return im;
}


function set_red_lines(im0, x1,y1,n,m)
{

	var w = im0.width;
	var h = im0.height;
	
	
	var im = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );
		
			
			for (var y = 0; y < h; y++) {
				for (var x = 0; x < w; x++) {
							var idx = (w * y + x) << 2;
						 
							im.data[idx] = im0.data[idx] ;
							im.data[idx+1] = im0.data[idx+1] ;
							im.data[idx+2] = im0.data[idx+2] ;
							im.data[idx+3] = im0.data[idx+3] ;
				}
			}	
	
			
			for (var y = y1; y < h; y++) {
				for (var x = x1; x < w; x+=n) {
							var idx = (w * y + x) << 2;
						 
							im.data[idx] = 255;
							im.data[idx+1] = 0;
							im.data[idx+2] = 0;
							im.data[idx+3] = 255;
				}
			}
			

			for (var y = y1; y < h; y+=m) {
				for (var x = x1; x < w; x++) {
							var idx = (w * y + x) << 2;
						 
							im.data[idx] = 255;
							im.data[idx+1] = 0;
							im.data[idx+2] = 0;
							im.data[idx+3] = 255;
				}
			}
			
			return im;
}


function moveRightToTriple(im0, w,h, x1, y1)
{

	
			var n=0;

			for (var y = y1; y < h; ) {
		

			for (var x = x1; x < w; x++) {
				
					
					//var idx = (w * y + x) << 2;
					
					
					
						if(tripleRight( im0, w, x, y, 1, 1 )) {
						
							return n;
						}
					
					n++;
					
					
					
				}
				break;
			}
			
			//console.log("Not found triple right");
			
			return n;
		
			
}	

function moveDownToTriple(im0, w, h, x1, y1)
{

	
			var m=0;
for (var x = x1; x < w; ) {

			for (var y = y1; y < h;y++ ) {
		

			
				
					
						if(tripleDown( im0, w, x, y, 1, 1 )) {
						
							return m;
						}
					
					m++;
					
					
					
				}
				break;
			}
			
			//console.log("Not found triple right");
			
			return m;
		
			
}			

