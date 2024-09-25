function s_upload_image_to_arweave(params,callback)
{
	console.log("WARNING! Confirm, please: Are you sure you need UPLOAD to ARWEAVE this IMAGE ??????\n(Type Yes if that EXPENSIVE __is correct)");
	alert("WARNING! Confirm, please: Are you sure you need UPLOAD to ARWEAVE this IMAGE ??????\n(Type Yes if that EXPENSIVE __is correct)");
	var s = prompt("WARNING! Confirm, please (type password): ", "WARNING! Confirm, please: Are you sure you need UPLOAD to ARWEAVE this IMAGE ??????\n(Type password CAUSE that EXPENSIVE __is correct)");
	if 	(s=='uita'+parseBin(1010)) 	mod_of_transform_for_receiving_text("canvas", '/upload_image_to_arweave',function(data){
		console.log("data: ["+data+"]");
	}); 
}

function mod_of_transform_for_receiving_text(canvas_id, action, callback)
{
	startProgress();
	getImageFromCanvas( canvas_id, function(blob) { 
		blobToServerAndReturnText(blob, action, function( blob_from_server ) {
			//getImageFromBlob( blob_from_server, function(img) {
			//	imageToCanvas(img, canvas_id, function() { 
					stopProgress();
					if (callback) callback( blob_from_server );
			//	});	
				
			//});	
		}, function(msg) {
			
			stopProgress();
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	});
	 
}