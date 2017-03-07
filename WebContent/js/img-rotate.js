(function() {
	
	var debug = true;
	
	var root = this;
	
	var Rotate = function(obj) {
        if (obj instanceof Rotate) return obj;
        if (!(this instanceof Rotate)) return new Rotate(obj);
        this.Rotatewrapped = obj;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Rotate;
        }
        exports.Rotate = Rotate;
    } else {
        root.Rotate = Rotate;
    }
    
	Rotate.rotate = function (img) {
		// EXIF 
		// image Orientation Explain 
		// http://sylvana.net/jpegcrop/exif_orientation.html  
		/**
		 * 1) transform="";;
			 2) transform="-flip horizontal";;
			 3) transform="-rotate 180";;
			 4) transform="-flip vertical";;
			 5) transform="-transpose";;
			 6) transform="-rotate 90";;
			 7) transform="-transverse";;
			 8) transform="-rotate 270";;
		 */
		
		// jQuery Obj
		var imgObj = img;
		if (img instanceof  jQuery) {
			if(debug) console.log("jQuery obj :: true"); 
			imgObj = imgObj[0];
		}
		
		EXIF.getData(imgObj, function() {
	    	var orientation = EXIF.getTag(this, "Orientation");
	    	if(debug) console.log("img orientation :: " + orientation); 
	    	changeRotate(orientation, img);
	    });
		
//		var OverlayView  = '<div class="imgRotateOverlay"></div>'
//		document.body.innerHTML += OverlayView;
		
	}
	
	function changeRotate(orientation, img){
		
		var rotate = 0;
		var scale = 1;
		switch (orientation) {
			case 0 :
				
			break;
			case 1 :
				
			break;
			case 2 :
				
			break;
			case 3 :
				rotate = 180;
			break;
			case 4 :
				
			break;
			case 5 :
				
			break;
				
			case 6 :
				rotate = 90;
			break;
			case 7 :
				
			break;
			case 8 :
				rotate = 270;
			break;
		}
		
		if (img instanceof  jQuery) {
			img.css("-webkit-transform", "rotate(" + rotate + "deg)");
			img.css("-moz-transform", "rotate(" + rotate + "deg)");
			img.css("-o-transform", "rotate(" + rotate + "deg)");
			img.css("-ms-transform", "rotate(" + rotate + "deg)");
			img.css("transform", "rotate(" + rotate + "deg)");
//			img.css("visibility", "visible");
		}
		else {
			img.setAttribute("style", "-webkit-transform:rotate(" + rotate + "deg)");
			img.setAttribute("style", "-moz-transform: rotate(" + rotate + "deg)");
			img.setAttribute("style", "-o-transform: rotate(" + rotate + "deg)");
			img.setAttribute("style", "-ms-transform: rotate(" + rotate + "deg)");
			img.setAttribute("style", "transform: rotate(" + rotate + "deg)");
//			img.setAttribute("style", "visibility:visible");
		}
	}

}.call(this));




//var debug = true;
//
//var Rotate = {
//	rotate : function (img) {
//		// EXIF 
//		// image Orientation Explain 
//		// http://sylvana.net/jpegcrop/exif_orientation.html  
//		/**
//		 * 1) transform="";;
//			 2) transform="-flip horizontal";;
//			 3) transform="-rotate 180";;
//			 4) transform="-flip vertical";;
//			 5) transform="-transpose";;
//			 6) transform="-rotate 90";;
//			 7) transform="-transverse";;
//			 8) transform="-rotate 270";;
//		 */
//		EXIF.getData(img, function() {
//	    	var orientation = EXIF.getTag(this, "Orientation");
//	    	if(debug) console.log("img orientation :: " + orientation); 
//	    	switch (orientation) {
//	    		case 0 :
//	    		break;
//	    	} 
//	    });
//	}
//}


