const drawArc = require('./drawArc');
const drawText = require('./drawText');
const drawRectangle = require('./drawRectangle');

module.exports =  class Metal {
    ctx:object;
    canvas:object;
  
    constructor(canvasName="bilzaaCanvas") {
   this.load(canvasName);
   this.drawArc = drawArc;
   this.drawText = drawText;
   this.drawRectangle = drawRectangle;
  }
  //....................
  load(canvasName = "bilzaaCanvas"){
      
      try {
          this.canvas = document.getElementById(canvasName);
          this.ctx = this.canvas.getContext('2d');
          this.ctx.canvas.width  = window.innerWidth;
          this.ctx.canvas.height = window.innerHeight;    
        }
        catch(err) {
          throw new Error("Canvas Elements not found");
          ;
        }
  }
  //....................
  clear(){
  this.ctx.fillStyle = "#f5ecc3";
  //clear the canvas
  this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
  }//fn
  clearCanvas(fillStyle = "#ffffff"){
    this.saveCtx();
  this.ctx.fillStyle = fillStyle;
  //clear the canvas
  this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
  this.restoreCtx();
  
  }//fn  
  
  drawRectangleBorder(attributes){
  this.ctx.save();  
  this.ctx.beginPath();
  this.ctx.globalAlpha = attributes.getAttr("opacity");   
  this.ctx.lineWidth = attributes.getAttr("borderWidth");
  this.ctx.lineJoin = "round"; //attributes.getAttr("borderWidth");
  this.ctx.strokeStyle = attributes.getAttr("borderColor");
        if(attributes.getAttr("dashedBorder") === true){
          this.ctx.setLineDash([
            attributes.getAttr("dashSize"),
            attributes.getAttr("gapBetweenDashes")
          ]);
        }
           
  this.ctx.rect(
    (attributes.getAttr("x")- (attributes.getAttr("borderWidth")/2) ), 
    attributes.getAttr("y") - (attributes.getAttr("borderWidth")/2), 
    attributes.getAttr("width") + (attributes.getAttr("borderWidth")),
    attributes.getAttr("height") + (attributes.getAttr("borderWidth"))
    );
    this.ctx.stroke();
   
    this.ctx.restore();
  }
  saveCtx(){ ///this fn is doing 2 things??? is it ok???
    this.ctx.save();  
  }
  restoreCtx(){
    this.ctx.restore();
  }

  
  drawCircle(attributes){
  this.ctx.save();
    
  this.ctx.beginPath();
  
  this.ctx.arc(attributes.getAttr("x"),attributes.getAttr("y"), attributes.getAttr("radius"), attributes.getAttr("openingAngle"), attributes.getAttr("closingAngle"));
  /**the color of the circle is the color of fill as well as stroke-- later we will have border color but for now dont confuse the issue */
  
  this.ctx.lineWidth = attributes.getAttr("lineWidth");
      if(attributes.getAttr("filled") == true){
        this.ctx.fillStyle = attributes.getAttr("color");
        this.ctx.fill();
      }else{
        this.ctx.strokeStyle = attributes.getAttr("color");
        this.ctx.stroke();
      }
  
      this.ctx.restore(); 
  }//draw circle
  
drawTriangle(attributes){
this.ctx.save();  
  
// this.ctx.fillStyle = attributes.getAttr("color");
this.ctx.beginPath();

this.ctx.lineWidth = attributes.getAttr("lineWidth");
//move to left-bottom
  this.ctx.moveTo(attributes.getAttr("x"),attributes.getAttr("y")+attributes.getAttr("height"));
  //line to right bottom cornot 
  this.ctx.lineTo(attributes.getAttr("x")+attributes.getAttr("width"),attributes.getAttr("y")+attributes.getAttr("height"));
  //top cornor
  this.ctx.lineTo(attributes.getAttr("x")+attributes.getAttr("width")/2,attributes.getAttr("y"));
  
  this.ctx.lineTo(attributes.getAttr("x"),attributes.getAttr("y")+attributes.getAttr("height"));
//  this.ctx.fill();
  
      if(attributes.getAttr("filled") == true){
        this.ctx.fillStyle = attributes.getAttr("color");
        this.ctx.fill();
      }else{
        this.ctx.strokeStyle = attributes.getAttr("color");
        this.ctx.stroke();
      }

this.ctx.restore();  
}

  getCtxValues(attributes){

//fillstyle is for internal use dont show it to users
  this.ctx.fillStyle = attributes.getAttr("color");
  this.ctx.strokeStyle = attributes.getAttr("color");
  this.ctx.shadowColor = attributes.getAttr("shadowColor");
  this.ctx.shadowBlur = attributes.getAttr("shadowBlur");
  this.ctx.shadowOffsetX = attributes.getAttr("shadowOffsetX");
  this.ctx.shadowOffsetY = attributes.getAttr("shadowOffsetY");
  this.ctx.lineWidth = attributes.getAttr("lineWidth");
  this.ctx.setLineDash([attributes.getAttr("lineDashSize"),attributes.getAttr("lineDashGap")]);

}//getAttributes
  
  translateCanvas(attributes){
  this.ctx.translate(attributes.getAttr("x") + (attributes.getAttr("width") / 2), attributes.getAttr("y") + (attributes.getAttr("height") / 2));
}   
  
   unTranslateCanvas(attributes){
    this.ctx.translate(-(attributes.getAttr("x") + (attributes.getAttr("width") / 2)), -(attributes.getAttr("y") + (attributes.getAttr("height") / 2)));
  }
   rotateCanvas(attributes){
    this.ctx.rotate((attributes.getAttr("currentRotateAngle")) * Math.PI / 180);
  }
  drawEllipse(){
    this.ctx.ellipse(100, 100, 50, 75, 45 * Math.PI/180, 0, 2 * Math.PI);
  }
  
  drawLine(attributes){
  this.ctx.save();
  this.getCtxValues(attributes);
  this.ctx.setLineDash([attributes.getAttr("lineDashSize"),attributes.getAttr("lineDashGap")]);//this is not in getCtxValues since its not that
  this.ctx.beginPath();
  this.ctx.moveTo(attributes.getAttr("x"), attributes.getAttr("y"));
  this.ctx.lineTo(attributes.getAttr("xEnd"), attributes.getAttr("yEnd"));
  this.ctx.stroke();
  
  this.ctx.restore();
  }
  
  drawHeart(attributes){
    this.ctx.beginPath();
    const x = attributes.getAttr("x");
    const y = attributes.getAttr("y");  
    this.ctx.moveTo(x, y);
    this.ctx.bezierCurveTo(x+0, y+3, x+5, y+15, x+25, y+15);
    this.ctx.bezierCurveTo(x-55, y+15, 20, 62.5, 20, 62.5);
    this.ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    this.ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    this.ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    this.ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    this.ctx.fill();
  }
  //////////////////////////
  drawQuad(attributes){
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
    this.ctx.moveTo(attributes.getAttr("x"),attributes.getAttr("y"));
    this.ctx.lineTo(attributes.getAttr("x")+attributes.getAttr("rtx"),attributes.getAttr("y")+attributes.getAttr("rty")) ; //top line
    this.ctx.lineTo(attributes.getAttr("x")+attributes.getAttr("rbx"),attributes.getAttr("y")+attributes.getAttr("rby")); //right line
    this.ctx.lineTo(attributes.getAttr("x")+attributes.getAttr("lbx"),attributes.getAttr("y")+attributes.getAttr("lby")); //bottom line
    this.ctx.lineTo(attributes.getAttr("x"),attributes.getAttr("y"));//left line
    this.ctx.fill();
  }
  //////////////////////////classsss-----------------
  //////////////////////////classsss-----------------
  }