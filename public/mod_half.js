function client_vertical_half(params, callback) {
console.log('In client_vertical_half(...)');
		
	
	ident("canvas", 'ident', function(data2)  {
					
					
					var md5=data2;
				//	console.log('md5='+md5);
					
					var w = document.getElementById("canvas").width;
					var h = document.getElementById("canvas").height;
					var x = 0;
					var y = h/2;
	
	if( ( w%2==1) && (h%2==1) )
	{
		y = (h/2|0)+1;
		
	}
	else if( ( w%2==0) && (h%2==0) )
	{
		y = h/2;
		
	}
	else {
		alert("w!=h");
		return;
	}
	var croping_lt=1;
	
	var flag = croping_lt;
					
		  
		var params = 'x='+x+'&y='+y+'&w='+w+'&h='+h+'&flag='+flag+'&md5='+encodeURIComponent(md5);		
		console.log(params);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/precrop', true);
		//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		xhr.onload = function(e) {  
			
				if (xhr.readyState != 4) return;
				
				if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; throw new Error(error);  }

				 
				
				transform("canvas",'/crop',callback);
			
	}

	xhr.send(params);
	
	
	
	});
	
	 
}

function client_horizontal_half(params, callback) {
	
	console.log('In client_horizontal_half(...)');
		
	
	ident("canvas", 'ident', function(data2)  {
					
					
					var md5=data2;
				//	console.log('md5='+md5);
					
					var w = document.getElementById("canvas").width;
					var h = document.getElementById("canvas").height;
					var x = w/2;
					var y = 0;
	
	if( ( w%2==1) && (h%2==1) )
	{
		x = (w/2|0)+1;
		
	}
	else if( ( w%2==0) && (h%2==0) )
	{
		x = w/2;
		
	}
	else {
		alert("w!=h");
		return;
	}
	var croping_lt=1;
	
	var flag = croping_lt;
					
		  
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

function half(im)
{
	var w = im.width;
	var h = im.height;
	
	if( ( w%2==1) && (h%2==1) )
	{
		var nw = (w/2|0)+1;
		var nh = (h/2|0)+1;	
		
		
		
	}
	else if( ( w%2==0) && (h%2==0) )
	{
		var nw = w/2;
		var nh = h/2;	
		
	}
	else if( ( w%2==1) && (h%2==0) )
	{
		
	}
	else if( ( w%2==0) && (h%2==1) )
	{
		
	}
	
	return getSomePart(im, nw, nh);
	
	
	
	
}


function getSomePart(im, nw, nh)
{
	
	var newpng = new PNG ( {
			
				width: nw,
				height: nh,
				filterType: 4
		} );
		
		
			for (var y = 0; y < newpng.height; y++) {
				
			
				for (var x = 0; x < newpng.width; x++) {
					
					
					
						var idx = (im.width * y + x) << 2;
						var idx1 = (nw * y + x) << 2;
						newpng.data[idx1+0] = im.data[idx+0];
						newpng.data[idx1+1] = im.data[idx+1];
						newpng.data[idx1+2] = im.data[idx+2];
						newpng.data[idx1+3] = im.data[idx+3];
						
					}
		
				}
	
	
	return newpng;
	
	
	
	
}



/*
function mirror_right(imageData)
{
		
		
		var newpng = new PNG ( {
			
				width: imageData.width*2,
				height: imageData.height,
				filterType: 4
		} );
		
		

			for (var y = 0; y < newpng.height; y++) {
				
				n=0;
				for (var x = 0; x < newpng.width; x++) {
					
					var idx=null; 
					var new_idx1 = newpng.width * y + x << 2;
					if(x < imageData.width)
					{
					
						idx = (imageData.width * y + x) << 2;
						
						newpng.data[new_idx1+0] = imageData.data[idx+0];
						newpng.data[new_idx1+1] = imageData.data[idx+1];
						newpng.data[new_idx1+2] = imageData.data[idx+2];
						newpng.data[new_idx1+3] = imageData.data[idx+3];
						n++;
					}
					else
					{
						idx = (imageData.width * y + (n-1)) << 2;
						
						newpng.data[new_idx1+0] = imageData.data[idx+0];
						newpng.data[new_idx1+1] = imageData.data[idx+1];
						newpng.data[new_idx1+2] = imageData.data[idx+2];
						newpng.data[new_idx1+3] = imageData.data[idx+3];
						
						n--;

					}
					
					
					
				}
				
			}
			
			return newpng;
			
}

function mirror_down(imageData)
{

	var newpng = new PNG ( {
			
				width: imageData.width,
				height: imageData.height*2,
				filterType: 4
		} );
		
		var m=0;
		
		for (var x = 0; x < newpng.width; x++) {
			
			m=0;
			
			for (var y = 0; y < newpng.height; y++) {
				
				
				
					
					var idx = 0;
					
					var new_idx1 = newpng.width * y + x << 2;
					
					if(y < imageData.height)
					{
					
						idx = (imageData.width * y + x) << 2;
						
						newpng.data[new_idx1+0] = imageData.data[idx+0];
						newpng.data[new_idx1+1] = imageData.data[idx+1];
						newpng.data[new_idx1+2] = imageData.data[idx+2];
						newpng.data[new_idx1+3] = imageData.data[idx+3];
						m++;
					}
					else
					{
						idx = (imageData.width * (m-1) + x) << 2;
						
						newpng.data[new_idx1+0] = imageData.data[idx+0];
						newpng.data[new_idx1+1] = imageData.data[idx+1];
						newpng.data[new_idx1+2] = imageData.data[idx+2];
						newpng.data[new_idx1+3] = imageData.data[idx+3];
						
						m--;

					}
					
					
					
				}
				
			}
			
			return newpng;
}

*/