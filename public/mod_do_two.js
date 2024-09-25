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

function getPointIndex(points, point)
{
	for(var i=0;i<points.length;i++)
	{
		if((points[i][0]==point[0])&&(points[i][1]==point[1])) {
				return i;
			}
	}
	return null;
}

function includesValue(arr, val)
{
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==val) {
				return true;
			}
	}
	return false;
}

function getArrayOfAllColors(im0)
{
	
	var w = im0.width;
	var h = im0.height;
	
		
			var obj = {};
			var colors = [];

			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"_"+im0.data[idx+1]+"_"+im0.data[idx+2]+"_"+im0.data[idx+3];
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						colors.push(col); 
						obj[key]= true;//{cnt:1,arr:col};
					
					}
					else
					{
						//var obj4 = {cnt:obj[key].cnt+1,arr:obj[key].arr};
						//obj[key] = obj4;
					}
					
					
					
					
					
				}
			}
			
			//console.log ( "count="+colors.length);
			
			return colors;
}


function getArrayOfAllColorsQ(im0)
{
	
	var w = im0.width;
	var h = im0.height;
	
		
			var obj = {};
			var colors = [];

			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"_"+im0.data[idx+1]+"_"+im0.data[idx+2]+"_"+im0.data[idx+3];
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						colors.push(col); 
						obj[key]= {cnt:1,arr:col};
					
					}
					else
					{
						var obj4 = {cnt:obj[key].cnt+1,arr:obj[key].arr};
						obj[key] = obj4;
					}
					
					
					
					
					
				}
			}
			
			//console.log ( "count="+colors.length);
			
			return [colors,obj];
}


function vola(){
let randomN = getRandomInt(0,5);
let randomNeg = getRandomInt(0,2);
if(randomNeg==1) return -1*randomN;
}

function get_razn_colors(colors)
{
	razn_colors = null;
	razn_colors = [];
	
	let nb = colors.length;
	var nn = 250 / (( Math.pow( nb, 1/3 ) | 0 ) + 1 ) | 0;
	
	for(var r=10;r<250;r+=nn)
	{ 
		for(var g=10;g<250;g+=nn)
		{ 
			for(var b=10;b<250;b+=nn)
			{ 
		
		let rx = vola();
		let gx = vola();
		let bx = vola();
				razn_colors.push([r+rx,g+gx,b+bx,255]);
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
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


function fillRectangleFast(imgData2, x, y, n, m, col )
{
	
	for(var j=y;j<y+m;j++)
	{
		for(var i=x;i<x+n;i++)
		{
			var idx2 = (imgData2.width * j + i ) << 2;
			imgData2.data[idx2]=col[0];
			imgData2.data[idx2+1]=col[1];
			imgData2.data[idx2+2]=col[2];
			imgData2.data[idx2+3]=col[3];
			
		}
	}
	
	return imgData2;
}	
	
	
function shuffle_colors(global_cell_size)
{
	var canvas2 = document.getElementById("canvas");
	var context2 = canvas2.getContext("2d");
	
	var w = canvas2.width;
	var h = canvas2.height;
	
	
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	var colors = getArrayOfAllColors(imgData2);
	
	var razn_colors = get_razn_colors(colors);
	
	for(var j=0;j<h;j+=global_cell_size)
	{
		for(var i=0;i<w;i+=global_cell_size)
		{
			var idx = (w * j + i) << 2;	
			
			var arr = [];
			arr[0] = imgData2.data[idx];	
			arr[1] = imgData2.data[idx+1];	
			arr[2] = imgData2.data[idx+2];
			arr[3] = imgData2.data[idx+3];	
			
			var n = getIndexOfColor(colors,arr);
			
			arr = razn_colors[n];
			
			imgData2 = fillRectangleFast( imgData2, i, j, global_cell_size, global_cell_size, arr );
			
			//let randomN = getRandomInt(0,10000);
			//if(randomN<5) { 		}
			
		}
		
		
	}
	// setTimeout( function(im){
				
				// let cnv = document.createElement("canvas");
				// cnv.width = im.width;
				// cnv.height = im.height;
				// cnv.getContext("2d").putImageData(im,0,0);
				// document.body.appendChild(cnv);
					
				
			// }(imgData2),500);
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


function fillRectangleFast(data, w, x, y, n, m, col )
{
	
	for(var j=y;j<y+m;j++)
	{
		for(var i=x;i<x+n;i++)
		{
			var idx2 = (w * j + i ) << 2;
			data[idx2]=col[0];
			data[idx2+1]=col[1];
			data[idx2+2]=col[2];
			data[idx2+3]=col[3];
			
		}
	}
	
	return data;
}
   
function fillBorderPoints(arr,color){
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");	
	var imgData = context.getImageData(0,0,canvas.width,canvas.height);
	
	for(var j=0;j<arr.length;j++)
	{
		var x=arr[j][0];
		var y=arr[j][1];
			
		//let m = getRandomInt(0,100);
			 
		imgData.data = fillRectangleFast(imgData.data, imgData.width, x, y, 1, 1, color);	
			
	}
	context.putImageData(imgData,0,0);
	 
 }
 
function getColorArrayFromImageDataDataByIndex(data, idx)
{
	
		
		var arr0 = [];
		arr0[0] = data[idx];	
		arr0[1] = data[idx+1];	
		arr0[2] = data[idx+2];
		arr0[3] = data[idx+3];	
		
		return arr0;
}

function getWHDNeighbors(x, y, w, h, dx, dy)
{
	var arr=[];
	
	if( (x-dx >= 0) && (y-dy >= 0) ) arr.push([x-dx,y-dy]);
	
	if( x-dx >= 0 ) arr.push([x-dx,y]);
	
	if( (x-dx >= 0) && ( y+dy < h ) )	arr.push([x-dx,y+dy]);
	
	
	if (y-dy >= 0) arr.push([x,y-dy]);
	
	if ( y+dy < h) arr.push([x,y+dy]);
	
	if( (x+dx<w) && (y-dy>=0) ) arr.push([x+dx,y-dy]);
	
	if(x+dx<w) arr.push([x+dx,y]);
	
	if( (x+dx<w) && (y+dy<h) ) arr.push([x+dx,y+dy]);
	
	return arr;
	
}

function getWHDNeighborsFast(x, y, w, h, dx, dy)
{
	var arr=[];
	
	if( x-dx >= 0) { 
		arr.push([x-dx,y]);
		if( y-dy >= 0)  arr.push([x-dx,y-dy]);
		if( y+dy < h )  arr.push([x-dx,y+dy]);
	}
	
	if ( y-dy >= 0 ) arr.push([x,y-dy]);
	
	if ( y+dy < h ) arr.push([x,y+dy]);
	
	if( x+dx < w ) { 
		arr.push([x+dx,y]);
		if ( y-dy >= 0)  arr.push([x+dx,y-dy]);
		if ( y+dy < h)  arr.push([x+dx,y+dy]);
	}
	return arr;
	
}
 
 var global_undef = null;
 var global_border = null;
 var global_corner = null;
 var global_outer = null;
 
 function getPointColor(data, w, x, y ) {
	 
	let idx =  (w * y + x) << 2;
	return getColorArrayFromImageDataDataByIndex(data, idx);
	
 }
 
 function compareColors(color,color2)
{
	if(
			(color2[0]==color[0]) && 
			(color2[1]==color[1]) && 
			(color2[2]==color[2]) && 
			(color2[3]==color[3]) 
							
						
		)
		{
			return true;
			
		}	
		
		return false;
}
 
 function getColoredNeighs( whd, main_color, data, w  ) {
	
	var arr = [];
	var other_colors = [];
	var same_colors = [];
	for(let i=0; i < whd.length; i++ ) {
		
		let x = whd[i][0];
		let y = whd[i][1];
	    let t_color = getPointColor( data, w, x, y );	
		if(  compareColors( main_color, t_color ) )  {
			same_colors.push([x,y,t_color]);
		} 
		else {
			other_colors.push([x,y,t_color]);
		}
		
	}
	
	arr[0] = same_colors;
	arr[1] = other_colors;
	return arr;
 
 }
 
 function def_cluster( x, y, data, w, h, callback ) {
	
	let dx=1;
	let dy=1;
	 
	 
	global_border = [];
	global_corner = [];
	global_outer = [];
	let color = getPointColor(data,w,x,y);	
	global_undef = [[x,y,color]];	
	var executed_points = {};
    var added_points = {};
    let s_ind_4 = ""+x+"_"+y;
    added_points[s_ind_4]=true;
	
	while( global_undef.length  > 0 ) {
	
		var point = global_undef.shift();
		let s_ind = ""+point[0]+"_"+point[1];
		executed_points[s_ind]=true;
		
		var whd = getWHDNeighborsFast( point[0], point[1], w, h, dx, dy );
		 
			
			var neighs = getColoredNeighs( whd, color, data, w );
			if(neighs[0].length==8) {
			
				global_corner.push(point);
				
				
			} 
			else 
			{
				global_border.push(point);
				
			}
			
			 
			
		
	
 
			 
			
			for(let i=0;i<neighs[0].length;i++) {
			
				let neigh = neighs[0][i];
				let s_ind_2 = ""+neigh[0]+"_"+neigh[1];
				if(executed_points[s_ind_2]==true) {
					continue;
				}
               if(added_points[s_ind_2]==true) {
					continue;
				}
				global_undef.push(neigh);
                added_points[s_ind_2]=true;
			
			}
			
			for(let i=0;i<neighs[1].length;i++) {
			
				let neigh = neighs[1][i];
				let s_ind_2 = ""+neigh[0]+"_"+neigh[1];
				if(executed_points[s_ind_2]==true) {
					continue;
				}
				global_outer.push(neigh);
			}
			
		 
			
			
		//}
	}	

	var arr = [];
	arr[0] = global_corner;
	arr[1] = global_border;
	arr[2] = global_outer;
	
	callback(arr);	
 
 }
 
	function cloneColor(color)
	{
		return [ color[0], color[1], color[2], color[3] ];
	}

 function cloneColorsQuantities(qnt){
	 
	 let obj = {}
	 for (let key in qnt) {
			
			if(qnt[key] == 'deleted') continue;
			let obj2 = {};
			obj2.cnt = qnt[key].cnt;
			obj2.arr = cloneColor(qnt[key].arr);
			obj[key] = obj2;
			
		}
		return obj;
	 
 }

function getMaxColor(cq) {
	
	let max = 0;
	let maxInd = undefined;
	 
		console.log(cq);
		for (let key in cq) {
			if(cq[key].cnt>max) {
				maxInd = key; 
				max = cq[key].cnt;
			}
		}
		
	 
	console.log("Max ind=");
	console.log(cq[maxInd]);
	
	return maxInd;
	
}
	
function getRandomInt(min, max) 
{
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

function ff(){ 
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var imgData = context.getImageData(0,0,canvas.width,canvas.height);
	
	var colors = getArrayOfAllColorsQ(imgData);
	
	console.log("colors");
	console.log(colors);
	
	let fs = getRndColor();
	let sl = getRndColor();
	
	let firstColor = getMaxColor(colors[1]);
	firstColor = colors[1][firstColor];
	var w = imgData.width;
	var h = imgData.height;
	
		
			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					if(
					(imgData.data[idx]==firstColor.arr[0]) &&
					(imgData.data[idx+1]==firstColor.arr[1]) &&
					(imgData.data[idx+2]==firstColor.arr[2]) &&
					(imgData.data[idx+3]==firstColor.arr[3]) 
					
					){
						imgData.data[idx]=fs[0];
						imgData.data[idx+1]=fs[1];
						imgData.data[idx+2]=fs[2];
						imgData.data[idx+3]=fs[3];
					}
					else {
						imgData.data[idx]=sl[0];
						imgData.data[idx+1]=sl[1];
						imgData.data[idx+2]=sl[2];
						imgData.data[idx+3]=sl[3];
					}
				}
			}
	
	
	context.putImageData(imgData,0,0);

	

	console.log(firstColor);
	let ish = cloneColorsQuantities(colors[1]);
	console.log(ish);
	let second = deleteFromColorsQuantitiesByKey(ish, firstColor);
	console.log(second);
	let secondColor = getMaxColor(second);
	console.log(secondColor);
	//splitColors;
	
	
	
}

function deleteFromColorsQuantitiesByKey(cq0, key) {
	
		let cq = cloneColorsQuantities(cq0);
		for (let key1 in cq) {
			if( key == key1 ) {
				cq[key] = 'deleted'; 
			}
		}
		return cloneColorsQuantities(cq);
}
		
