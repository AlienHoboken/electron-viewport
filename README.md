[![npm](https://img.shields.io/npm/v/electron-viewport.svg)]() [![npm](https://img.shields.io/npm/dt/electron-viewport.svg)]() [![npm](https://img.shields.io/npm/l/electron-viewport.svg)]()

# electron-viewport
electron-viewport helps scale and emulate viewports. To use electron-viewport, first install it

### Installation
`npm install --save electron-viewport`

### Instance Properties
#### `viewport.width`
Width of the viewport to be represented

#### `viewport.height`
Height of the viewport to be represented

#### `viewport.emulate`
`Boolean` indicating whether or not to emulate the given viewport size or simply scale to fit on current display.

#### `viewport.opts`
Options passed to BrowserWindow on creation

### Instance Methods
#### `viewport.getWindow(width, height[, emulate][, options])`
* `width` Integer - The width of the viewport to be represented
* `height` Integer - The height of the viewport to be represented
* `emulate` Boolean (optional) - Whether or not to use device emulation, simulating the actual viewport size given. If false, then the viewport it simply scaled while maintaining aspect ratio. Default is `false`
* `options` Object (optional) - Options to be passed to the BrowserWindow on creation

Creates and returns a [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md), enabling emulation on it if necessary.

## Examples

### Getting scaled width and height

```javascript
var { width, height } = require('./viewport.js')(width, height)
```

### Creating a scaled window

```javascript
var viewport = require('./viewport.js')(width, height)
var mainWindow = viewport.getWindow()
```
Creates a scaled BrowserWindow which fits on screen, with the width and height specified.

### Scaled window with device emulation

```javascript
var viewport = require('./viewport.js')(deviceWidth, deviceHeight, true)
var mainWindow = viewport.getWindow()
```
Creates a scaled BrowserWindow which fits on screen, with device emulation enabled for the passed width and height.

### Scaled window with options passed to BrowserWindow

```javascript
var options = { frame: false } //specify your BrowserWindow options here, just an example
var viewport = require('./viewport.js')(width, height, options)
var mainWindow = viewport.getWindow()
```
Creates a scaled BrowserWindow which fits on screen, with the given [BrowserWindow options](https://github.com/electron/electron/blob/master/docs/api/browser-window.md) being passed

### Scaled window with options and device emulation

```javascript
var options = { frame: false } //specify your BrowserWindow options here, just an example
var viewport = require('./viewport.js')(width, height, true, options)
var mainWindow = viewport.getWindow()
```

