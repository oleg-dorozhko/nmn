const { workerData, parentPort } = require('worker_threads');
 console.log(workerData);
var arr =  razn_colors(   workerData.data, workerData.width, workerData.height  );
 
parentPort.postMessage( arr );		
	


function getArrayOfAllColors(im0,w,h)
{
  
			var obj = {};
			var colors = [];

			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0[idx]+"_"+im0[idx+1]+"_"+im0[idx+2]+"_"+im0[idx+3];
					//console.log ( "["+key+"]");
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0[idx], im0[idx+1],im0[idx+2],im0[idx+3]]; 
						colors.push(col); 
						obj[key]= true;//{cnt:1,arr:col};
					
					}
					 
					
					
					
					
					
				}
		 
			}
			
			console.log ( "razn colors: counted "+colors.length+" colors");
			
			return colors;
}


function __getCountOfColors(data, w, h)
{
	
	
		
			var obj = {};
			
			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+data[idx]+"-"+data[idx+1]+"-"+data[idx+2]+"-"+data[idx+3];
					if (obj[key]==undefined)obj[key]=0;
					obj[key]++;
				 
					
					
				}
			}
			
			var n=0;
			for(var p in obj){
				n++;
				console.log (p +" ="+obj[p]);
			}
			
			return n;
}


function get_razn_colors(imgData2,w,h)
{
	
	var colors = getArrayOfAllColors(imgData2, w, h);
		
	razn_colors = null;
	razn_colors = [];
	
	var ost = colors.length%3;
	var mm = null;
	if(ost==0)  mm = colors.length/3;
	else  mm = (colors.length+ost)/3;
	if(mm<2) mm=2;
	
	var nn = (250/mm|0);
	
	
	for(var r=10;r<250;r+=nn)
	{ 
		for(var g=10;g<250;g+=nn)
		{ 
			for(var b=10;b<250;b+=nn)
			{ 
				razn_colors.push([r,g,b,255]);
			}
		}
	
	}	
	
	console.log("razn_colors.length="+razn_colors.length);
	
	shuffle(razn_colors);

	return razn_colors;
}

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function razn_colors(imgData2, w, h)
{
	
	var colors = __getCountOfColors(imgData2, w, h);
	if(colors > 500) return -1;
	
	// console.log("---->"+colors.length);
	 var razn_colors = get_razn_colors(imgData2, w, h);
//	  console.log(razn_colors);
	// console.log("$$$$$$$$$$"+razn_colors.length);
	// console.log("!!!!!"+razn_colors.length);
	
	var colors = getArrayOfAllColors(imgData2, w, h);
	
	
	
	// console.log(colors);
//	console.log(w);
//	console.log(h);
//	return null;
	for(var j=0;j<h;j++)
	{
		for(var i=0;i<w;i++)
		{
			var idx = (w * j + i) << 2;	
			
			var arr = [];
			arr[0] = imgData2[idx];	
			arr[1] = imgData2[idx+1];	
			arr[2] = imgData2[idx+2];
			arr[3] = imgData2[idx+3];	
			
			var n = getIndexOfColor(colors,arr);
			
			arr = razn_colors[n];
			
			imgData2[idx]=arr[0];	
			imgData2[idx+1]=arr[1];	
			imgData2[idx+2]=arr[2];	
			imgData2[idx+3]=arr[3];	

			
		}
		
		
	}
	
	return imgData2;
}

function getIndexOfColor(colors,color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
				(colors[i][0]==color[0]) && 
				(colors[i][1]==color[1]) && 
				(colors[i][2]==color[2]) && 
				(colors[i][3]==color[3]) 
		
		) return i;
	}
}

