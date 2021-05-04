module.exports = function drawText(attributes){

this.saveCtx();  
this.getCtxValues(attributes);
this.translateCanvas(attributes);
this.rotateCanvas(attributes);
this.unTranslateCanvas(attributes);

    //--------------draw rect-- if visible
    if ((attributes.getAttr("transparent") === false)  ) {
        /////////////////////////////////////////////////////////////
        this.ctx.globalAlpha = attributes.getAttr("opacity"); 
    this.ctx.fillStyle = attributes.getAttr("color");
  
    this.ctx.font = `${attributes.getAttr("fontSize")}px ${attributes.getAttr("fontFamily")}`;
    
    this.ctx.fillText(attributes.getAttr("title"),attributes.getAttr("x"),attributes.getAttr("y"));
}   
    this.ctx.restore();
}
  