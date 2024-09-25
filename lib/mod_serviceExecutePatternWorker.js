const { workerData, parentPort } = require('worker_threads');
var PNG = require('pngjs').PNG;
//var mod_genrndseed =  require('./mod_genrndseed'); 
//var mod_move_memory =  require('./mod_move_memory'); 
//var mod_delete_in_memory = require('./mod_delete_in_memory');
let script = workerData;
let t_commands = script.commands; 
//console.log("in msepw:");
//console.log(t_commands); // t_commands is object with property commands
// // let obj = {};

		  let instr = t_commands.commands[0];
		  
		if(equalCommand(instr.cmd,"execute script")) { //create script, test script, save script 
			  
			    console.log("Not implemented");
				// // // let png = // execute_script ( workerData ) ; 
				// // // obj = null;
				// // // obj = {};
				// // // obj.md5 = t_commands.md5;
				// // // obj.img = png;
				// // // obj.addr = instr.to;
				// // // obj.status1 = 'after';
				 
				
				// // // parentPort.postMessage( obj );
				
		}  
		 
		  
		else if(equalCommand(instr.cmd,"generate random seed")) {
			 // // if(instr.cmd==undefined){
		  //console.log(instr);
		  //console.log(instr.cmd);
		  // // return;
			 //}
				let png = generate_random_seed ( instr.cmd );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				//console.log("HERE! #253445");
				
				parentPort.postMessage( obj );
				
		}
		else if(equalCommand(instr.cmd,"combo")) {
			  
				let png = combo ( workerData.img, workerData.img2  );			  
			//	let png = combo ( workerData.img.data, workerData.img.width, workerData.img.height, workerData.img2.data, workerData.img2.width, workerData.img2.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
		
		else if(equalCommand(instr.cmd,"fill")) {
			  
				let png = fill ( workerData.img, workerData.img2  );			  
			//	let png = combo ( workerData.img.data, workerData.img.width, workerData.img.height, workerData.img2.data, workerData.img2.width, workerData.img2.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
		
		else if(equalCommand(instr.cmd,"plus")) {
			  
				let png = plus ( workerData.img.data, workerData.img.width, workerData.img.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
		
		
		else if(equalCommand(instr.cmd,"minus")) {
			  
				let png = minus ( workerData.img.data, workerData.img.width, workerData.img.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
		
		
		
		else if(equalCommand(instr.cmd,"axes minus")) {
			  
				let png = bothAxesMinus( workerData.img.data, workerData.img.width, workerData.img.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
		
		else if(equalCommand(instr.cmd,"border minus")) {
			  
				let png = border_minus( workerData.img.data, workerData.img.width, workerData.img.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
		
		else if(equalCommand(instr.cmd,"smooth")) {
			  
				let png = smooth ( workerData.img.data, workerData.img.width, workerData.img.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
		else if(equalCommand(instr.cmd,"rotate plus 45")) {
			  
				let png = rotate_ff( workerData.img.data, workerData.img.width, workerData.img.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
		
		else if(equalCommand(instr.cmd,"mirror right")) {
			  
				let png = mirror_right( workerData.img.data, workerData.img.width, workerData.img.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
		
		else if(equalCommand(instr.cmd,"mirror down")) {
			  
				let png = mirror_down( workerData.img.data, workerData.img.width, workerData.img.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
		
		else if(equalCommand(instr.cmd,"median")) {
			  
				let png = median( workerData.img.data, workerData.img.width, workerData.img.height  );
				obj = null;
				obj = {};
				obj.md5 = t_commands.md5;
				obj.img = png;
				obj.addr = instr.to;
				obj.status1 = 'after';
				 
				
				parentPort.postMessage( obj );
				
		}
			
		
		
		
		function equalCommand(s,s2) {
			if(s.indexOf(s2)===0) return true;
			return false;
		}

// // ///////////////////////////////// generate random seed ////////////////////////////////////////////////



function generate_random_seed(params)
{
	console.log(params);
	//params = params.cmd;
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
		
		let arr2 = [];
		for(let i=0;i<imageData.data.length;i++) {
			arr2[i] = imageData.data[i];
		}
		
		return 	{ data: arr2, width: imageData.width, height: imageData.height };
			
	
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


//////////////////////////////////////////// plus /////////////////////////////////////

function plus(img,w,h)
{
	 
		let w2 = w*2;
		let h2 = h*2;
		
		let newpng = [];
		
			for (var y = 0; y < h; y++) {
				
				for (var x = 0; x < w; x++) {
					
					var idx = (w * y + x) << 2;
					
					var new_idx = w2 * (y*2) + (x*2) << 2;
					var new_idx2 = w2 * (y*2+1) + (x*2) << 2;
					
					newpng [new_idx] = img [idx];
					newpng [new_idx+1] = img [idx+1];
					newpng [new_idx+2] = img [idx+2];
					newpng [new_idx+3] = img [idx+3];
					
					newpng [new_idx+4] = img [idx];
					newpng [new_idx+5] = img [idx+1];
					newpng [new_idx+6] = img [idx+2];
					newpng [new_idx+7] = img [idx+3];
					
					newpng [new_idx2] = img [idx];
					newpng [new_idx2+1] = img [idx+1];
					newpng [new_idx2+2] = img [idx+2];
					newpng [new_idx2+3] = img [idx+3];
					
					newpng [new_idx2+4] = img [idx];
					newpng [new_idx2+5] = img [idx+1];
					newpng [new_idx2+6] = img [idx+2];
					newpng [new_idx2+7] = img [idx+3];
					
					
				}
			}
	
	return { data: newpng, width: w2, height: h2 };
}

//////////////////////////////// smooth /////////////////////////////////////////



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
	return { data:im, width:w, height: h };

}

/////////////////////////////////////////// rotate_ff //////////////////////////////////



function rotate_ff( oldpng, oldpng_width, oldpng_height )
{
    var newpng = new PNG({
		
		width: oldpng_width*2,
		height: oldpng_height*2,
		filterType: 4
		
		
		});
	
	
	
	/*****
	
	var r = context.getImageData(0,0,1,1)[0];
	var g = context.getImageData(0,0,1,1)[1];
	var b = context.getImageData(0,0,1,1)[2];
	contextRes.fillStyle = "rgba("+r+","+g+","+b+",255)";
	contextRes.fillRect(0,0,2,2);
	
	*****/
	
	
	var arr_points = [];
	
	var n=0;
	
	for(n=2;n<oldpng_height+2;n++)
	{
		//console.log("---- "+n+" ----");
		var y=n-2;
		for(var x=0;x<n-1;x++)
		{
			//console.log("[x,y]=["+x+","+y+"]");
			
			var idx = (oldpng_width * y + x) << 2;
					
			var new_idx1 = newpng.width * (y*2) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng[idx+3];
			
			var new_idx1 = newpng.width * (y*2) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng[idx+3];
				
			/*****	
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData[0];
			var g = imgData[1];
			var b = imgData[2];
			
			contextRes.fillStyle = "black";//"rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x*2,y*2,2,2);
			
			//console.log([x,y]);
			*****/
			
			arr_points.push([x,y]);
			
			
			y--;
		}
		
		//if(n>=4) break;
		
	}
	
	//return;
	
	
	
	
	
	
	var half_value = arr_points.length;
	

	var w = oldpng_width;
	var h = oldpng_height;
	
	var lim2 = 1;
	var lim4 = 1;
	
	while(true)
	{
	
	y=h-lim4;
	x=lim2;
	while(true)
	{
	
	
		
			/*****
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData[0];
			var g = imgData[1];
			var b = imgData[2];
			contextRes.fillStyle = "black";//"rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x*2,y*2,2,2);
			*****/
			
			var idx = (oldpng_width * y + x) << 2;
					
			var new_idx1 = newpng.width * (y*2) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng[idx+3];
				
			var new_idx1 = newpng.width * (y*2) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng[idx+3];
			
			var new_idx1 = newpng.width * (y*2+1) + (x*2+1) << 2;
			
			newpng.data[new_idx1+0] = 0;// oldpng[idx+0];
			newpng.data[new_idx1+1] = 0;//oldpng[idx+1];
			newpng.data[new_idx1+2] = 0;//oldpng[idx+2];
			newpng.data[new_idx1+3] = 255;//oldpng[idx+3];
	
	
			
			
			arr_points.push([x,y]);
		
		
		x++;
		y--;
		
		if(x>=oldpng_width) break;
	}
	
	lim2++;
			
	if(y>=oldpng_height)	break;	

		if(lim2 > oldpng_width)
		{
			break;
		}
	
	}	
		
	
	// console.log("Data of rotated image inputed");
	
	/******************************************************************************/
	/******************************************************************************/
	/******************************************************************************/
	
	
	
	
	
	
	
	
	
	var w = newpng.width;
	
	
	//**  this only one duxel outputting
	var n=0;
	
	
	var x = arr_points[0][0];
	var y = arr_points[0][1];

	var idx = (oldpng_width * x + y) << 2;
		
    var x1 = w/2-1;			
	var y1=0;
	
	var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
	newpng.data[new_idx1+0] = oldpng[idx+0];
	newpng.data[new_idx1+1] = oldpng[idx+1];
	newpng.data[new_idx1+2] = oldpng[idx+2];
	newpng.data[new_idx1+3] = oldpng[idx+3];
	
	newpng.data[new_idx1+4] = oldpng[idx+0];
	newpng.data[new_idx1+5] = oldpng[idx+1];
	newpng.data[new_idx1+6] = oldpng[idx+2];
	newpng.data[new_idx1+7] = oldpng[idx+3];

	
	n++;
	
	//**** now we take two duxel
	
	y1++;
	x1--;
	
	//
	
	var x = arr_points[n][0];
	var y = arr_points[n][1];
	
	var idx = (oldpng_width * x + y) << 2;
		
    var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
	newpng.data[new_idx1+0] = oldpng[idx+0];
	newpng.data[new_idx1+1] = oldpng[idx+1];
	newpng.data[new_idx1+2] = oldpng[idx+2];
	newpng.data[new_idx1+3] = oldpng[idx+3];
	
	newpng.data[new_idx1+4] = oldpng[idx+0];
	newpng.data[new_idx1+5] = oldpng[idx+1];
	newpng.data[new_idx1+6] = oldpng[idx+2];
	newpng.data[new_idx1+7] = oldpng[idx+3];
	
	
	n++;
	
	var x = arr_points[n][0];
	var y = arr_points[n][1];
	
	var idx = (oldpng_width * x + y) << 2;
	
	var new_idx1 = newpng.width * (y1) + (x1+2) << 2;
	
	newpng.data[new_idx1+0] = oldpng[idx+0];
	newpng.data[new_idx1+1] = oldpng[idx+1];
	newpng.data[new_idx1+2] = oldpng[idx+2];
	newpng.data[new_idx1+3] = oldpng[idx+3];
	
	newpng.data[new_idx1+4] = oldpng[idx+0];
	newpng.data[new_idx1+5] = oldpng[idx+1];
	newpng.data[new_idx1+6] = oldpng[idx+2];
	newpng.data[new_idx1+7] = oldpng[idx+3];

	
		
	//contextRes.fillStyle = "red";//"rgba("+r+","+g+","+b+",255)";
	//contextRes.fillRect(x1+6,y1,2,1);
	

	
	
	
	y1++;
	x1--;
	
	for(j=0;j<3;j++)
	{
		
		
		n++;
	
		var x = arr_points[n][0];
		var y = arr_points[n][1];
		
		var idx = (oldpng_width * x + y) << 2;
		
		var new_idx1 = newpng.width * (y1) + (x1+(j*2)) << 2;
		
		newpng.data[new_idx1+0] = oldpng[idx+0];
		newpng.data[new_idx1+1] = oldpng[idx+1];
		newpng.data[new_idx1+2] = oldpng[idx+2];
		newpng.data[new_idx1+3] = oldpng[idx+3];
		
		newpng.data[new_idx1+4] = oldpng[idx+0];
		newpng.data[new_idx1+5] = oldpng[idx+1];
		newpng.data[new_idx1+6] = oldpng[idx+2];
		newpng.data[new_idx1+7] = oldpng[idx+3];
		
			
		
		
	}
	

	
	var counter=4;
	var exit_cycle=false;
	
	while(true)
	{
		
		y1++;
		x1--;
		
		for(j=0;j<counter;j++)
		{
			
			
			
			
			n++;
			
		//	console.log(n);
		//	console.log(arr_points.length);
		//	if(n >= arr_points.length / 2 ) { exit_cycle=true; break; }
	
			var x = arr_points[n][0];
			var y = arr_points[n][1];
			
			var idx = (oldpng_width * x + y) << 2;




			var new_idx1 = newpng.width * (y1) + (x1+(j*2)) << 2;
			
			newpng.data[new_idx1+0] = oldpng[idx+0];
			newpng.data[new_idx1+1] = oldpng[idx+1];
			newpng.data[new_idx1+2] = oldpng[idx+2];
			newpng.data[new_idx1+3] = oldpng[idx+3];
			
			newpng.data[new_idx1+4] = oldpng[idx+0];
			newpng.data[new_idx1+5] = oldpng[idx+1];
			newpng.data[new_idx1+6] = oldpng[idx+2];
			newpng.data[new_idx1+7] = oldpng[idx+3];
		
		

	
				
		
			
		}
		
		counter++;
		//console.log("counter="+counter);
		if(counter>=newpng.height/2+1) break;
		
	/******
	
		if(exit_cycle==true) break;
		
		console.log("n="+n);
		
		
		
		//if(n >= arr_points.length/2 ) break;
		
	******/	
		
	 
	}
	
	
				
	
	//console.log("n="+n);
	
	//console.log("counter="+counter);
	
	//console.log("x1="+x1);
	//console.log("y1="+y1);
	
	//console.log(arr_points[n]);
	
	

	
	
	
		
	
	//n--;
	
	//var counter=4; counter==half_value
	var exit_cycle=false;
	var lim2=1;
	//y1--;
	var nn=1;
	var lim4=newpng.width-2;
	while(true)
	{
		
		y1++;
		
		
		for(x1=lim2;x1<lim4;x1+=2)
		{
			
			
			
			n++;
			
			
			//console.log(n);
			//console.log(arr_points.length);
			
			 
	
			var x = arr_points[n][0];
			var y = arr_points[n][1];
			
			
			var idx = (oldpng_width * x + y) << 2;




			var new_idx1 = newpng.width * (y1) + (x1) << 2;
			
			newpng.data[new_idx1+0] = oldpng[idx+0];
			newpng.data[new_idx1+1] = oldpng[idx+1];
			newpng.data[new_idx1+2] = oldpng[idx+2];
			newpng.data[new_idx1+3] = oldpng[idx+3];
			
			newpng.data[new_idx1+4] = oldpng[idx+0];
			newpng.data[new_idx1+5] = oldpng[idx+1];
			newpng.data[new_idx1+6] = oldpng[idx+2];
			newpng.data[new_idx1+7] = oldpng[idx+3];
		
			
			
			
			
			
			/****
			
			var imgData = context.getImageData(x,y,1,1);
			var r = imgData[0];
			var g = imgData[1];
			var b = imgData[2];
				
			contextRes.fillStyle = "rgba("+r+","+g+","+b+",255)";
			contextRes.fillRect(x1,y1,2,1);
			
			*****/
			
			//	 { exit_cycle=true; break; }
			
			
			
			
			
			
			
	
	
		
			
		}
		
	
	
	
		lim2++;
		lim4--;
		
		if(exit_cycle==true) break;
		
		//counter--;
		
		//x1 = nn++;
		
		//if(counter>=canvasRes.height/2) break;
		
		if(lim2>oldpng_height) { exit_cycle=true; break; }
		
		//if(nn>canvas.height-1) { exit_cycle=true; break; }
		
		if(lim4 < 0) break;

		//if(n>=arr_points.length-1) break;
		
	}
	
		
	return { data: newpng.data, width: newpng.width, height: newpng.height };
	
	/********
 
	
	
	
		
	canvas.width = canvasRes.width;
	canvas.height = canvasRes.height;
	canvas.getContext("2d").putImageData(canvasRes.getContext("2d").getImageData(0,0,canvasRes.width,canvasRes.height),0,0);
	
	
	
	*****/
	
	
	
	
}


////////////////////////////////////////// combo ////////////////////////////////////////////////

function slozhenie_cvetov(a,b)
{
	var c = 0;
	
	if((a+b) > 255) c = (a+b) - 255;
	else c = (a+b);
	
	c /= 2;
	
	return c;
}	

function combo( old_png, big_image ) {

		if((old_png.width % 2 == 0) && (big_image.width % 2 ==  0))
				{
					//even
					if(old_png.width > big_image.width)
					{
						
						
						
						var result_png = new PNG ( {
							
								width: old_png.width,
								height: old_png.height,
								filterType: 4
						} );
						

						var t4 = (old_png.width-big_image.width)/2;
						var k4 = (old_png.height-big_image.height)/2;
						
						
						
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								if( (i>=t4) && (i<(t4+big_image.width)) && (j>=k4) && (j<(k4+big_image.height))	)
								{
									
									
									
									var idx = (old_png.width * j + i) << 2;
									
									var n=i-t4;
									var m=j-k4;
									
									var new_idx1 = big_image.width * m + n << 2;
							
									result_png.data[idx+0] = slozhenie_cvetov( big_image.data[new_idx1+0], old_png.data[idx+0] );
									result_png.data[idx+1] = slozhenie_cvetov( big_image.data[new_idx1+1], old_png.data[idx+1] );
									result_png.data[idx+2] = slozhenie_cvetov( big_image.data[new_idx1+2], old_png.data[idx+2] );
									result_png.data[idx+3] = 255;
									
									
									
								}
								else
								{
									
									
									var idx = (old_png.width * j + i) << 2;
									
									result_png.data[idx+0] = old_png.data[idx+0];
									result_png.data[idx+1] = old_png.data[idx+1];
									result_png.data[idx+2] = old_png.data[idx+2];
									result_png.data[idx+3] = 255;
									
								}
							}
						}
						
						
						
						
						

					}
					else
					{
						
						var result_png = new PNG ( {
							
								width: big_image.width,
								height: big_image.height,
								filterType: 4
						} );
						
						
						
						
						
						var t4 = (big_image.width-old_png.width)/2;
						var k4 = (big_image.height-old_png.height)/2;
						
						
						
						for(var j=0;j<big_image.height;j++)
						{
							for(var i=0;i<big_image.width;i++)
							{
								if( (i>=t4) && (i<(t4+old_png.width)) && (j>=k4) && (j<(k4+old_png.height))	)
								{
									
									
									
									var idx = (big_image.width * j + i) << 2;
									
									var n=i-t4;
									var m=j-k4;
									
									var new_idx1 = old_png.width * m + n << 2;
							
									result_png.data[idx+0] = slozhenie_cvetov( big_image.data[idx+0], old_png.data[new_idx1+0] );
									result_png.data[idx+1] = slozhenie_cvetov( big_image.data[idx+1], old_png.data[new_idx1+1] );
									result_png.data[idx+2] = slozhenie_cvetov( big_image.data[idx+2], old_png.data[new_idx1+2] );
									result_png.data[idx+3] = 255;
									
									
									
								}
								else
								{
									
									
									var idx = (big_image.width * j + i) << 2;
									
									result_png.data[idx+0] = big_image.data[idx+0];
									result_png.data[idx+1] = big_image.data[idx+1];
									result_png.data[idx+2] = big_image.data[idx+2];
									result_png.data[idx+3] = 255;
									
								}
							}
						}
						
						
						
						
					}
					
					//global_memory.splice(nm1,1);		
					//global_memory.splice(nm2,1);
					
					//sendImage(result_png,res,'\nImages combined\n');
					
				return { data: result_png.data, width: result_png.width, height: result_png.height }
					
					
					
				}
				else if ((old_png.width % 2 == 1) && (big_image.width % 2 ==  1))
				{
					//odd
					if(old_png.width > big_image.width)
					{
						
						
						var result_png = new PNG ( {
							
								width: old_png.width,
								height: old_png.height,
								filterType: 4
						} );
						
						var middle_of_bigger_w = old_png.width / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_w = big_image.width / 2 | 0;   //for 5   2      0 1 [2] 3 4
						
						var begin_w = middle_of_bigger_w - middle_of_smaller_w;
						var end_w = begin_w + big_image.width; //and (not include) end
						
						var middle_of_bigger_h = old_png.height / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_h = big_image.height / 2 | 0; 
						
						var begin_h = middle_of_bigger_h - middle_of_smaller_h;
						var end_h = begin_h + big_image.height; 	
						
						
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								var idx = (old_png.width * j + i) << 2;	
								
								if((i>= begin_w) && (i<end_w) && (j>=begin_h) && (j<end_h))
								{
								
									var n =	i - begin_w;
									var m = j - begin_h;
									
									var idx2 = big_image.width * m + n << 2;
									
									result_png.data[idx+0] = slozhenie_cvetov( big_image.data[idx2+0], old_png.data[idx+0] );
									result_png.data[idx+1] = slozhenie_cvetov( big_image.data[idx2+1], old_png.data[idx+1] );
									result_png.data[idx+2] = slozhenie_cvetov( big_image.data[idx2+2], old_png.data[idx+2] );
									result_png.data[idx+3] = 255;
									
									
								}
								else
								{
								
									result_png.data[idx+0] = old_png.data[idx+0];
									result_png.data[idx+1] = old_png.data[idx+1];
									result_png.data[idx+2] = old_png.data[idx+2];
									result_png.data[idx+3] = 255;
								}
							}
						}
						
						
						
						
					}
					else
					{
						
						var result_png = new PNG ( {
							
								width: big_image.width,
								height: big_image.height,
								filterType: 4
						} );
						
						var middle_of_bigger_w = big_image.width / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_w = old_png.width / 2 | 0;   //for 5   2      0 1 [2] 3 4
						
						var middle_of_bigger_h = big_image.height / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_h = old_png.height / 2 | 0; 
						
						var begin_w = middle_of_bigger_w - middle_of_smaller_w;
						var end_w = begin_w + old_png.width; //and (not include) end
						
						var begin_h = middle_of_bigger_h - middle_of_smaller_h;
						var end_h = begin_h + old_png.height; 	
					
						for(var j=0;j<big_image.height;j++)
						{
							for(var i=0;i<big_image.width;i++)
							{
								var idx = (big_image.width * j + i) << 2;	
								
								if((i>= begin_w) && (i<end_w) && (j>=begin_h) && (j<end_h))
								{
									
									var n =	i - begin_w;
									var m = j - begin_h;
									
									var idx2 = old_png.width * m + n << 2;
									
									result_png.data[idx+0] = slozhenie_cvetov( old_png.data[idx2+0], big_image.data[idx+0] );
									result_png.data[idx+1] = slozhenie_cvetov( old_png.data[idx2+1], big_image.data[idx+1] );
									result_png.data[idx+2] = slozhenie_cvetov( old_png.data[idx2+2], big_image.data[idx+2] );
									result_png.data[idx+3] = 255;
									
									
								}
								else
								{
									
									
									result_png.data[idx+0] = old_png.data[idx+0];
									result_png.data[idx+1] = old_png.data[idx+1];
									result_png.data[idx+2] = old_png.data[idx+2];
									result_png.data[idx+3] = 255;
								}
							}
						}
					}
					
					
					
					//global_memory.splice(nm1,1);
					//global_memory.splice(nm2,1);
					//sendImage(result_png,res,'\nImages combined\n');
					
					return { data: result_png.data, width: result_png.width, height: result_png.height }
					
					
					
					
					
				}
				else  
				{
					
					error( req, res, "combo: error: odd first image but even second image. need both odd or even");
					
					return null; //need error processing or blank image???
				}
				
		
		
//	});
	
	
}
	
/////////////////////////////////////////// fill ////////////////////////////////////////////////

 
function getColDec( cccol, cccol1 )
	{
		var cccol2=0;
		if(cccol+cccol1>255) cccol2=    ((cccol+cccol1)-255)+10;
		else cccol2=cccol+cccol1;
		return cccol2;
	}
	
function fill(small_image, big_image) {
 
		 
		if(big_image.width * small_image.width > 1600 || big_image.height *  small_image.height > 1600 )
		{
			console.log("fill: error: too big size (need result width * height <= 1200)");
			return null;
		
			
		}
					var newpng = new PNG ( {
						
							width: big_image.width * small_image.width,
							height: big_image.height * small_image.height,
							filterType: 4
					} );
					
		 
		for (var y = 0; y < big_image.height; y++) {
				
				for (var x = 0; x < big_image.width; x++) {
					
					
					var idxBig = ( big_image.width * y + x ) << 2;
					
					
					for (var m = 0; m < small_image.height; m++) {
						
						for (var n = 0; n < small_image.width; n++) {
							
								var idxSim = ( small_image.width * m + n ) << 2;
								
								k=x*small_image.width+n;
								p=y*small_image.height+m;
								var idxRes = newpng.width*p + k << 2;
								
								newpng.data[idxRes+0] = getColDec( big_image.data[idxBig+0] , small_image.data[idxSim+0]);
					
								newpng.data[idxRes+1] = getColDec( big_image.data[idxBig+1] , small_image.data[idxSim+1]);
								
								newpng.data[idxRes+2] = getColDec( big_image.data[idxBig+2] , small_image.data[idxSim+2]);
								
								newpng.data[idxRes+3] = 255;
								
						}
					}
					
					
				}
			}

			
		 
		 	return { data: newpng.data, width: newpng.width, height: newpng.height }
					
				
}
	
//////////////////////////////////// mirror_right ////////////////////////////////////////	
	

function mirror_right(imageData, w, h)
{
		
		
		// var newpng = new PNG ( {
			
				// width: imageData.width*2,
				// height: imageData.height,
				// filterType: 4
		// } );
		
		let newpng= [];
		let nw = w*2;
		let nh = h;
		
		

			for (var y = 0; y < nh; y++) {
				
				n=0;
				for (var x = 0; x < nw; x++) {
					
					var idx=null; 
					var new_idx1 = nw * y + x << 2;
					if(x < w)
					{
					
						idx = (w * y + x) << 2;
						
						newpng[new_idx1+0] = imageData[idx+0];
						newpng[new_idx1+1] = imageData[idx+1];
						newpng[new_idx1+2] = imageData[idx+2];
						newpng[new_idx1+3] = imageData[idx+3];
						n++;
					}
					else
					{
						idx = (w * y + (n-1)) << 2;
						
						newpng[new_idx1+0] = imageData[idx+0];
						newpng[new_idx1+1] = imageData[idx+1];
						newpng[new_idx1+2] = imageData[idx+2];
						newpng[new_idx1+3] = imageData[idx+3];
						
						n--;

					}
					
					
					
				}
				
			}
			
			//return newpng;
			return { data:newpng, width: nw, height: nh };
			
}

///////////////////////////////////// mirror_down /////////////////////



function mirror_down(imageData, w, h)
{
		let newpng = [];
		let nw = w;
		let nh = h*2;
	
		
		var m=0;
		
		for (var x = 0; x < nw; x++) {
			
			m=0;
			
			for (var y = 0; y < nh; y++) {
				
				
				
					
					var idx = 0;
					
					var new_idx1 = nw * y + x << 2;
					
					if(y < h)
					{
					
						idx = (w * y + x) << 2;
						
						newpng[new_idx1+0] = imageData[idx+0];
						newpng[new_idx1+1] = imageData[idx+1];
						newpng[new_idx1+2] = imageData[idx+2];
						newpng[new_idx1+3] = imageData[idx+3];
						m++;
					}
					else
					{
						idx = (w * (m-1) + x) << 2;
						
						newpng[new_idx1+0] = imageData[idx+0];
						newpng[new_idx1+1] = imageData[idx+1];
						newpng[new_idx1+2] = imageData[idx+2];
						newpng[new_idx1+3] = imageData[idx+3];
						
						m--;

					}
					
					
					
				}
				
			}
			
			return { data:newpng, width: nw, height: nh };
			
}

/////////////////////////////// both axes minus ////////////////////////


function bothAxesMinus(im0, w, h)
{
	 
	
		var n=0;
		var m=0;
		
		var x1=0;
		var x2=0;
		var w1=0;
		var w2=0;
		var y1=0;
		var y2=0;
		var h1=0;
		var h2=0;
		
		if( w%2 == 0  )
		{
			x1=0;
			w1=w/2;
			x2=w/2+1;
			w2= w-1;
			
		}
		else if( w%2 == 1  ) 
		{
			x1=0;
			w1=(w/2|0);
			x2=(w/2|0)+1;
			w2 = w-1; 
		}
		
		if(h%2 == 0) 
		{  
			y1=0;
			h1=h/2;
			y2=h/2+1;
			h2=h/2-1;
			h2=h-1;
	
		}
		else if(h%2 == 1)
		{

			y1=0;
			h1=(h/2|0);
			y2=(h/2|0)+1;
			h2=(h/2|0);
			h2=h-1;
			
			
		}
		
	
	// var im = new PNG ( {
			
				// width: w-1,
				// height: h-1,
				// filterType: 4
		// } );
		
		let nwidth = w-1;
		let nheight = h-1;
		let im = [];
			
			for (var y = 0; y < nheight; y++) {
				
				
				
				for (var x = 0; x < nwidth; x++) {
					
								
					var idx = (nwidth * y + x) << 2;
					
					
					
						im[idx] = 255;
						im[idx+1] = 255;
						im[idx+2] = 255;
						im[idx+3] = 255;
						
					
					
					
				}
				
				
			}
		
		

		//left top
		//	var mm=0;
			for (var y = y1; y < h1; y++) {
				
				
				//var nn=0;
				for (var x = x1; x < w1; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = nwidth * y + x << 2;
					
				//	nn++;
					

					
						im[new_idx] = im0[idx];
						im[new_idx+1] =  im0[idx+1];
						im[new_idx+2] =  im0[idx+2];
						im[new_idx+3] =  im0[idx+3];
						
					
					
					
				}
			//	mm++;
				
			}
			
			
		
		
			//var mm=0;
			for (var y = y1; y < h1; y++) {
				
				
				var nn=x2-1;
				for (var x = x2; x < w; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = nwidth * y + nn << 2;
					
					
					

					
						im[new_idx] = im0[idx];
						im[new_idx+1] =  im0[idx+1];
						im[new_idx+2] =  im0[idx+2];
						im[new_idx+3] =  im0[idx+3];
						
					nn++;
					
					
				}
			//	mm++;
				
			}
				
			
			var mm=y2-1;
			for (var y = y2; y < h; y++) {
				
				
				//var nn=0;
				for (var x = x1; x < w1; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = nwidth * mm + x << 2;
					
				//	nn++;
					

					
						im[new_idx] = im0[idx];
						im[new_idx+1] =  im0[idx+1];
						im[new_idx+2] =  im0[idx+2];
						im[new_idx+3] =  im0[idx+3];
						
					
					
					
				}
				mm++;
				
			}
			
			
			
		
			
			var mm=y2-1;
				for (var y = y2; y < h; y++) {
				
				
				var nn=x2-1;
				for (var x = x2; x < w; x++) {
					
								
					var idx = (w * y + x) << 2;
					
					var new_idx = nwidth * mm + nn << 2;
					
					
					

					
						im[new_idx] = im0[idx];
						im[new_idx+1] =  im0[idx+1];
						im[new_idx+2] =  im0[idx+2];
						im[new_idx+3] =  im0[idx+3];
						
					nn++;
					
					
				}
				mm++;
				
			}
			
			
			
			return { data:im, width: nwidth, height:nheight };
 
			
			
}

/////////////////////// border minus ///////////////////////////


function border_minus(source_png, w, h) {

	let nw = w-2; 
	let nh = h-2;
	var newpng = [];



	for (var y = 1; y < h-1; y++) {
		
		for (var x = 1; x < w-1; x++) {
			
			var idx = w * y + x << 2;
			
			var new_idx1 = nw * (y-1) + (x-1) << 2;
			
			newpng[new_idx1+0] = source_png[idx];
			newpng[new_idx1+1] = source_png[idx+1];
			newpng[new_idx1+2] = source_png[idx+2];
			newpng[new_idx1+3] = source_png[idx+3];
			
		}
		
	}
	
	return { data:newpng, width: nw, height: nh };

}

/////////////////////// median ////////////////////////////////////////



function median ( data, w, h) {
/********************* for oddd -----------

=========================
mod_median.js:25 w=9   w+1=10    (w+1)/2=5
mod_median.js:26 w-n=4  (w-n)/2=2
mod_median.js:24 =========================
mod_median.js:25 w=11   w+1=12    (w+1)/2=6
mod_median.js:27 w-(n+1)=4  (w-(n+1))/2=2
mod_median.js:24 =========================
mod_median.js:25 w=13   w+1=14    (w+1)/2=7
mod_median.js:26 w-n=6  (w-n)/2=3
mod_median.js:24 =========================
mod_median.js:25 w=15   w+1=16    (w+1)/2=8
mod_median.js:27 w-(n+1)=6  (w-(n+1))/2=3
mod_median.js:24 =========================

****************************************/
	
	//var canvas = document.getElementById("canvas");
	//var context = canvas.getContext("2d");
	
//	var w = im.width;
//	var h = im.height;
	
	
	
	if( h == 1 || w==1 )
	{
		
		//errror("mod_median: median: error: too small size (need result height > 1 || width > 1)");
		return -1;
		
	}
	
	if (w%2==1)
	{
	
		var x0 = 0;
		
		var n = (w+1)/2;
		if(n%2==1)
		{
			var xlength = n;
			x0 = (w-xlength)/2;
		}
		else
		{
			var xlength = (n+1);
			x0 = (w-xlength)/2;
		}
		
		
		// console.log("w-n="+(w-n)+"  (w-n)/2="+((w-n)/2));
		// if(n%2==0) console.log("w-(n+1)="+(w-(n+1))+"  (w-(n+1))/2="+((w-(n+1))/2));
	
	}
	else
	{
		var x0 = 0;
		
		var n = w/2;
		if(w%4==0)
		{
			var xlength = w/2;
			x0 = w/4;
		}
		else
		{
			var xlength = (n+1);
			x0 = (w-xlength)/2;
		}
		
	}
	
	if (h%2==1)
	{
	
		var y0 = 0;
		
		var m = (h+1)/2;
		if(m%2==1)
		{
			var ylength = m;
			y0 = (h-ylength)/2;
		}
		else
		{
			var ylength = (m+1);
			y0 = (h-ylength)/2;
		}
		
		
		// console.log("w-n="+(w-n)+"  (w-n)/2="+((w-n)/2));
		// if(n%2==0) console.log("w-(n+1)="+(w-(n+1))+"  (w-(n+1))/2="+((w-(n+1))/2));
	
	}
	else
	{
		var y0 = 0;
		
		var m = h/2;
		if(h%4==0)
		{
			var ylength = h/2;
			y0 = h/4;
		}
		else
		{
			var ylength = (m+1);
			y0 = (h-ylength)/2;
		}
	}
	
	// var newpng = new PNG ( {
			
				// width: xlength,
				// height: ylength,
				// filterType: 4
		// } );
		
		let newpng_width = xlength;
		let newpng = [];
		
		var m=0;
		var n=0;
			for (var y = y0; y < ylength*2; y++) {
				n=0;
				for (var x = x0; x < xlength*2; x++) {
					var idx = (w * y + x) << 2;
					var idx2 = (newpng_width * m + n) << 2;
					
				
					newpng[idx2] = data[idx];
					newpng[idx2+1] = data[idx+1];
					newpng[idx2+2] = data[idx+2];
					newpng[idx2+3] = data[idx+3];
					n++;
				}
				m++;
			}
			
	
	 
	console.log("for w="+w+" h=" + h + " median()=[ from x0="+x0+"   y0="+y0+"   xlength="+xlength+"   ylength="+ylength+ "] ");
	
	return { data:newpng, width:xlength,height:ylength};
	 		
}

/////////////////////////// minus //////////////////////////////////////

function minus(img,w,h)
{
	 
		let w2 = w/2|0;
		let h2 = h/2|0;
		
		let newpng = [];
		
			for (var y = 0; y < h; y+=2) {
				
				for (var x = 0; x < w; x+=2) {
					
					var idx = (w * y + x) << 2;
					
					var new_idx = w2 * (y/2) + (x/2) << 2;
					 
					
					newpng [new_idx] = img [idx];
					newpng [new_idx+1] = img [idx+1];
					newpng [new_idx+2] = img [idx+2];
					newpng [new_idx+3] = img [idx+3];
					
					 
					
				}
			}
	
	return { data:newpng, width:w2, height:h2 };
}
		
	
 
