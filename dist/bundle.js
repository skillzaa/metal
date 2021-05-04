(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * 1--every objects must have a unique "name"  field
 * 2--every OBJECT MUST HAVE "value" field.
 */
// const IItem = require("IItem");
const Validator = require('validator99');
const val = new Validator();
// console.log(val);
// val.isNumber("string",true);
module.exports = class ArrayOfObjects {
    constructor() {
        this.data = [];
    }
    add(name, value = "") {
        val.isString(name, true, "The name is compulsary and should be of type string");
        if (this.isUnique(name) === true) {
            const a = {};
            a.name = name;
            a.value = value;
            this.data.push(a);
            return a;
        }
        else {
            throw new Error(`Please Provide a unique and valid string name for the object. The name ::${name} already exists`);
        }
    }
    isUnique(name) {
        if (typeof name == "undefined") {
            return false;
        }
        let uniqueOrNot = true;
        for (let idx = 0; idx < this.data.length; idx++) {
            const element = this.data[idx];
            if (element.name === name) {
                uniqueOrNot = false;
            }
        }
        return uniqueOrNot;
    }
    get length() {
        return this.data.length;
    }
    getItem(name) {
        val.isString(name, true, "The name should be of type string");
        for (let idx = 0; idx < this.data.length; idx++) {
            if (this.data[idx].name === name) {
                return this.data[idx];
            }
        }
        return false;
    } //.....................
    getAttr(name, field = "value") {
        val.isString(name, true, "The name should be of type string");
        for (let idx = 0; idx < this.data.length; idx++) {
            const thisName = this.data[idx].name;
            if (thisName == name) {
                return this.data[idx][field];
            }
        }
        return false;
    }
    setAttr(name, value, field = "value") {
        val.isString(name, true, "The name should be of type string");
        for (let idx = 0; idx < this.data.length; idx++) {
            if (this.data[idx].name == name) {
                this.data[idx][field] = value;
                return this.data[idx][field];
            }
        }
        return true;
    } //......
    getObjectsByName(argumentsRequired = []) {
        const ret = [];
        this.data.forEach(bd => {
            argumentsRequired.forEach(ag => {
                if (ag == bd.name) {
                    ret.push(bd);
                }
            });
        });
        return ret;
    }
    getItemsByNames(argumentsRequired = []) {
        const ret = [];
        this.data.forEach(bd => {
            argumentsRequired.forEach(ag => {
                if (ag == bd.name) {
                    ret.push(bd);
                }
            });
        });
        return ret;
    }
};

},{"validator99":2}],2:[function(require,module,exports){
"use strict";
module.exports = class Validator {
    constructor() {
        this.throwExceptionFlag = false;
    } //const
    isNumber(no, shout = false, message = "This is not a Number") {
        //if (data === parseInt(data, 10))
        if ((typeof no) != "number") {
            if (shout === true) {
                throw new Error(message);
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    isInteger(no, shout = false, message = "This is not an Integer") {
        if (Number.isInteger(no) === false) {
            if (shout === true) {
                throw new Error(message);
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    isSmaller(smaller, bigger, shout = false, message = "First Number is not smaller than the second number") {
        if (bigger < smaller) {
            if (shout === true) {
                throw new Error(message);
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    } //fn
    wholeNumber(no, shout = false) {
        this.isNumber(no, shout);
        return Number(no.toFixed(0));
    }
    isString(str, shout = false, message = "This value is not string") {
        if (typeof str === 'string') {
            return true;
        }
        else if (shout === true) {
            throw new Error(message);
        }
        else {
            return false;
        }
    }
    isBoolean(b, shout = false, message = "This value is not boolean") {
        if (typeof b === 'boolean') {
            return true;
        }
        else if (shout === true) {
            throw new Error(message);
        }
        else {
            return false;
        }
    }
    isSNB(snb, shout = false, message = "This value is not boolean or string or number") {
        const isString = this.isString(snb, false);
        const isBoolean = this.isBoolean(snb, false);
        const isNumber = this.isNumber(snb, false);
        if (isString == false && isBoolean == false && isNumber == false) {
            if (shout === true) {
                throw new Error(message);
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
}; //class

},{}],3:[function(require,module,exports){
"use strict";
const drawArc = require('./drawArc');
const drawText = require('./drawText');
const drawRectangle = require('./drawRectangle');
module.exports = class Metal {
    constructor(canvasName = "bilzaaCanvas") {
        this.load(canvasName);
        this.drawArc = drawArc;
        this.drawText = drawText;
        this.drawRectangle = drawRectangle;
    }
    //....................
    load(canvasName = "bilzaaCanvas") {
        try {
            this.canvas = document.getElementById(canvasName);
            this.ctx = this.canvas.getContext('2d');
            this.ctx.canvas.width = window.innerWidth;
            this.ctx.canvas.height = window.innerHeight;
        }
        catch (err) {
            throw new Error("Canvas Elements not found");
            ;
        }
    }
    //....................
    clear() {
        this.ctx.fillStyle = "#f5ecc3";
        //clear the canvas
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } //fn
    clearCanvas(fillStyle = "#ffffff") {
        this.saveCtx();
        this.ctx.fillStyle = fillStyle;
        //clear the canvas
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.restoreCtx();
    } //fn  
    drawRectangleBorder(attributes) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.globalAlpha = attributes.getAttr("opacity");
        this.ctx.lineWidth = attributes.getAttr("borderWidth");
        this.ctx.lineJoin = "round"; //attributes.getAttr("borderWidth");
        this.ctx.strokeStyle = attributes.getAttr("borderColor");
        if (attributes.getAttr("dashedBorder") === true) {
            this.ctx.setLineDash([
                attributes.getAttr("dashSize"),
                attributes.getAttr("gapBetweenDashes")
            ]);
        }
        this.ctx.rect((attributes.getAttr("x") - (attributes.getAttr("borderWidth") / 2)), attributes.getAttr("y") - (attributes.getAttr("borderWidth") / 2), attributes.getAttr("width") + (attributes.getAttr("borderWidth")), attributes.getAttr("height") + (attributes.getAttr("borderWidth")));
        this.ctx.stroke();
        this.ctx.restore();
    }
    saveCtx() {
        this.ctx.save();
    }
    restoreCtx() {
        this.ctx.restore();
    }
    drawCircle(attributes) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("radius"), attributes.getAttr("openingAngle"), attributes.getAttr("closingAngle"));
        /**the color of the circle is the color of fill as well as stroke-- later we will have border color but for now dont confuse the issue */
        this.ctx.lineWidth = attributes.getAttr("lineWidth");
        if (attributes.getAttr("filled") == true) {
            this.ctx.fillStyle = attributes.getAttr("color");
            this.ctx.fill();
        }
        else {
            this.ctx.strokeStyle = attributes.getAttr("color");
            this.ctx.stroke();
        }
        this.ctx.restore();
    } //draw circle
    drawTriangle(attributes) {
        this.ctx.save();
        // this.ctx.fillStyle = attributes.getAttr("color");
        this.ctx.beginPath();
        this.ctx.lineWidth = attributes.getAttr("lineWidth");
        //move to left-bottom
        this.ctx.moveTo(attributes.getAttr("x"), attributes.getAttr("y") + attributes.getAttr("height"));
        //line to right bottom cornot 
        this.ctx.lineTo(attributes.getAttr("x") + attributes.getAttr("width"), attributes.getAttr("y") + attributes.getAttr("height"));
        //top cornor
        this.ctx.lineTo(attributes.getAttr("x") + attributes.getAttr("width") / 2, attributes.getAttr("y"));
        this.ctx.lineTo(attributes.getAttr("x"), attributes.getAttr("y") + attributes.getAttr("height"));
        //  this.ctx.fill();
        if (attributes.getAttr("filled") == true) {
            this.ctx.fillStyle = attributes.getAttr("color");
            this.ctx.fill();
        }
        else {
            this.ctx.strokeStyle = attributes.getAttr("color");
            this.ctx.stroke();
        }
        this.ctx.restore();
    }
    getCtxValues(attributes) {
        //fillstyle is for internal use dont show it to users
        this.ctx.fillStyle = attributes.getAttr("color");
        this.ctx.strokeStyle = attributes.getAttr("color");
        this.ctx.shadowColor = attributes.getAttr("shadowColor");
        this.ctx.shadowBlur = attributes.getAttr("shadowBlur");
        this.ctx.shadowOffsetX = attributes.getAttr("shadowOffsetX");
        this.ctx.shadowOffsetY = attributes.getAttr("shadowOffsetY");
        this.ctx.lineWidth = attributes.getAttr("lineWidth");
        this.ctx.setLineDash([attributes.getAttr("lineDashSize"), attributes.getAttr("lineDashGap")]);
    } //getAttributes
    translateCanvas(attributes) {
        this.ctx.translate(attributes.getAttr("x") + (attributes.getAttr("width") / 2), attributes.getAttr("y") + (attributes.getAttr("height") / 2));
    }
    unTranslateCanvas(attributes) {
        this.ctx.translate(-(attributes.getAttr("x") + (attributes.getAttr("width") / 2)), -(attributes.getAttr("y") + (attributes.getAttr("height") / 2)));
    }
    rotateCanvas(attributes) {
        this.ctx.rotate((attributes.getAttr("currentRotateAngle")) * Math.PI / 180);
    }
    drawEllipse() {
        this.ctx.ellipse(100, 100, 50, 75, 45 * Math.PI / 180, 0, 2 * Math.PI);
    }
    drawLine(attributes) {
        this.ctx.save();
        this.getCtxValues(attributes);
        this.ctx.setLineDash([attributes.getAttr("lineDashSize"), attributes.getAttr("lineDashGap")]); //this is not in getCtxValues since its not that
        this.ctx.beginPath();
        this.ctx.moveTo(attributes.getAttr("x"), attributes.getAttr("y"));
        this.ctx.lineTo(attributes.getAttr("xEnd"), attributes.getAttr("yEnd"));
        this.ctx.stroke();
        this.ctx.restore();
    }
    drawHeart(attributes) {
        this.ctx.beginPath();
        const x = attributes.getAttr("x");
        const y = attributes.getAttr("y");
        this.ctx.moveTo(x, y);
        this.ctx.bezierCurveTo(x + 0, y + 3, x + 5, y + 15, x + 25, y + 15);
        this.ctx.bezierCurveTo(x - 55, y + 15, 20, 62.5, 20, 62.5);
        this.ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        this.ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        this.ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        this.ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        this.ctx.fill();
    }
    //////////////////////////
    drawQuad(attributes) {
        // this.ctx.save();
        // this.ctx.globalAlpha = attributes.getAttr("opacity"); 
        // if(attributes.getAttr("filled") == true){
        //   this.ctx.fillStyle = attributes.getAttr("color");
        //   this.ctx.fillRect(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width"), attributes.getAttr("height"));  
        // }else{
        //   this.ctx.strokeStyle = attributes.getAttr("color");
        //   this.ctx.strokeRect(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width"), attributes.getAttr("height"));  
        this.ctx.beginPath();
        this.ctx.beginPath();
        this.ctx.moveTo(attributes.getAttr("x"), attributes.getAttr("y"));
        this.ctx.lineTo(attributes.getAttr("x") + attributes.getAttr("rtx"), attributes.getAttr("y") + attributes.getAttr("rty")); //top line
        this.ctx.lineTo(attributes.getAttr("x") + attributes.getAttr("rbx"), attributes.getAttr("y") + attributes.getAttr("rby")); //right line
        this.ctx.lineTo(attributes.getAttr("x") + attributes.getAttr("lbx"), attributes.getAttr("y") + attributes.getAttr("lby")); //bottom line
        this.ctx.lineTo(attributes.getAttr("x"), attributes.getAttr("y")); //left line
        this.ctx.fill();
    }
};

},{"./drawArc":4,"./drawRectangle":5,"./drawText":6}],4:[function(require,module,exports){
"use strict";
module.exports = function drawArc(attributes) {
    this.ctx.save();
    this.ctx.beginPath();
    this.getCtxValues(attributes);
    this.ctx.arc(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width") / 2, attributes.getAttr("openingAngle") * Math.PI / 180, attributes.getAttr("closingAngle") * Math.PI / 180);
    /**the color of the circle is the color of fill as well as stroke-- later we will have border color but for now dont confuse the issue */
    this.ctx.lineWidth = attributes.getAttr("lineWidth");
    if (attributes.getAttr("filled") == true) {
        this.ctx.fillStyle = attributes.getAttr("color");
        this.ctx.fill();
    }
    else {
        this.ctx.strokeStyle = attributes.getAttr("color");
        this.ctx.stroke();
    }
    this.ctx.restore();
}; //fn

},{}],5:[function(require,module,exports){
"use strict";
module.exports = function drawRectangle(attributes) {
    this.ctx.save();
    this.getCtxValues(attributes);
    this.translateCanvas(attributes);
    this.ctx.rotate((Math.PI / 180) * attributes.getAttr("currentRotateAngle"));
    this.unTranslateCanvas(attributes);
    //--------------draw rect-- if visible
    if ((attributes.getAttr("transparent") === false)) {
        /////////////////////////////////////////////////////////////
        this.ctx.globalAlpha = attributes.getAttr("opacity");
        this.ctx.lineCap = "round";
        if (attributes.getAttr("filled") == true) {
            this.ctx.fillStyle = attributes.getAttr("color");
            this.ctx.fillRect(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width"), attributes.getAttr("height"));
        }
        else {
            this.ctx.strokeStyle = attributes.getAttr("color");
            this.ctx.strokeRect(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width"), attributes.getAttr("height"));
        }
    } //outer if
    this.ctx.restore();
    //--------------------------------------------
}; //draw ends

},{}],6:[function(require,module,exports){
"use strict";
module.exports = function drawText(attributes) {
    this.saveCtx();
    this.getCtxValues(attributes);
    this.translateCanvas(attributes);
    this.rotateCanvas(attributes);
    this.unTranslateCanvas(attributes);
    //--------------draw rect-- if visible
    if ((attributes.getAttr("transparent") === false)) {
        /////////////////////////////////////////////////////////////
        this.ctx.globalAlpha = attributes.getAttr("opacity");
        this.ctx.fillStyle = attributes.getAttr("color");
        this.ctx.font = `${attributes.getAttr("fontSize")}px ${attributes.getAttr("fontFamily")}`;
        this.ctx.fillText(attributes.getAttr("title"), attributes.getAttr("x"), attributes.getAttr("y"));
    }
    this.ctx.restore();
};

},{}],7:[function(require,module,exports){
"use strict";
const Metal = require('./Metal');
const metal = new Metal();
const getAttributes = require('../uiTests/simpleRect');
const attributes = getAttributes("rect");
attributes.setAttr("currentRotateAngle", 93);
metal.drawRectangle(attributes);

},{"../uiTests/simpleRect":8,"./Metal":3}],8:[function(require,module,exports){
//import ArrayOfObjects from "../../modules/ArrayOfObjects.js";
const ArrayOfObjects = require('@bilzaa.com/arrayofobjects');

module.exports = function getAttributes (name){
const attributes = new ArrayOfObjects();

//--The name--
attributes.add(name, name);
//--x,y,width,height--
attributes.add("x", 100);
attributes.add("y", 100);
attributes.add("width", 100);
attributes.add("height", 100);
//--rotation--
attributes.add("rotateClockwise", true);
//---the angle at which);the obj is currently rotated--this is also rpm / rps
attributes.add("currentRotateAngle", 0);   
//--colors--
attributes.add("color", "green");
attributes.add("opacity", 1 );//----------???? transparency
/**this just became border */
attributes.add("lineWidth",5);//----------???? transparency
/**there is no strokeStyle since the color is fillStyle as well as strokeStyle since we have border feature coming later so we do not need this confusion now */
//attributes.add({ name: "strokeStyle", value: "#F0000" });
//--shadows--
attributes.add("shadowColor","grey");
attributes.add("shadowBlur",0);
attributes.add("shadowOffsetX",0);
attributes.add("shadowOffsetY",0);  
// if filled draw filled if not draw border only
attributes.add("filled", false);  

attributes.add("lineDashSize", 1);    
attributes.add("lineDashGap", 0);

attributes.add("drawBoundingRectangle", true);    
attributes.add("boundingRectangleColor", "red");    
attributes.add("boundingRectanglePadding", 20);    
//--20 items
return attributes;
}
//====================================================
// export default getBaseAttributes;
},{"@bilzaa.com/arrayofobjects":1}]},{},[7]);
