console.log('mod super paint over on');
var PNG = require('pngjs').PNG;
module.exports.super_paint_over = super_paint_over;


function super_paint_over(global_memory, nm1, n  ) {
 

			var im =  new PNG({
			
				width: global_memory[nm1].img.width,
				height: global_memory[nm1].img.height,
				filterType: 4
				
			
			});
			
			var arr = global_memory[nm1].img.data;
		
		
		 
						for(var j=0;j<im.height;j++)
						{
							for(var i=0;i<im.width;i++)
							{
								var idx = (im.width * j + i) << 2;	
							
							 
								im.data[idx]=arr[idx];
								im.data[idx+1]=arr[idx+1];
								im.data[idx+2]=arr[idx+2];
								im.data[idx+3]=arr[idx+3];
							}
						}
		
		
		


 
	return __super_paint_over(im,n);
}

function compareColors(arr,arr2)
{
	for(var j=0;j<arr.length;j++)
	{
		var df = Math.abs(arr[j]-arr2[j]);
		if(df!=0)return false;
	}
	return true;
}

function getColorArrayFromImageData(imgData0, x, y)
{
	
		var idx = ( imgData0.width * y + x) << 2;	
		
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}

function setPoint(data, w, x, y, color)
{
		var idx = ( w * y + x) << 2;	
		
		data[idx] = color[0];	
		data[idx+1] = color[1];	
		data[idx+2] = color[2];
		data[idx+3] = color[3];	
		
		return data;
}

function includesColor(colors, color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
					(colors[i][0] == color[0]) &&
					(colors[i][1] == color[1]) &&
					(colors[i][2] == color[2]) &&
					(colors[i][3]== color[3])
					
		) 
			{
				return true;
			}
	}
	return false;
}

function findColor(colors, color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
					(colors[i][0] == color[0]) &&
					(colors[i][1] == color[1]) &&
					(colors[i][2] == color[2]) &&
					(colors[i][3]== color[3])
					
		) 
			{
				return i;
			}
	}
	return null;
}




function getWHDNeighbors(x, y, dx, dy,w,h)
{
	var arr=[];
	if(((x-dx)>=0)&&((y-dy)>=0)) arr.push([x-dx,y-dy]);
	if((x-dx)>=0) arr.push([x-dx,y]);
	if(((x-dx)>=0)&&((y+dy)<h)) arr.push([x-dx,y+dy]);
	if((y-dy)>=0)arr.push([x,y-dy]);
	
	if((y+dy)<h)arr.push([x,y+dy]);
	if(((x+dx)<w)&&((y-dy)>=0))arr.push([x+dx,y-dy]);
	if(((x+dx)<w))arr.push([x+dx,y]);
	if(((x+dx)<w)&&((y+dy)<h))arr.push([x+dx,y+dy]);
	return arr;
	
}

function getMaxBackgroundFillColor( imgData2, x, y, dx, dy )
{
	

	
	var colors = [];
	var obj={};
	
	
		
		var color = getColorArrayFromImageData(imgData2, x, y);
		
		var arr2 = getWHDNeighbors(x, y, dx, dy, imgData2.width, imgData2.height );
	
		for(var i=0;i<arr2.length;i++)
		{
			var x1=arr2[i][0];
			var y1=arr2[i][1];
			
			var color2 = getColorArrayFromImageData(imgData2, x1, y1);
			
			
			if( (color2[0]==color[0]) && (color2[1]==color[1]) && (color2[2]==color[2]) && (color2[3]==color[3])  )
							
			{
			
			
			
			
			
			
			}
			else
			{
				
				if( includesColor(colors, color2)==false) 
				{
					colors.push(color2);
					obj[''+color2.join('_')] = 1;
				}
				else
				{
					obj[''+color2.join('_')] ++;
				}
				
				
			}
			
		}
		
	
	
	if(colors.length==0) return null;
	if(colors.length==1) return colors[0];
	//return null;
	
	var max=0;
	var ind= -1;
		for(var i=0;i<colors.length;i++)
		{
			if(max<obj[''+colors[i].join('_')])
			{
				ind=i;
				max=obj[''+colors[i].join('_')];
			}
		}
		
		return colors[ind];
	
	
}

function getAverageColor(colors)
{
	var f=false;
	var i0=0;
	var i1=0;
	var i2=0;
	var i3=0;
	for(var i=0;i<colors.length;i++)
	{
		i0 +=colors[i][0];
		i1 +=colors[i][1];
		i2 +=colors[i][2];
		i3 += 255;//colors[i][3];
	}
	
	return [i0/colors.length,i1/colors.length,i2/colors.length,i3/colors.length];
	
}
function __super_paint_over(im, lim)
{
	
	
	var w = im.width;
	var h = im.height;
	
	
	var im2 = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );
		
	
	var w2 = im2.width;
	var h2 = im2.height;

	
	max = 0;
	for (var y = 0; y < h; y++) {
				
		
				
		for (var x = 0; x < w; x++) {
			

			var color = getColorArrayFromImageData(im, x, y);
			im2.data = setPoint(im2.data,w,x,y,color);
		 
	 
			var dx=1;
			var dy=1;
			var arrPoints = []; 
			var arr2 =getWHDNeighbors(x, y, dx, dy,w,h);
			for(var i=0;i<arr2.length;i++)
			{
				var x1=arr2[i][0];
				var y1=arr2[i][1];
				
				var color2 = getColorArrayFromImageData(im, x1, y1);
				
				
				if( (color2[0]==color[0]) && (color2[1]==color[1]) && (color2[2]==color[2]) && (color2[3]==color[3])  )
								
				{
					arrPoints.push([x1,y1]);
				}
				
				
				
			}
			if(arrPoints.length>max) max = arrPoints.length;
			if(arrPoints.length <= lim ) {
				arrPoints.push([x,y]);
				 
				for(var i=0;i<arrPoints.length;i++)
				{
					var x1 = arrPoints[i][0];
					var y1 = arrPoints[i][1];
					//arrPoints.push([x1,y1]);
					im2.data = setPoint(im2.data, w, x1, y1,[0,0,0,0]);
				}
				
			}
		
		}
	}
		console.log("max="+max);
	 
	
	for (var y = 0; y < h; y++) {
				
		
				
		for (var x = 0; x < w; x++) {
			

		var color = getColorArrayFromImageData(im2, x, y);
			
			if( (color[0]==0) && (color[1]==0) && (color[2]==0) && (color[3]==0) ) {
			
			var dx=1;
			var dy=1;
			var found=false;
		var maxind=0;
						var maxf=0;
						var obj = {};
						
			var colors=[];
		var arr2 =getWHDNeighbors(x, y, dx, dy,w,h);
		for(var i=0;i<arr2.length;i++)
		{
			var x1=arr2[i][0];
			var y1=arr2[i][1];
			
			var color2 = getColorArrayFromImageData(im2, x1, y1);
			
		 
				var f = findColor(colors, color2);
				if(f==null) 
				{
					obj[colors.length] = 1;
					colors.push(color2);
					
					//obj[''+color2.join('_')] = 1;
				}
				else
				{
					//obj[''+color2.join('_')] ++;
					obj[f] ++;
					if(obj[f]>	maxf)
					{
						maxind=f;
						maxf=obj[f];
					}
				}
				
				
			
		}
			
			 
				var idx2 = w*y+x << 2;
				if(colors.length==1)
				{
				
							im2.data[idx2]=colors[0][0];
							im2.data[idx2+1]=colors[0][1];
							im2.data[idx2+2]=colors[0][2];
							im2.data[idx2+3]=colors[0][3];
				}
				else 
				{
					//var color = getAverageColor(colors);
					
					im2.data[idx2]=colors[maxind][0];
					im2.data[idx2+1]=colors[maxind][1];
					im2.data[idx2+2]=colors[maxind][2];
					im2.data[idx2+3]=colors[maxind][3];
			
				}
			 
			
			obj=null;
			
			}
						
		}
	}
		 
	 
	return im2;
	
}