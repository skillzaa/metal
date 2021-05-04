module.exports = function drawArc(attributes){
this.ctx.save();

this.ctx.beginPath();
this.getCtxValues(attributes);
this.ctx.arc(attributes.getAttr("x"),attributes.getAttr("y"), 
  attributes.getAttr("width")/2, 
  attributes.getAttr("openingAngle") * Math.PI/180, 
  attributes.getAttr("closingAngle")* Math.PI/180);
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
  }//fn
