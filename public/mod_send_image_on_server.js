function send_to_obvod7(params, callback )
{
	console.log("params in  send_to_obvod7: "+params);
	send_image_from_canvas_on_server("canvas", params, callback)
}


function send_image_from_canvas_on_server(canvas_id, params0, callback)
{
	
	var canvas =  document.getElementById(canvas_id);
	var w = canvas.width;
	var h = canvas.height;
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(0, 0, w, h);
	
	///////
	var buffer = imageData.data.buffer;  // ArrayBuffer
	//////
	
	var imageData2 = context.createImageData(w, h);
	imageData2.data.set(buffer);
	
	var params = [];
			
	params['w']= w;
	params['h']= h;
	params['imgdata_base64']= canvas.toDataURL();
			
	msios_sendPostWithParametersOnServer( params, callback ); 
	
	
}

function drawDataURLOnCanvas(strDataURI, canvas_id, callback  ) {
    var canvas =  document.getElementById(canvas_id);
    var img = new window.Image();
    img.addEventListener("load", function () {
        canvas.getContext("2d").drawImage(img, 0, 0);
		if(callback) callback();
    });
    img.setAttribute("src", strDataURI);
}

function msios_sendPostWithParametersOnServer( params, callback  )
{
	
	var params = 'w=' + encodeURIComponent(params['w']) +
  '&h=' + encodeURIComponent(params['h']) +
   '&imgdata_base64=' + encodeURIComponent(params['imgdata_base64']);
	
	var action = 'http://localhost/obvod7/php/send_image_from_canvas_on_server.php';
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', action, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	//xhr.responseType = "blob";
	
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }

			//alert(xhr.response);
			
			console.log(xhr.response);
			
			drawDataURLOnCanvas(xhr.response, "canvas_id", callback );
			
			
			/*******
    
            var buffer = xhr.response;
            var dataview = new DataView(buffer);
            var ints = new Uint8ClampedArray(buffer.byteLength);
            for (var i = 0; i < ints.length; i++) {
                ints[i] = dataview.getUint8(i);
            }
			
			alert(ints[10]);
			
			************/
            //var blob = xhr.response;
			
			///getJSONArrayFromBlob( blob, function( img ) {	imageToCanvas( img, "canvas0" ); } );
			
	}

	xhr.send(params);
	
}