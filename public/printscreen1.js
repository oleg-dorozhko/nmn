window.onload = function(){
	document.getElementById("canvas").onclick = getImageFromNodeJS;
}


function getImageFromNodeJS() {
  //document.getElementById("demo").innerHTML = "Hello World";
  var md5 = document.getElementById("md5").value;
  
					// getPrintScreenMessageFromServerByPOST_md5(md5, 'https://paterns.xyz/printscreenN', function(blob)
					// {
						// document.write(blob);
						// //getImageFromBlob( blob, function(img) {
						// //	imageToCanvas(img, "canvas", function() { 
						// //		if (callback) callback();
						// //	});	
						// //	
						// //});	
					 	
						
						
					// });
					
					getPrintScreenMessageFromServerByPOST_md5AndReturnBlob(md5, '/printscreenNB', function(blob)
					{
						//document.write(blob);
						getImageFromBlob( blob, function(img) {
						
							imageToCanvas(img, "canvas", function() { 
								if (callback) callback();
							});	
							
						});	
						
						
						
					});
 
}

