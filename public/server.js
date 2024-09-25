function s_inverse(params,callback)
{
	transform("canvas", '/inverse',callback); 
}

function s_paint_over(params,callback)
{
	transform("canvas", '/paint_over',callback); 
}

function s_random(params,callback)
{
	transform("canvas", '/random',callback); 
}

function s_black_white(params,callback) 
{  
	transform("canvas", '/blackwhite', callback); 
	
} 

function s_plus(params,callback)
{
	transform("canvas", '/plus',callback); 
}

function s_ident( params, callback )
{
	transform("canvas", '/ident', callback ); 
}

function s_border_minus(params, callback)
{
	transform("canvas", '/borderminus', callback ); 
	
}

function s_border_plus(params, callback)
{
	transform("canvas", '/borderplus', callback ); 
	
}

function s_both_axes_minus(params, callback)
{
	
	transform("canvas", '/axes_minus', callback ); 
}
function s_both_axes_plus(params, callback)
{
	
	transform("canvas", '/axes_plus', callback ); 
}

function s_crop_lt( params, callback )
{
	crop_lt( params, callback )
}

function format(s)
{
	let arr=s.split(',');
	return arr.join(',');
}

function s_execute_script_param ( cmd,  callback )
{
	
	let global_text_edit_for_execute_script_command=prompt('Enter command or list of commands (csv)',cmd);
	if(global_text_edit_for_execute_script_command==null) {if(callback)callback();return}
	
	var url = '/execute_script';
	//var url = 'localhost:5000/execute_script';
	//var url = 'https://patterns-editor.herokuapp.com/execute_script';
	let canvas_id="canvas";
	getImageFromCanvas( canvas_id, function(blob) { 
		//let action='https://patterns-editor.herokuapp.com/ident';
		let action='/ident';
		blobToServerForMD5(blob, action, function( data ) {
			var txt = "md5="+data+"&commands="+format(global_text_edit_for_execute_script_command);
			textToServerAndReturnBlob( txt, url, function( blob_from_server ) {
						
						getImageFromBlob( blob_from_server, function(img) {
							
								 imageToCanvas(img, "canvas", function() { 
									
									if(callback) callback();
									
								});	
				
						});	
						
						
		}, function(msg) {
			
			
			console.log("server(): Was error: "+msg);
			if(onerror) onerror(msg);
			
	}); 
			
		
				}
				
				, function(msg) {
			
			
			console.log("s_execute_script:ident(): Was error: "+msg);
			if(onerror) onerror(msg);
			
				}
		);	
				
			
		}); 
	
	
	
}

function s_execute_script (  callback )
{
	let global_text_edit_for_execute_script_command=prompt('Enter command or list of commands (csv)');
	if(global_text_edit_for_execute_script_command==null) {if(callback)callback();return}
	
	var url = '/execute_script';
	//var url = 'localhost:5000/execute_script';
	//var url = 'https://patterns-editor.herokuapp.com/execute_script';
	let canvas_id="canvas";
	getImageFromCanvas( canvas_id, function(blob) { 
		//let action='https://patterns-editor.herokuapp.com/ident';
		let action='/ident';
		blobToServerForMD5(blob, action, function( data ) {
			var txt = "md5="+data+"&commands="+format(global_text_edit_for_execute_script_command);
			textToServerAndReturnBlob( txt, url, function( blob_from_server ) {
						
						getImageFromBlob( blob_from_server, function(img) {
							
								 imageToCanvas(img, "canvas", function() { 
									
									if(callback) callback();
									
								});	
				
						});	
						
						
		}, function(msg) {
			
			
			console.log("server(): Was error: "+msg);
			if(onerror) onerror(msg);
			
	}); 
			
		
				}
				
				, function(msg) {
			
			
			console.log("s_execute_script:ident(): Was error: "+msg);
			if(onerror) onerror(msg);
			
				}
		);	
				
			
		}); 
	
	
	
}
	


function s_crop_rb( params, callback )
{
	crop_rb( params, callback )
}

function s_half( params, callback )
{
	transform("canvas", '/half', callback); 
}

function s_vortex(  )
{
	execute_t_script("mirror right, mirror down"); 
}

function s_minus(params,callback)
{
	transform("canvas", '/minus',callback); 
}

function s_mirror_right(params,callback)
{
	transform("canvas", '/mright',callback); 
}

function s_mirror_down(params,callback)
{
	transform("canvas", '/mdown',callback); 
}

function s_median(params,callback)
{
	transform("canvas", '/median',callback); 
}

function s_rio(params,callback,callback)
{
	transform("canvas", '/rio',callback); 
}

function s_gcombo(params,callback)
{
	transform("canvas", '/gcombo',callback); 
}

function s_brain(params,callback)
{
	transform("canvas", '/brain',callback); 
}

function s_razn_colors(params,callback)
{
	
	//textToServerAndReturnText(txt, url, callback, onerror)
	transform("canvas", '/razn_colors',callback); 
}

function s_step_colors(params,callback)
{
	transform("canvas", '/step_colors',callback); 
}

function s_destroy_colors(params, callback)
{
	transform("canvas", '/destroy_colors',callback); 
}


function s_join_colors(params,callback)
{
	transform("canvas", '/join_colors',callback); 
}
function s_odin_dva_colors(params,callback)
{
	transform("canvas", '/odin_dva_colors',callback); 
}

function s_smooth(params,callback)
{
	transform("canvas", '/smooth',callback); 
}

function s_nineth(params,callback)
{
	transform("canvas", '/nineth',callback); 
}
function s_maximus(params,callback)
{
	transform("canvas", '/maximus',callback); 
}

function s_nonineth(params,callback)
{
	transform("canvas", '/nonineth',callback); 
}

function s_colors(params,callback)
{
	sendImageToUrlGetText( "canvas", '/colors', colors, callback ); 
}


function s_up(params,callback)
{
	transform("canvas", '/up',callback); 
}