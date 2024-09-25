window.onload = function(){
	document.getElementById("canvas").onclick = getImageFromNodeJS;
}

function getImageFromNodeJS() {
  
	var md5 = document.getElementById("md5").value;
	var args = 'md5='+encodeURIComponent(md5);
	textToServerAndReturnBlob(args, 'https://paterns.xyz/printscreenN', function(blob)
	{
		
		getImageFromBlob( blob, function(img) {
			imageToCanvas(img, "canvas", function() { 
				if (callback) callback();
			});	
			
		});	
		
		
		
	});

}
