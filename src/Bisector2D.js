/**
 *
 */
function Bisector2D(x,y,m){
    this.x = x;
    this.y = y;
    this.m = m;
}

Bisector2D.prototype.getX = function(){
    return this.x;
};

Bisector2D.prototype.getY = function(){
    return this.y;
};

Bisector2D.prototype.getM = function(){
    return this.m;
};