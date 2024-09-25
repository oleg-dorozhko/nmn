
function execute_script(req, res)
{
	logger_console_log('execute_script:');
	var s = '';
	for(var key in req.body)	{ 
		s +='\nreq.body['+key+']: '+req.body[key];
		
	}
	logger_console_log(s); 
	
	var arr = req.body['commands'].split(",");
	var res_png=null;
	var ind=null;
	var md5=req.body['md5'];
	logger_console_log(md5); 
	if(md5 != null)
	{
		ind = isDataPNGObjectByMD5(md5);
		if(ind==null)
		{
			logger_console_log('execute_script: not found obj with this md5:'+md5);
			res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end('execute_script: not found obj with this md5:'+md5);
				req.connection.destroy();
				return;
		}
		else 
		{
			res_png =  create_png_from_global(ind);
			
			
		}
	
	
	
	}
	
	
	for(var i=0;i<arr.length;i++)
	{
		arr[i]=arr[i].trim();
		logger_console_log("executing ["+arr[i]+"]"); 
		
		if(arr[i].indexOf("generate random seed")===0)
		{
			var t = arr[i].replace("generate random seed",'');
			t=t.trim();
			var params=null;
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
			res_png = mod_generate_random_seed.generate_random_seed(params);
			
			
		}
		else if(arr[i]=="median")
		{
			
			res_png = mod_median.__median(res_png);
			
		}
		else if(arr[i]=="cryptographic method two")
		{
			res_png = mod_cryptography.dark_lord(res_png);
		}
		else if(arr[i].indexOf("magik rotate")===0)
		{
			var t = arr[i].replace("magik rotate",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=Number(t);
				
			}
			else
			{
				params =1;
			}
			res_png = mod_magik_rotate.magik_rotate(res_png,params);
			
		}
		else if(arr[i]=="up")
		{
			res_png = mod_up.upForImageData(res_png);
		}
		else if(arr[i]=="smooth")
		{
			
			res_png = mod_smooth.smooth(res_png);
			
		}
		else if(arr[i]=="rotate plus 45")
		{
			res_png = mod_rotate_ff.rotate_ff(res_png);
		}
		else if(arr[i]=="paint over")
		{
		
			res_png = mod_paint_over.paint_over(res_png);
		
		}
		else if(arr[i]=="nineth")
		{
		
			res_png = mod_nineth.nineth(res_png);
		
		}
		else if(arr[i]=="nonineth")
		{
		
			res_png = mod_nineth.nonineth(res_png);
		
		}
		else if(arr[i]=="maximus")
		{
		
			res_png = mod_maximus.maximus(res_png);
		
		}
		else if(arr[i]=="plus")
		{
			if(res_png.width * 2 > 1200 || res_png.height * 2 > 1200 )
			{
				
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("plus: error: too big size (need result width * 2 <= 1200 or height * 2 <= 1200 )");
				return;
				
			}
			
			res_png = __plus(res_png);
			
			
		}
		
		else if(arr[i]=="mirror right")
		{
			if(res_png.width * 2 > 1200  )
			{
				
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("mright: error: too big size (need result width * 2 <= 1200 )");
				return;
				
			}
			
			res_png = mod_mirror.mirror_right(res_png);
			
			
			
		}
		else if(arr[i]=="mirror down")
		{
			
			if( res_png.height * 2 > 1200 )
			{
				
				res.writeHead( 500, { 'Content-Type':'text/plain' } );
				res.end("mdown: error: too big size (need result height * 2 <= 1200)");
				return;
				
			}
			
			res_png = mod_mirror.mirror_down(res_png);
			
			
		}
		
		else if(arr[i]=="axes minus")
		{
		
		
		
			res_png = mod_axes.bothAxesMinus(res_png);
		
		
		
		}
		
		
	}
	
	if(ind !=null) global_memory.splice(ind,1);
	
	//sendImage( res_png, res, 'script executed' );
	
}

