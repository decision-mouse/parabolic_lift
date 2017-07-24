/*
 *  PlaneSideTester.js
 *  *************Copyright***************
 *  Copyright 2016 Lynn Asselin II
 *  *************License*****************
 *  Creative Commons 4.0 Attribution + ShareAlike license:
 *  https://en.wikipedia.org/wiki/Creative_Commons_license
 */

function PlaneSideTester(a,b,c,d){
    this.a = a.getPosition();
    this.b = b.getPosition();
    this.c = c.getPosition();
    this.d = d.getPosition();
    this.q = d;

    this.matrix = new THREE.Matrix4();
    this.matrix.set(
        this.a.x, this.b.x, this.c.x, this.d.x,
        this.a.y, this.b.y, this.c.y, this.d.y,
        this.a.z, this.b.z, this.c.z, this.d.z,
        1  , 1  , 1  , 1
    );
    this.value = this.matrix.determinant();
    this.q.setColor(this.value);
}


PlaneSideTester.prototype.update = function(a,b,c,d){
    this.a = a.getPosition();
    this.b = b.getPosition();
    this.c = c.getPosition();
    this.d = d.getPosition();
    this.q = d;

    this.matrix = new THREE.Matrix4();
    this.matrix.set(
        a.x, b.x, c.x, d.x,
        a.y, b.y, c.y, d.y,
        a.z, b.z, c.z, d.z,
        1  , 1  , 1  , 1
    );
    this.value = this.matrix.determinant();
    this.q.setColor(this.value);
};

