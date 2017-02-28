const electron = require('electron');
var { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
var { BrowserWindow } = electron;

var viewport = {};

module.exports = function(targetWidth, targetHeight, emulate = false, opts = {}) {

	//if emulate is an object, then options was passed in its place
	if(typeof emulate === "object") {
		opts = emulate;
		emulate = false;
		console.log("options passed");
	}

	viewport.opts = opts;
	viewport.emulate = emulate;
	viewport.targetWidth = targetWidth;
	viewport.targetHeight = targetHeight;

	//if h and w are set, then we use their values to determine viewport size
	if(targetHeight && targetWidth) {
		//only allow emulation when height or width are larger than the display workarea
		if(emulate && targetHeight <= height && targetWidth <= width) {
			emulate = false;
		}

		// if one aspect of the specified resolution is larger than the display,
		// we scale the screen based on the larger component of its size
		if(targetWidth > width || targetHeight > height) {
			if(targetWidth > width && targetHeight > height) {
				if(targetWidth > targetHeight)
					height = Math.ceil(targetHeight / targetWidth * width);
				else
					width = Math.ceil(targetWidth / targetHeight * height);
			} else if(targetWidth > width) {
				height = Math.ceil(targetHeight / targetWidth * width);
			} else {
				width = Math.ceil(targetWidth / targetHeight * height);
			}	
		} else {
			width = targetWidth;
			height = targetHeight;
		}
	}

	viewport.width = opts.width = width;
	viewport.height = opts.height = height;

	return viewport;
}

viewport.getWindow = function() {
	viewport.window = new BrowserWindow(viewport.opts);

	if(viewport.emulate) {
		viewport.window.on('show', function() {
			viewport.window.webContents.enableDeviceEmulation({
			    screenPosition: 'mobile',
			    screenSize: { width: viewport.targetWidth, height: viewport.targetHeight },
			    deviceScaleFactor: 0,
			    viewPosition: { x: 0, y: 0 },
			    viewSize: { width: viewport.targetWidth, height: viewport.targetHeight },
			    fitToView: true,
			    offset: { x: 0, y: 0 }
		  	});
		});
	}

	return viewport.window;
}
