console.log('mod border on');
var PNG = require('pngjs').PNG;
module.exports.border_minus = border_minus;
 

function border_minus(source_png) {

	var newpng = new PNG ( {
		
			width: source_png.width-2,
			height: source_png.height-2,
			filterType: 4
	} );



	for (var y = 1; y < source_png.height-1; y++) {
		
		for (var x = 1; x < source_png.width-1; x++) {
			
			var idx = source_png.width * y + x << 2;
			
			var new_idx1 = newpng.width * (y-1) + (x-1) << 2;
			
			newpng.data[new_idx1+0] = source_png.data[idx];
			newpng.data[new_idx1+1] = source_png.data[idx+1];
			newpng.data[new_idx1+2] = source_png.data[idx+2];
			newpng.data[new_idx1+3] = source_png.data[idx+3];
			
		}
		
	}
	
	return newpng;

}