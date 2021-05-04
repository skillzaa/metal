const Metal = require('./Metal');
const metal = new Metal();

const getAttributes = require('../uiTests/simpleRect');
const attributes = getAttributes("rect");
attributes.setAttr("currentRotateAngle",93);
metal.drawRectangle(attributes);
