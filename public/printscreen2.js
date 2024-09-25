var global_translation_ON = false;

window.addEventListener("load", function() {
	
	document.getElementById("button").onclick = getImageFromNodeJS2;
	setStartStopButtonsVisible();
	document.getElementById("buttonStart").onclick = buttonStartAction;
	document.getElementById("buttonStop").onclick = buttonStopAction;
	
});

function agni() {
	
	if(global_translation_ON) {
		getImageFromNodeJS();
		
	}
	
	
}

function setStartStopButtonsVisible() {
	if(global_translation_ON == false) {
		document.getElementById("buttonStart").disabled = false;
		document.getElementById("buttonStop").disabled = true;
	}
	else {
		document.getElementById("buttonStart").disabled = true;
		document.getElementById("buttonStop").disabled = false;
	}
}

function buttonStartAction() {
	if(global_translation_ON === false) {
		global_translation_ON = true;
		setStartStopButtonsVisible();
		agni();
	}
}

function buttonStopAction(){
	if(global_translation_ON === true) {
		global_translation_ON = false;
	}
	setStartStopButtonsVisible();
}

function getImageFromNodeJS2() {
    
	var roomID = document.getElementById("roomID").value;
  
	getPrintScreenMessageFromServerByPOST_md5AndReturnBlob(roomID, '/printscreenNNB', function( res )
	{
		var blob = new Blob([res], {type: 'image/png'});
		
		// Create a binary string from the returned data, then encode it as a data URL.
    // var uInt8Array = new Uint8Array(blob);
    // var i = uInt8Array.length;
    // var binaryString = new Array(i);
    // while (i--)
    // {
      // binaryString[i] = String.fromCharCode(uInt8Array[i]);
    // }
    // var data = binaryString.join('');

    // var base64 = window.btoa(data);

	// var img = document.createElement("image");
	// //img.onload = function() {
		
		// //imageToCanvas( img, "canvas", function() { console.log("done"); } );
	// //}
	// img.src = "data:image/png;base64," + base64;
    // document.body.appendChild(img);
	//document.getElementById("myImage").src=
		
		getImageFromBlob( blob, function(img ) {
			
			imageToCanvas( img, "canvas", function() { console.log("done"); } );
			
		});	
		
	}, function(error_message){
		console.log(error_message);
		alert(error_message);
		buttonStopAction();
	});
 
}

function getImageFromNodeJS( ) {
    
	var roomID = document.getElementById("roomID").value;
  
	getPrintScreenMessageFromServerByPOST_md5AndReturnBlob(roomID, '/printscreenNNB', function( res )
	{
		var blob = new Blob([res], {type: 'image/png'});
		
		getImageFromBlob( blob, function(img) {
			
			imageToCanvas( img, "canvas", function() {
				
				setTimeout( agni, Number(document.getElementById("intervalMS").value) );
				
			//	if(global_agni_works) {
			//		setTimeout( agni, Number(document.getElementById("intervalMS").value) );
			//	}				
			});
			
		});	
		
	}, function(error_message){
		console.log(error_message);
		alert(error_message);
		buttonStopAction();
	});
 
}

