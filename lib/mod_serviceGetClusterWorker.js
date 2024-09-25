const { workerData, parentPort } = require('worker_threads');
//get_cluster_MGC ( workerData.data, workerData.width, workerData.x, workerData.y, workerData.dx, workerData.dy);
//parentPort.postMessage( { data1: global_core_mgc, data2: global_border_mgc } );	
parentPort.postMessage( { msg: "not implemented yet"} );	
//get_cluster_MGC ( workerData.data, workerData.width, workerData.x, workerData.y, workerData.dx, workerData.dy, function(){
	//parentPort.postMessage( { data1: global_core_mgc, data2: global_border_mgc } );	
//} )


function getColorArrayFromImageDataMGC(data, w, x, y)
{
	
		var idx = ( w * y + x) << 2;	
		
		var arr0 = [];
		arr0[0] = data[idx];	
		arr0[1] = data[idx+1];	
		arr0[2] = data[idx+2];
		arr0[3] = data[idx+3];	
		
		return arr0;
}

function setColorArrayFromImageDataMGC(data, w, x, y, color)
{
		var idx = ( w * y + x) << 2;	
		
		data[idx] = color[0];	
		data[idx+1] = color[1];	
		data[idx+2] = color[2];
		data[idx+3] = color[3];	
		
		return data;
}


function compareColorsMGC(color,color2)
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

function getWHDNeighborsSameColorMGC( data, w, x, y, color0, dx, dy  )
{
	let arr=[];
	let arr2=[];
	let arr4=[];
	let color = null;
	
	arr.push([x-dx,y-dy]);
	color = getColorArrayFromImageDataMGC(data, w, arr[0][0], arr[0][1]);
	if(compareColorsMGC(color0,color)) { 
		arr2.push([arr[0][0], arr[0][1]]);
		arr4.push([arr[0][0], arr[0][1]]);
	}
	else if(compareColorsMGC(color,[0,0,0,1])) arr4.push([arr[0][0], arr[0][1]]);
	
	arr.push([x-dx,y]);
	color = getColorArrayFromImageDataMGC(data, w, arr[1][0], arr[1][1]);
	if(compareColorsMGC(color0,color)) {
		arr2.push([arr[1][0], arr[1][1]]);
		arr4.push([arr[1][0], arr[1][1]]);
	}
	else if(compareColorsMGC(color,[0,0,0,1])) arr4.push([arr[1][0], arr[1][1]]);
	
	arr.push([x-dx,y+dy]);
	color = getColorArrayFromImageDataMGC(data, w, arr[2][0], arr[2][1]);
	if(compareColorsMGC(color0,color)) { 
		arr2.push([arr[2][0], arr[2][1]]);
		arr4.push([arr[2][0], arr[2][1]]);
	}
	else if(compareColorsMGC(color,[0,0,0,1])) arr4.push([arr[2][0], arr[2][1]]);
	
	arr.push([x,y-dy]);
	color = getColorArrayFromImageDataMGC(data, w, arr[3][0], arr[3][1]);
	if(compareColorsMGC(color0,color)) {
		arr2.push([arr[3][0], arr[3][1]]);
		arr4.push([arr[3][0], arr[3][1]]);	
	} 
	else if(compareColorsMGC(color,[0,0,0,1])) arr4.push([arr[3][0], arr[3][1]]);
	
	arr.push([x,y+dy]);
	color = getColorArrayFromImageDataMGC(data, w, arr[4][0], arr[4][1]);
	if(compareColorsMGC(color0,color)) {
		arr2.push([arr[4][0], arr[4][1]]);
		arr4.push([arr[4][0], arr[4][1]]);
	} 
	else if(compareColorsMGC(color,[0,0,0,1])) arr4.push([arr[4][0], arr[4][1]]);
	
	arr.push([x+dx,y-dy]);
	color = getColorArrayFromImageDataMGC(data, w, arr[5][0], arr[5][1]);
	if(compareColorsMGC(color0,color)) {
		arr2.push([arr[5][0], arr[5][1]]);
		arr4.push([arr[5][0], arr[5][1]]);
	}
	else if(compareColorsMGC(color,[0,0,0,1])) arr4.push([arr[5][0], arr[5][1]]);
	
	arr.push([x+dx,y]);
	color = getColorArrayFromImageDataMGC(data, w, arr[6][0], arr[6][1]);
	if(compareColorsMGC(color0,color)) { 
		arr2.push([arr[6][0], arr[6][1]]);
		arr4.push([arr[6][0], arr[6][1]]);
	}
	else if(compareColorsMGC(color,[0,0,0,1])) arr4.push([arr[6][0], arr[6][1]]);
	
	arr.push([x+dx,y+dy]);
	color = getColorArrayFromImageDataMGC(data, w, arr[7][0], arr[7][1]);
	if(compareColorsMGC(color0,color)) {
		arr2.push([arr[7][0], arr[7][1]]);
		arr4.push([arr[7][0], arr[7][1]]);
	}
	else if(compareColorsMGC(color,[0,0,0,1])) arr4.push([arr[7][0], arr[7][1]]);
	
	return [arr2,arr4];
	
}

var global_core_mgc = [];
var global_border_mgc = [];
var global_obj_mgc = {};

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomIntMGC(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function __get_cluster_MGC(data, w, arr2_all, color0, dx, dy, callback ) {
	
	while(true) {
	
		let ind = 0;
		let xy = null;
		let interrupt = false;
		
		while(true) {
			if(arr2_all.length==0) {
				interrupt = true;
				break;
			}
			ind = getRandomIntMGC(0,arr2_all.length);
			xy = arr2_all.splice(ind,1);
			xy = xy[0];
			let t = ""+xy[0]+"_"+xy[1];
			if(global_obj_mgc[t]==true) continue;
			global_obj_mgc[t]=true;
			break;
			
		}
	
		if(interrupt==false) {
			
			//let color = getColorArrayFromImageDataMGC(data, w, xy[0], xy[1]);
			let neigh = getWHDNeighborsSameColorMGC( data, w, xy[0], xy[1], color0, dx, dy );
			if(neigh[0].length>0)
				arr2_all = arr2_all.concat(neigh[0]);
			data = setColorArrayFromImageDataMGC(data, w, xy[0], xy[1], [0,0,0,1]);
			if(neigh[1].length == 8) {
				global_core_mgc.push(xy);
				
			}
			else {
				global_border_mgc.push(xy);
			}
			//console.log(xy);
			//console.log(color);
			//console.log(neigh);
			 
			
			if(arr2_all.length==0) {
				 
				break;
				
			}  
		}
		else {
			 
			break;
		}
	
	}

}

function get_cluster_MGC ( data, w, x, y, dx, dy, callback ) {
	
	console.log(data);
	console.log("w="+w);
	console.log("x="+x);
	console.log("y="+y);
	
	let mode=1;
	if(mode==1) {
		global_core_mgc = null;
		global_border_mgc = null;
		global_obj_mgc = null;
		global_core_mgc = [];
		global_border_mgc = [];
		global_obj_mgc = {};
	}
	//setTimeout( () => {
		let color0 = getColorArrayFromImageDataMGC( data, w, x, y );
		__get_cluster_MGC(data, w, [[x,y]], color0, dx, dy);//, function(arr) {
			//callback(arr);
		//})
	//}, 10  );
}




















