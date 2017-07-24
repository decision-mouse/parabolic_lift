/*
 *  Bisector2D.js
 *  *************Copyright***************
 *  Copyright 2016 Lynn Asselin II
 *  *************License*****************
 *  Creative Commons 4.0 Attribution + ShareAlike license:
 *  https://en.wikipedia.org/wiki/Creative_Commons_license
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