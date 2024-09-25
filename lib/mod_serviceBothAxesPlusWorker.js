const { workerData, parentPort } = require('worker_threads');
 var PNG = require('pngjs').PNG;
var result_png = bothAxesPlus( getPNGFromArray(workerData.data, workerData.width, workerData.height)  );
var arr = getArrayFromPNG(result_png.data, result_png.width, result_png.height);

parentPort.postMessage( { data: arr, width: result_png.width, height: result_png.height } );	

//			return { data:im, width: nwidth, height:nheight };
 
			
			

function getArrayFromPNG( dataArray, width, height ) {
	
	var arr = [];
	
	for(var j=0;j<height;j++)
	{
		for(var i=0;i<width;i++)
		{
			var idx = (width * j + i) << 2;	
						 
			arr[idx] = dataArray[idx];
			arr[idx+1] = dataArray[idx+1];
			arr[idx+2] = dataArray[idx+2];
			arr[idx+3] = dataArray[idx+3];
								
		}
	}
	
	return arr;
}

function getPNGFromArray( dataArray, width, height ) {
	
		var png = new PNG({
			
			width:  width,
			height:  height,
			filterType: 4
			
		});
				
		 
			for(var j=0;j< png.height;j++)
			{
				for(var i=0;i< png.width;i++)
				{
					var idx = ( png.width * j + i) << 2;	
				
				 
					 png.data[idx]= dataArray[idx];
					 png.data[idx+1]= dataArray[idx+1];
					 png.data[idx+2]= dataArray[idx+2];
					 png.data[idx+3]= dataArray[idx+3];
				}
			}
				
	
	return png;
}

function getSomePart(im, sw,sh, nw, nh)
{
	
	var newpng = new PNG ( {
			
				width: nw,
				height: nh,
				filterType: 4
		} );
		
	newpng = clearResultPng(newpng);
		
		
		
		var n=0;
		var m=0;
			for (var y = 0; y < nh; y++) {
				
			
				for (var x = 0; x < nw; x++) {
					
					
					
						var idx = (im.width * (y+sh) + (x+sw)) << 2;
						var idx1 = (nw * m + n) << 2;
						newpng.data[idx1+0] = im.data[idx+0];
						newpng.data[idx1+1] = im.data[idx+1];
						newpng.data[idx1+2] = im.data[idx+2];
						newpng.data[idx1+3] = im.data[idx+3];
						n++;
					}
					n=0;
					m++;
		
				}
	
	
	return newpng;
	
	
	
	
}


function putSomePart(rim, im, sw,sh)
{
	
	
		
		var n=0;
		var m=0;
			for (var y = 0; y < im.height; y++) {
				
			
				for (var x = 0; x < im.width; x++) {
					
					
					
						var idx = (im.width * y + x) << 2;
						var idx1 = (rim.width * (m+sh) + (n+sw)) << 2;
						rim.data[idx1+0] = im.data[idx+0];
						rim.data[idx1+1] = im.data[idx+1];
						rim.data[idx1+2] = im.data[idx+2];
						rim.data[idx1+3] = im.data[idx+3];
						n++;
					}
		n=0;m++;
				}
	
	
	return rim;
	
	
	
	
}


function clearResultPng(im)
{
			
		
			for (var y = 0; y < im.height; y++) {
				
			
				for (var x = 0; x < im.width; x++) {
					
					
					
						var idx = (im.width * y + x) << 2;
						
						im.data[idx+0] = 0;
						im.data[idx+1] = 0;
						im.data[idx+2] = 0;
						im.data[idx+3] = 0;
					
					}
		
				}
	
	
	return im;
}


function bothAxesPlus(im)
{
	//var cnv0 = document.getElementById("canvas");
	//var ctx0 = cnv0.getContext("2d");
	
	//getSomePart(im, nw, nh);
	
	
	
	
	var result_png = new PNG ( {
			
				width: im.width+1,
				height: im.height+1,
				filterType: 4
		} );
	
	
	result_png = clearResultPng(result_png);

	
	if ((im.width % 2 == 1) &&(im.height % 2 == 1))
	{
		var n1=(im.width / 2|0);
		//var n2=n1+2;
		var m1=(im.height / 2|0);
		//var m2=m1+2;
		
		
		
		var imgDt =  getSomePart(im, 0,0, n1+1,m1+1); // ctx0.getImageData(0,0,n1+1,m1+1);
		//result_png =imgDt;
		
		result_png = putSomePart(result_png,imgDt, 0,0);    //ctx.putImageData(imgDt,0,0);
		
		
		
		
		var imgDt2 = getSomePart(im,n1,0, n1+1,m1+1);      //ctx0.getImageData(n1,0,n1+1,m1+1);
		
		result_png = putSomePart(result_png,imgDt2, n1+1,0);     //ctx.putImageData(imgDt,n1+1,0);
		
		
		
		
		
		
		
		imgDt = getSomePart(im,0,m1,n1+1,m1+1);//imgDt = ctx0.getImageData(0,m1,n1+1,m1+1);
		result_png = putSomePart(result_png,imgDt, 0,m1+1); //ctx.putImageData(imgDt,0,m1+1);
		
		
		imgDt = getSomePart(im,n1,m1,n1+1,m1+1);//imgDt = ctx0.getImageData(n1,m1,n1+1,m1+1);
		result_png = putSomePart(result_png,imgDt,n1+1,m1+1);//ctx.putImageData(imgDt,n1+1,m1+1);
		
		
		/**
		*/
		
		
		//imgDt = ctx0.getImageData(0,0,n1,m1);
		//ctx.putImageData(imgDt,0,0);
		
		//
		
	}
	else if ((im.width % 2 == 0) &&(im.height % 2 == 0))
	{
		var n1=(im.width / 2);
		//var n2=n1+2;
		var m1=(im.height / 2);
		//var m2=m1+2;
		
		var imgDt =  getSomePart(im,0,0,n1+1,m1+1);///ctx0.getImageData(0,0,n1+1,m1+1);
		
		result_png = putSomePart(result_png,imgDt,0,0);///ctx.putImageData(imgDt,0,0);
				
		
		imgDt =  getSomePart(im,n1,0,n1+1,m1+1);//imgDt = ctx0.getImageData(n1,0,n1+1,m1+1);
		result_png = putSomePart(result_png,imgDt,n1+1,0);//ctx.putImageData(imgDt,n1+1,0);
			
	
		imgDt =  getSomePart(im,0,m1,n1+1,m1+1);//imgDt = ctx0.getImageData(0,m1,n1+1,m1+1);
		result_png = putSomePart(result_png,imgDt,0,m1+1); //ctx.putImageData(imgDt,0,m1+1);
		
		
		imgDt =  getSomePart(im,n1,m1,n1+1,m1+1);//imgDt = ctx0.getImageData(n1,m1,n1+1,m1+1);
		result_png = putSomePart(result_png,imgDt,n1+1,m1+1);//ctx.putImageData(imgDt,n1+1,m1+1);
		/**/
		
	}
	
	
	
	
	return result_png;
	
	
	
	
}




