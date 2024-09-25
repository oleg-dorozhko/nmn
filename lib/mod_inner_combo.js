console.log('mod inner_combo on');
var PNG = require('pngjs').PNG;
module.exports.inner_combo = inner_combo;

function slozhenie_cvetov(a,b)
{
	var c = 0;
	
	if((a+b) > 255) c = (a+b) - 255;
	else c = (a+b);
	
	c /= 2;
	
	return c;
}

function inner_combo(global_memory,nm1,nm2) {

	
	 
	
	
	 

		var old_png =  new PNG({
			
			width: global_memory[nm1].img.width,
			height: global_memory[nm1].img.height,
			filterType: 4
			
			
			});
		
		
		
		
		var arr = global_memory[nm1].img.data;
		
		
		 
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								var idx = (old_png.width * j + i) << 2;	
							
							 
								old_png.data[idx]=arr[idx];
								old_png.data[idx+1]=arr[idx+1];
								old_png.data[idx+2]=arr[idx+2];
								old_png.data[idx+3]=arr[idx+3];
							}
						}
		
		
		
		
		
		var big_image =  new PNG({
			
			width: global_memory[nm2].img.width,
			height: global_memory[nm2].img.height,
			filterType: 4
			
			
			});
		
		
		
		arr = global_memory[nm2].img.data;
		
						for(var j=0;j<big_image.height;j++)
						{
							for(var i=0;i<big_image.width;i++)
							{
								var idx = (big_image.width * j + i) << 2;	
							
						 
								big_image.data[idx]=arr[idx];
								big_image.data[idx+1]=arr[idx+1];
								big_image.data[idx+2]=arr[idx+2];
								big_image.data[idx+3]=arr[idx+3];
							}
						}
		
		 
				 
					
				if((old_png.width % 2 == 0) && (big_image.width % 2 ==  0))
				{
					//even
					if(old_png.width > big_image.width)
					{
						
						
						
						var result_png = new PNG ( {
							
								width: old_png.width,
								height: old_png.height,
								filterType: 4
						} );
						

						var t4 = (old_png.width-big_image.width)/2;
						var k4 = (old_png.height-big_image.height)/2;
						
						
						
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								if( (i>=t4) && (i<(t4+big_image.width)) && (j>=k4) && (j<(k4+big_image.height))	)
								{
									
									
									
									var idx = (old_png.width * j + i) << 2;
									
									var n=i-t4;
									var m=j-k4;
									
									var new_idx1 = big_image.width * m + n << 2;
							
									result_png.data[idx+0] = slozhenie_cvetov( big_image.data[new_idx1+0], old_png.data[idx+0] );
									result_png.data[idx+1] = slozhenie_cvetov( big_image.data[new_idx1+1], old_png.data[idx+1] );
									result_png.data[idx+2] = slozhenie_cvetov( big_image.data[new_idx1+2], old_png.data[idx+2] );
									result_png.data[idx+3] = 255;
									
									
									
								}
								else
								{
									
									
									var idx = (old_png.width * j + i) << 2;
									
									result_png.data[idx+0] = old_png.data[idx+0];
									result_png.data[idx+1] = old_png.data[idx+1];
									result_png.data[idx+2] = old_png.data[idx+2];
									result_png.data[idx+3] = 255;
									
								}
							}
						}
						
						
						
						
						

					}
					else
					{
						
						var result_png = new PNG ( {
							
								width: big_image.width,
								height: big_image.height,
								filterType: 4
						} );
						
						
						
						
						
						var t4 = (big_image.width-old_png.width)/2;
						var k4 = (big_image.height-old_png.height)/2;
						
						
						
						for(var j=0;j<big_image.height;j++)
						{
							for(var i=0;i<big_image.width;i++)
							{
								if( (i>=t4) && (i<(t4+old_png.width)) && (j>=k4) && (j<(k4+old_png.height))	)
								{
									
									
									
									var idx = (big_image.width * j + i) << 2;
									
									var n=i-t4;
									var m=j-k4;
									
									var new_idx1 = old_png.width * m + n << 2;
							
									result_png.data[idx+0] = slozhenie_cvetov( big_image.data[idx+0], old_png.data[new_idx1+0] );
									result_png.data[idx+1] = slozhenie_cvetov( big_image.data[idx+1], old_png.data[new_idx1+1] );
									result_png.data[idx+2] = slozhenie_cvetov( big_image.data[idx+2], old_png.data[new_idx1+2] );
									result_png.data[idx+3] = 255;
									
									
									
								}
								else
								{
									
									
									var idx = (big_image.width * j + i) << 2;
									
									result_png.data[idx+0] = big_image.data[idx+0];
									result_png.data[idx+1] = big_image.data[idx+1];
									result_png.data[idx+2] = big_image.data[idx+2];
									result_png.data[idx+3] = 255;
									
								}
							}
						}
						 
						
					}
					
				//	global_memory.splice(nm1,1);		
				//	global_memory.splice(nm2,1);
					
					return result_png;
					
					
					
				}
				else if ((old_png.width % 2 == 1) && (big_image.width % 2 ==  1))
				{
					//odd
					if(old_png.width > big_image.width)
					{
						
						
						var result_png = new PNG ( {
							
								width: old_png.width,
								height: old_png.height,
								filterType: 4
						} );
						
						var middle_of_bigger_w = old_png.width / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_w = big_image.width / 2 | 0;   //for 5   2      0 1 [2] 3 4
						
						var begin_w = middle_of_bigger_w - middle_of_smaller_w;
						var end_w = begin_w + big_image.width; //and (not include) end
						
						var middle_of_bigger_h = old_png.height / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_h = big_image.height / 2 | 0; 
						
						var begin_h = middle_of_bigger_h - middle_of_smaller_h;
						var end_h = begin_h + big_image.height; 	
						
						
						for(var j=0;j<old_png.height;j++)
						{
							for(var i=0;i<old_png.width;i++)
							{
								var idx = (old_png.width * j + i) << 2;	
								
								if((i>= begin_w) && (i<end_w) && (j>=begin_h) && (j<end_h))
								{
								
									var n =	i - begin_w;
									var m = j - begin_h;
									
									var idx2 = big_image.width * m + n << 2;
									
									result_png.data[idx+0] = slozhenie_cvetov( big_image.data[idx2+0], old_png.data[idx+0] );
									result_png.data[idx+1] = slozhenie_cvetov( big_image.data[idx2+1], old_png.data[idx+1] );
									result_png.data[idx+2] = slozhenie_cvetov( big_image.data[idx2+2], old_png.data[idx+2] );
									result_png.data[idx+3] = 255;
									
									
								}
								else
								{
								
									result_png.data[idx+0] = old_png.data[idx+0];
									result_png.data[idx+1] = old_png.data[idx+1];
									result_png.data[idx+2] = old_png.data[idx+2];
									result_png.data[idx+3] = 255;
								}
							}
						}
						
						
						
						
					}
					else
					{
						
						var result_png = new PNG ( {
							
								width: big_image.width,
								height: big_image.height,
								filterType: 4
						} );
						
						var middle_of_bigger_w = big_image.width / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_w = old_png.width / 2 | 0;   //for 5   2      0 1 [2] 3 4
						
						var middle_of_bigger_h = big_image.height / 2 | 0; // for 7  3    0 _1 2 [3] 4 5 6      3-2 = 1
						var middle_of_smaller_h = old_png.height / 2 | 0; 
						
						var begin_w = middle_of_bigger_w - middle_of_smaller_w;
						var end_w = begin_w + old_png.width; //and (not include) end
						
						var begin_h = middle_of_bigger_h - middle_of_smaller_h;
						var end_h = begin_h + old_png.height; 	
					
						for(var j=0;j<big_image.height;j++)
						{
							for(var i=0;i<big_image.width;i++)
							{
								var idx = (big_image.width * j + i) << 2;	
								
								if((i>= begin_w) && (i<end_w) && (j>=begin_h) && (j<end_h))
								{
									
									var n =	i - begin_w;
									var m = j - begin_h;
									
									var idx2 = old_png.width * m + n << 2;
									
									result_png.data[idx+0] = slozhenie_cvetov( old_png.data[idx2+0], big_image.data[idx+0] );
									result_png.data[idx+1] = slozhenie_cvetov( old_png.data[idx2+1], big_image.data[idx+1] );
									result_png.data[idx+2] = slozhenie_cvetov( old_png.data[idx2+2], big_image.data[idx+2] );
									result_png.data[idx+3] = 255;
									
									
								}
								else
								{
									
									
									result_png.data[idx+0] = old_png.data[idx+0];
									result_png.data[idx+1] = old_png.data[idx+1];
									result_png.data[idx+2] = old_png.data[idx+2];
									result_png.data[idx+3] = 255;
								}
							}
						}
					}
					
					
					
				//	global_memory.splice(nm1,1);
				//	global_memory.splice(nm2,1);
					
					return result_png;
					
					
					
					
					
					
				}
				else  
				{
					
					 
					
					return null;
				}
 
	
}


		