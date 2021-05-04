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
