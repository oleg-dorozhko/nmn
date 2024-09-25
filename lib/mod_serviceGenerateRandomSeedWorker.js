const { workerData, parentPort } = require('worker_threads');
var PNG = require('pngjs').PNG;
var result_png = generate_random_seed( workerData  );
console.log("FINISHED grs");
parentPort.postMessage( { data: result_png.data, width: result_png.width, height: result_png.height } );	

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


function generate_random_seed(params)
{
	console.log(params);
	params = params.cmd;
	var t = params.replace("generate random seed",'');
		t=t.trim();
		params=null;
		if(t.length>0)
		{
			params=t.split(" ");
			if(params.length>0)
			{
				for(var ii=0;ii<params.length;ii++) params[ii]=Number(params[ii]);
				
			}
			else
			{
				params =[15,3];
			}
		}
		else
		{
			params =[15,3];
		}
		
	console.log('in generate_random_seed: '+params);
	var wh = getRandomInt(3,20);
	var wh2 = getRandomInt(2,8);
	
	
	
	if(params)
	{
		wh0 = params[0];
		if(wh0==-1)
		{
		}
		else
		{
			if(wh<3) return -1;
			if(wh>20) return -2;
			wh = params[0];
		}
		
		 wh02 = params[1];
		 if(wh02== -1)
		 {
		 }
		 else
		 {
			if(wh2<2) -3;
			if(wh2>8) -4;
			wh2 = params[1];
		 }
		
	}
	
	
	var imageData = new PNG ( {
						
							width: wh,
							height: wh,
							filterType: 4
					} );
	
	
	
	var randoms = [];
	while(true)
	{
		var rgba = getRndColor();
		if(includesColor(randoms,rgba)==false)
		{
			randoms.push(rgba);
			if(randoms.length==wh2) break;
		}
	}
	
	
	var arr = [];
	
		for(var j=0;j<wh;j++)
		{
			for(var i=0;i<wh;i++)
			{
				
				//var imgData = context2.getImageData(i,j,1,1);
				var rgba = randoms[getRandomInt(0,randoms.length)];
				
				var obj = {};
				obj.i = i;
				obj.j = j;
				obj.r = rgba[0];
				obj.g = rgba[1];
				obj.b = rgba[2];
				obj.a = rgba[3];
					
				arr.push(obj);
					
			}
		}
	
		
		
		
		for(var i=0;i<arr.length;i++)
		{
			var obj = arr[i];
			var dd = (obj.j*wh+obj.i)*4;
			imageData.data[dd]  = obj.r;
			imageData.data[dd+1]  = obj.g;
			imageData.data[dd+2]  = obj.b;
			imageData.data[dd+3]  = obj.a;
			
			var dd2 = (obj.i*wh+obj.j)*4;
			imageData.data[dd2]  = obj.r;
			imageData.data[dd2+1]  = obj.g;
			imageData.data[dd2+2]  = obj.b;
			imageData.data[dd2+3]  = obj.a;
		}
		
		return 	imageData;
			
	
}


// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRndColor()
{
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var a = 255;
	
	return [r,g,b,a];
	
}

function includesColor(colors, color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
					(colors[i][0] == color[0]) && (colors[i][1] == color[1]) &&
					(colors[i][2] == color[2]) && (colors[i][3]== color[3])
					
		) 
			{
				return true;
			}
	}
	return false;
}




