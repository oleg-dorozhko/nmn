console.log('mod step colors on');
var PNG = require('pngjs').PNG;
//var mod_mirror = require('./mod_mirror');
//var mod_median = require('./mod_median');
module.exports.stepColorsForImageData = stepColorsForImageData;

function get_array_of_colors(im0)
{
	
	
	
	var w = im0.width;
	var h = im0.height;
	/*****		
	var canvas2 = document.createElement("canvas");
	canvas2.width = w;
	canvas2.height = h;
	var context2 = canvas2.getContext("2d");
		
	var im = context2.getImageData(0,0,canvas2.width,canvas2.height);

	
	var r = n1;
	var g = n2;
	var b = n3;
	var a = 0;
	****/		
			var obj = {};
			var arr = [];

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						arr.push(col); 
						obj[key]= {cnt:1,arr:col};
					
					}
					else
					{
						var obj4 = {cnt:obj[key].cnt+1,arr:obj[key].arr};
						obj[key] = obj4;
					}
					
					
					
					
					
				}
			}
			
			
			var obj2={};
			for(var ob in obj)
			{
				
				// console.log ( "count="+obj[ob].cnt+" color: "+ob);
				obj2[ob] = {cnt:obj[ob].cnt,arr:obj[ob].arr};
			}
			
			
			var arr2 = [];
			var count = arr.length;
			while(true)
			{
				var max = 0;
				var max_ob = "";
				for(var ob in obj2)
				{
					if (obj2[ob]==undefined) continue;
					
						if( max < obj2[ob].cnt)
						{
							max = obj2[ob].cnt;
							max_ob = ob;
							
							
						}
					
					//console.log ( "ob.count="+obj[ob]);
				}
				
				if (max_ob == "") break;
				
				{
					arr2.push(obj2[max_ob].arr);
					obj2[max_ob] = undefined;
					count--;
					if (count <0 ) break;
				}
			}
		
			for (var i = 0; i < arr2.length; i++) 
			{
				console.log ( arr2[i]);
			}
		
			
			return [arr2,obj];
}

function get_index_of_color (colors, im0, idx)
{
	//console.log ( "in get_index_of_color colors.length="+colors.length);
	for (var i = 0; i < colors.length; i++) 
	{
		//console.log ( "colors["+i+"][0]="+colors[i][0]); //", x="+x+" y="+y);
		//console.log ( "im0.data["+idx+"][0]="+im0.data[idx]);
		if (
		
		im0.data[idx] == colors[i][0] &&
		im0.data[idx+1] == colors[i][1] &&
		im0.data[idx+2] == colors[i][2] &&
		im0.data[idx+3] == colors[i][3]
		) 
		{
			//console.log ( "out from get_index_of_color #1");
			return i;
			
		}
		
	}
	//console.log ( "out from get_index_of_color #2");
	return null;
	
}



function stepColorsForImageData(im)
{
	var w = im.width;
	var h = im.height;
	
	var arr = get_array_of_colors(im);
	var colors = arr[0];
	//console.log ( "colors.length="+colors.length);
	
	colors.splice(colors.length-1,1);
	//console.log ( "colors.length="+colors.length);
	//return im;
	//var jj = obj.keys();
	//obj[jj[jj.length-1]]=undefined;
			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
					
						
						var idx = (w * y + x) << 2;
						
						var ind = get_index_of_color (colors, im, idx);
						
						////////////////////// corrected 17 11 2022    23 15 ////////////
						// if(ind==null) ind = 0;
						if(ind==null) ind = colors.length-1;
						//////////////////////////////////////////
						var new_idx = idx;
						
						var nc =  colors[ind];
						//console.log ( "nc["+idx+"]="+nc+", x="+x+" y="+y);
						im.data[new_idx] =  nc[0];
						im.data[new_idx+1] =  nc[1]; //cyclic_random_plus ( im0.data[idx+1], g );
						im.data[new_idx+2] =  nc[2];  //cyclic_random_plus ( im0.data[idx+2], b );
						im.data[new_idx+3] =   nc[3];  //cyclic_random_plus ( im0.data[idx+3], a );
						
						
						
						
				}
			}
		return im;
}