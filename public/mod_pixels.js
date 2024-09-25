//-------------------------------------------------------------------
//---------------------  SHOW PIXELS FUNCTIONS ----------------------
//-------------------------------------------------------------------
var glob_x_left_top = null;
var glob_y_left_top = null;
var glob_pg_main_color = null;
var glob_showing_scale_div = false;
var glob_scale_div = null;

function whenClickedOnCanvas(e)
{
			
	evt = (e) ? e : event;   
	if(evt.button == 0) 
	{
		
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		glob_x_left_top = x;
		glob_y_left_top = y;
						
		var context = e.target.getContext("2d");
		var imageData = context.getImageData(x,y,1,1);
			
		global_pg_main_color = ""+imageData.data[0]+","+imageData.data[1]+","+imageData.data[2]+","+imageData.data[3];
		
		showScaleDiv(e.target,x,y);
		redrawPixels_main(context, x,y);
		
	}
			
}	
		
function setEventListenersOnPixels()
		{
			var pcnv = document.getElementById("pixels");
			pcnv.onclick = function(e)
			{
				//var el = document.getElementById("fixed");
				//if(el.innerHTML == ' FIXED ')
				{
					e = (e) ? e : event;   
					if(e.button == 2) return;
						
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
					glob_x_left_top += n;
					glob_y_left_top += m;
					
					redrawPixels_main(document.getElementById("canvas").getContext("2d"),  glob_x_left_top, glob_y_left_top );
				//	updatePatternProps();
					
				}
			}
		
			pcnv.onmousemove = function(e)
			{
					e = (e) ? e : event;   
								
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
				//	updatePatternProps(x_left_top + n, y_left_top + m);
				
				
			}
		}
		
		
		
function initModPixels()
{
	var scale_div = document.getElementById('scale_div');
	scale_div.style.visibility = 'hidden'; //visible
		
	setEventListenersOnTri_Btns();
	setEventListenersOnPixels();
}		
		
function showScaleDiv(target,x,y)
{
	
	var el = document.getElementById('scale_div');
	el.style.border = "";
    el.style.visibility='visible';
	el.style.display="inline-block";
	document.getElementById('canvas_width_height').innerHTML = ""+document.getElementById('canvas').width+" x "+document.getElementById('canvas').height;
	//el.style.position='fixed';
	//el.style.left="200px";
	//el.style.top="200px";
	document.getElementById('selected_x_y').innerHTML = ""+x+", "+y;
	
}

var global_color_of_point = null;

function setEventListenersOnTri_Btns()
{
		var btn = document.getElementById("btn_lt");
		btn.onclick = function()
		{
			
			server_crop(glob_x_left_top,glob_y_left_top,1);
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			
			
		}
		
		btn = document.getElementById("btn_rb");
		btn.onclick = function()
		{
			
			server_crop(glob_x_left_top,glob_y_left_top,2);
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			
		}
		
		var btn = document.getElementById("btn_esc");
		btn.onclick = function()
		{
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden'; //visible
		
		}
		
		btn = document.getElementById("btn_copy_color_of_point");
		btn.onclick = function()
		{
			var canvas2 = document.getElementById("canvas");
			let w = canvas.width;
			let h = canvas.height;
			var context2 = canvas2.getContext("2d");
			var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
			var color2 = getColorArrayFromImageData(  imgData2, glob_x_left_top,glob_y_left_top);
			global_color_of_point = color2;
		}
		
		btn = document.getElementById("btn_fill_point_by_color_of_point");
		btn.onclick = function()
		{
			if(global_color_of_point==null) return;
			var canvas2 = document.getElementById("canvas");
			let w = canvas.width;
			let h = canvas.height;
			var context2 = canvas2.getContext("2d");
			var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
			imgData2 = fillRectangleFast(imgData2, glob_x_left_top,glob_y_left_top, 1, 1, global_color_of_point );
			
			var canv = document.createElement("canvas");
	canv.id = 'temp_canv';
	canv.width = canvas2.width;
	canv.height = canvas2.height;
	canv.getContext("2d").putImageData(imgData2,0,0);
	document.body.appendChild(canv);
			
			
		}
		
		btn = document.getElementById("btn_remove_part");
		btn.onclick = function()
		{
			alert('remove part pressed');
			var canvas2 = document.getElementById("canvas");
			let w = canvas.width;
			let h = canvas.height;
			var context2 = canvas2.getContext("2d");
			var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
			var color2 = getColorArrayFromImageData(  imgData2, glob_x_left_top,glob_y_left_top);
			console.log(color2);
	
			var arr7 = [];
			var arr4 = [];
			var arr = dummy_fast("canvas",glob_x_left_top,glob_y_left_top,1);
			
			var arr2 = arr[1];
			var colors = [];
			for(let i=0;i<arr2.length;i++) {

				let x0 = arr2[i][0];
				let y0 = arr2[i][1];
				
				var neigh = getWHDNeighbors(x0, y0, 1, 1,w,h);
								
								for(var ii=0;ii<neigh.length;ii++)
								{
									var x2 = neigh[ii][0];
									var y2 = neigh[ii][1];
											 
									var color4 = getColorArrayFromImageData(  imgData2, x2, y2 );
									arr4.push(color4);
								}
				
			}
			
			var arr5 = [];
			for(let j=0;j<arr4.length;j++) {
				if(compareColors(arr4[j],color2)) continue;
				let ind = getIndexOfColors(arr5, arr4[j]);
				if(ind == -1) arr5.push(arr4[j]);
			}
			console.log(arr5);
			
			if(arr5.length==1) {
				addCanvas_post_bubabu(arr2 ,arr5[0]);
			} else {
				alert('Cant. Too many colors on borders');
			}
			
			///////////
			// here some kind of bug
			//arr7 = uniqColorsBy(arr4, JSON.stringify); 
			// ///// found 04 12 2021 at 22 55
			////////////////////////
		}

}


function getIndexOfColors (colors , color )
{
	for(var i=0;i<colors.length;i++)
	{
		//var obj=colors_sizes[i];
		if(compareColors(colors[i],color)==true)
		{
			return i;
		}
	}
	return -1;
}

function fillRectangleFast(imgData2, x2, y2, n, m, col )
{
	
	for(var j=y2;j<y2+m;j++)
	{
		for(var i=x2;i<x2+n;i++)
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


function addCanvas_post_bubabu(arr,color)
{
	var canvas2 = document.getElementById("canvas");
	var context2 = canvas2.getContext("2d");	
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	for(var j=0;j<arr.length;j++)
	{
		var x2=arr[j][0];
		var y2=arr[j][1];
			
		imgData2 = fillRectangleFast(imgData2, x2, y2, 1, 1, color);	
			
	}
	//context2.putImageData(imgData2,0,0);
	
	var canv = document.createElement("canvas");
	canv.id = 'temp_canv';
	canv.width = canvas2.width;
	canv.height = canvas2.height;
	canv.getContext("2d").putImageData(imgData2,0,0);
	document.body.appendChild(canv);
	
}

function redrawPixels_main(context, x,y)
{
	var c2 = document.getElementById("pixels");
	c2.width = 150;  //(img_width * m) + (img_width - 1)*p;
	c2.height = 150; //(img_height * m) + (img_height - 1)*p;

	var ctx = c2.getContext("2d");
	
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,c2.width,c2.height);
	
	for(var i=-7;i<	8;i++)
	{
		for(var j=-7;j<	8;j++)
		{
			
			
			var imageData = context.getImageData(x+i,y+j,1,1);
			
			ctx.fillStyle = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
			if(i==0 && j==0) ctx.fillStyle = "red";
			ctx.fillRect((i+7)*10, (j+7)*10, 10, 10);
			
			
		}
	}
	
	document.getElementById('selected_x_y').innerHTML = ""+x+", "+y;
	
}


function crop(x,y,flag)
{
	
	
	var sx,sy,w,h;
	var canvas =  document.getElementById("canvas");
	
	if(flag == 1)
	{
		sx = x;
		sy = y;
		w = canvas.width - sx;
		h = canvas.height - sy;
	}
	else
	{
		sx = 0;
		sy = 0;
		w = x+1;
		h = y+1;
	}
	
	
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(sx, sy, w, h);
	
	///////
	//var buffer = imageData.data.buffer;  // ArrayBuffer
	//////
	
	canvas.width = w;
	canvas.height = h;
	canvas.getContext("2d").putImageData(imageData,0,0);
	
	/*********
	var imageData = context.createImageData(w, h);
	imageData.data.set(buffer);
	
	var params = [];
			
	params['x']= x;
	params['y']= y;
	params['flag']= flag;
	params['imgdata_base64']= dataurl;
			
	sendPostWithParametersOnServer( params ); 
	*********/
	
}


function sendPostWithParametersOnServer( action, params  )
{
	
				
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', action, true);
	//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = "blob";
	
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }

			/*******
    
            var buffer = xhr.response;
            var dataview = new DataView(buffer);
            var ints = new Uint8ClampedArray(buffer.byteLength);
            for (var i = 0; i < ints.length; i++) {
                ints[i] = dataview.getUint8(i);
            }
			
			alert(ints[10]);
			
			************/
            var blob = xhr.response;
			getImageFromBlob( blob, function( img ) {	imageToCanvas( img, "canvas" ); } );
			
	}

	xhr.send(params);
	
}


function server_crop(x,y,flag,callback)
{
	console.log('In server_crop(...)');
	
	ident("canvas", 'ident', function(data2){
					
					
					var md5=data2;
				//	console.log('md5='+md5);
					
					
		var canvas =  document.getElementById("canvas");

		var w = canvas.width;
		var h = canvas.height;
		var params = 'x='+x+'&y='+y+'&w='+w+'&h='+h+'&flag='+flag+'&md5='+encodeURIComponent(md5);		
		console.log(params);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/precrop', true);
		//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		xhr.onload = function(e) {  
			
				if (xhr.readyState != 4) return;
				
				if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; throw new Error(error);  }

				/*******
		
				var buffer = xhr.response;
				var dataview = new DataView(buffer);
				var ints = new Uint8ClampedArray(buffer.byteLength);
				for (var i = 0; i < ints.length; i++) {
					ints[i] = dataview.getUint8(i);
				}
				
				alert(ints[10]);
				
				************/
				
				transform("canvas",'/crop',callback);
			
	}

	xhr.send(params);
	
	
	
	});
	
}

