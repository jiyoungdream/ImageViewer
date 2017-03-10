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
    
    var index = 0;
    
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
			imgObj = imgObj[0];
			
			// Catch the index when DOM is clicked
			img.off("click").on("click", function() {
				index = $(".rotate-image").index(this);
				Rotate.click(this);
			});
		}
		
		EXIF.getData(imgObj, function() {
	    	var orientation = EXIF.getTag(this, "Orientation");
	    	changeRotate(orientation, img);
	    });
	}
	
	Rotate.click = function(obj) {
		var image = new Image();
		
    	image.onload = function(){
    	
    		var width = image.width;
    		var height = image.height;
    		
    		var scalex = window.innerWidth / width;
    		var scaley = window.innerHeight / height;
    		
    		var scale = (scalex < scaley) ? scalex : scaley;
    		if (scale > 1) 
    			scale = 1;
    		
    		
    		var centerImage = $("#centerImage");
    		centerImage.attr("src", obj.src);
    		
    		EXIF.getData(obj, function() {
    	    	var orientation = EXIF.getTag(this, "Orientation");
    	    	changeRotate(orientation, centerImage);
    	    	
    	    	var scaleWidth;
    	    	var scaleHeight;
    	    	
    	    	scaleWidth = scale * width * 0.85;
	    		scaleHeight = scale * height * 0.85;
    	    	
//    	    	if (orientation == 6 || orientation == 8) {
//    	    		
//    	    	}
//    	    	else {
//    	    		scaleWidth = scale * width * 0.85;
//    	    		scaleHeight = scale * height * 0.85;
//    	    	}
    	    	
    	    	
    	    	// wrapper resize
    	    	var wrapper = document.getElementById("center-image-wrapper");
    	    	if (orientation == 6 || orientation == 8) {
    	    		wrapper.style.width = scaleHeight +"px";
        	    	wrapper.style.height = scaleWidth + "px";
    	    	} 
    	    	else {
            		wrapper.style.width = scaleWidth +"px";
        	    	wrapper.style.height = scaleHeight + "px";
    	    	}
    	    	
    	    	centerImage.attr("width", scaleWidth);
        		centerImage.attr("height", scaleHeight);
        		
        		if (debug) console.log(window.innerWidth + " " + scaleWidth);
        		if (debug) console.log(window.innerWidth/2 - scaleWidth/2 + "px");
    	    	
    	    	// 돌린 후에 Center위치를 재조정해야함
    	    	wrapper.style.top = window.innerHeight/2 - scaleHeight/2 + "px";
    	    	wrapper.style.left = window.innerWidth/2 - scaleWidth/2 + "px";
    	    	
    	    });
    	}
    	
    	var OverlayView = document.getElementById("imgRotateOverlay");
    	OverlayView.setAttribute("style", "display:block");
    	
    	image.src = obj.src;
    	var img = document.getElementById("centerImage");
    	img = image;
	}
	
	Rotate.clickRight = function() {
		if (index == $(".rotate-image").length - 1) {
			index = 0;
			Rotate.click($(".rotate-image").get(index));
		}
		else {
			Rotate.click($(".rotate-image").get(++index));
		}
	}
	
	Rotate.clickLeft = function() {
		if (index == 0) {
			index = $(".rotate-image").length - 1;
			Rotate.click($(".rotate-image").get(index));
		}
		else {
			Rotate.click($(".rotate-image").get(--index));
		}
	}
	
	Rotate.hide = function() {
		overlayHide();
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
		applyCSS(img, rotate);
	}
	
	function applyCSS(img, rotate) {
		if (img instanceof  jQuery) {
			img.css("-webkit-transform", "rotate(" + rotate + "deg)");
			img.css("-moz-transform", "rotate(" + rotate + "deg)");
			img.css("-o-transform", "rotate(" + rotate + "deg)");
			img.css("-ms-transform", "rotate(" + rotate + "deg)");
			img.css("transform", "rotate(" + rotate + "deg)");
			img.css("visibility", "visible");
			img.css("display", "block");
		}
		else {
			img.setAttribute("style", "-webkit-transform:rotate(" + rotate + "deg)");
			img.setAttribute("style", "-moz-transform: rotate(" + rotate + "deg)");
			img.setAttribute("style", "-o-transform: rotate(" + rotate + "deg)");
			img.setAttribute("style", "-ms-transform: rotate(" + rotate + "deg)");
			img.setAttribute("style", "transform: rotate(" + rotate + "deg)");
			img.setAttribute("style", "visibility:visible");
		}
	}
	
	function overlayHide() {
		var OverlayView = document.getElementById("imgRotateOverlay");
		OverlayView.setAttribute("style", "display:none");
		
		var centerImage = document.getElementById("center-image-wrapper");
		centerImage.setAttribute("style", "display:none");
	}

	window.document.onkeydown = function(e) {
		if (!e)
			e = event;
		
		// ESC key down
		if (e.keyCode == 27) {
			overlayHide();
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


