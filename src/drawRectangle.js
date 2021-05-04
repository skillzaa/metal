"use strict";
module.exports = function drawRectangle(attributes) {
    this.saveCtx();
    this.getCtxValues(attributes);
    this.translateCanvas(attributes);
    this.rotateCanvas(attributes);
    this.unTranslateCanvas(attributes);
    //}   
    //--------------draw rect-- if visible
    if ((attributes.getAttr("transparent") === false)) {
        /////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////
        this.ctx.globalAlpha = attributes.getAttr("opacity");
        if (attributes.getAttr("filled") == true) {
            this.ctx.fillStyle = attributes.getAttr("color");
            this.ctx.fillRect(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width"), attributes.getAttr("height"));
        }
        else {
            this.ctx.strokeStyle = attributes.getAttr("color");
            this.ctx.strokeRect(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width"), attributes.getAttr("height"));
        }
        /////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////
    }
    //------------------------------
    this.restoreCtx();
    //--------------------------------------------
}; //draw ends
