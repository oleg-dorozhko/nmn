console.log('mod bluestiks on');
var PNG = require('pngjs').PNG;
module.exports.bluestiks = bluestiks;

function context_getImageData( im, w, i, j )
{
	var idx = (w * j + i) << 2;
	var rgb = [];
	rgb[0] = im.data[idx];
	rgb[1] = im.data[idx+1];
	rgb[2] = im.data[idx+2];
	return rgb;
}

function white( rgb )
{
	if( (rgb[0] == 255) && (rgb[1]==255) && (rgb[2]==255)) return true;
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

function tripleRight (im, w, i,j,n,m  )
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
	if(blue(imgData[3])) count++;
	
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

function tripleDown (im, w, i,j,n,m  )
{
	
	var dh=n;
	var dw=m;
	
	var imgData = null;
	imgData = [];
	var count=0;
	
	imgData[0] = context_getImageData(im,w,i-dw,j-dh);
	if(white(imgData[0])) count++;
	
	imgData[1] = context_getImageData(im,w,i,j-dh);
	if(blue(imgData[1])) count++;
	
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


function crossNeigh(im, w, i,j,n,m  )
{
	
	var dh=n;
	var dw=m;
	
	var imgData = null;
	imgData = [];
	var count=0;
	
	imgData[0] = context_getImageData(im,w,i-dw,j-dh);
	if(white(imgData[0])) count++;
	
	imgData[1] = context_getImageData(im,w,i,j-dh);
	if(blue(imgData[1])) count++;
	
	imgData[2] = context_getImageData(im,w,i+dw,j-dh);
	if(white(imgData[2])) count++;
	
	imgData[3] = context_getImageData(im,w,i-dw,j);
	if(blue(imgData[3])) count++;
	
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

function countNeigh (im, w, i,j,n,m  )
{
	
	var dh=n;
	var dw=m;
	
	var imgData = null;
	imgData = [];
	imgData[6] = context_getImageData(im,w,i,j-dh);
	imgData[7] = context_getImageData(im,w,i+dw,j-dh);
	imgData[0] = context_getImageData(im,w,i+dw,j);
	imgData[1] = context_getImageData(im,w,i+dw,j+dh);
	imgData[2] = context_getImageData(im,w,i,j+dh);
	imgData[3] = context_getImageData(im,w,i-dw,j+dh);
	imgData[4] = context_getImageData(im,w,i-dw,j);
	imgData[5] = context_getImageData(im,w,i-dw,j-dh);
	imgData[8] = context_getImageData(im,w,i,j);
	
	var counter=0;
	for(var i=0;i<imgData.length;i++)
	{
		if (arr_equals(imgData[8], imgData[i])) counter++;
	}
	
	return counter;
	
}

			
//corners
function bluestiks_old(im0)
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
				
				console.log("x="+x);
							console.log("y="+y);
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					if( im0.data[idx+2] == 189 ) {
						
						if(cornerNeigh( im0, w, x, y, 1, 1 )) {
						// console.log("im0.data[idx+0]="+im0.data[idx+0]);
					// console.log("im0.data[idx+1]="+im0.data[idx+1]);
					// console.log("im0.data[idx+2]="+im0.data[idx+2]);
					// console.log("im0.data[idx+3]="+im0.data[idx+3]);
							var n = moveRightToTriple(im0, w, h, x, y);
							var m = moveDownToTriple(im0, w, h, x, y);
							
							console.log("N="+n);
							console.log("M="+m);
							
							im = set_red_lines(im0,x,y,n+x,m+y);
							return im;
						}
					}
					
					if(x>2) break;
					
				}
				
				if(y>2) break;
			}
			console.log("Not found corner");
			return im0;
			
			
			
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

//cross
function old_cross_bluestiks(im0)
{

	var w = im0.width;
	var h = im0.height;
	
	
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
			var arr = [];
			var arr2 = [];

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
				//console.log("x="+x);
				//			console.log("y="+y);
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					if( im0.data[idx+2] == blue_color[2] ) {
						
						if(crossNeigh( im0, w, x, y, 1, 1 )) {
							arr.push([x,y]);
							 
						}
					}
					
					//if(x>2) break;
					
				}
				
				//if(y>2) break;
			}
			//if()console.log("Not found corner");
			
			for (var x = 0; x < w; x++) {
			for (var y = 0; y < h; y++) {
		

			
				
				//console.log("x="+x);
				//			console.log("y="+y);
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					if( im0.data[idx+2] == blue_color[2] ) {
						
						if(crossNeigh( im0, w, x, y, 1, 1 )) {
							 
							arr2.push([x,y]);
						}
					}
					
					//if(x>2) break;
					
				}
				
				//if(y>2) break;
			}
			
			
			console.log("arr.length="+arr.length);
			console.log(arr);
			
			return set_red_lines_array(im0,arr,arr2);
			
			
			
}				

//only blue inners
function  bluestiks(im0)
{

	var w = im0.width;
	var h = im0.height;
	
	
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
			var arr = [];
			var arr2 = [];

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
				 	 
					
					var idx = (w * y + x) << 2;
					
					 
					
					if( im0.data[idx+2] == blue_color[2] ) {
						//console.log("x="+x+", y="+y);
						if(innerFullNeigh( im0, w, x, y, 1, 1 )===9) {
							 
							im.data[idx] = im0.data[idx] ;
							im.data[idx+1] = im0.data[idx+1] ;
							im.data[idx+2] = im0.data[idx+2] ;
							im.data[idx+3] = im0.data[idx+3] ;
							 
						}
						else {
						    im.data[idx] = 255 ;
							im.data[idx+1] = 0;
							im.data[idx+2] = 0; 
							im.data[idx+3] = 255; 
						
						}
					}
					
					else {
						    im.data[idx] = 255 ;
							im.data[idx+1] = 0;
							im.data[idx+2] = 0; 
							im.data[idx+3] = 255; 
						
						}
					
					//if(x>2) break;
					
				}
				
				//if(y>2) break;
			}
			
			
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

