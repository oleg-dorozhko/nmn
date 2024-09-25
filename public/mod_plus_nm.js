function client_plus_nm( params, callback )
{
	ident("canvas", 'ident', function(data2) {
					
					
					var md5=data2;
				//	console.log('md5='+md5);
			
			var n = prompt("Enter size of seed");
			if(n==null) return;
			n = Number(n);
			if(n<0) return;
			if(n>21) return;	
			
			var m = prompt("Enter size of seed");
			if(m==null) return;
			m = Number(m);
			if(m<0) return;
			if(m>21) return;	
			
			var args = 'md51='+encodeURIComponent(md5)+'&n='+encodeURIComponent(n)+'&m='+encodeURIComponent(m);

			
					textToServerAndReturnBlob(args, '/plus_nm', function(blob)
					{
						
						getImageFromBlob( blob, function(img) {
							imageToCanvas(img, "canvas", function() { 
								//stopProgress();
								if (callback) callback();
							});	
							
						});	
						
						
						
					});
					
			/*****************		
					
		//var canvas =  document.getElementById("canvas");

		//var w = canvas.width;
		//var h = canvas.height;
		var params = 'n='+n+'&md5='+encodeURIComponent(md5);		
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/plus_n', true);
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
				
				 
			
	//	}

	//	xhr.send(params);
	
	
	
	});
	
}
