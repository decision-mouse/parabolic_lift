/*
 *  Paraboloid.js
 *  *************Copyright***************
 *  Copyright 2016 Lynn Asselin II
 *  *************License*****************
 *  Creative Commons 4.0 Attribution + ShareAlike license:
 *  https://en.wikipedia.org/wiki/Creative_Commons_license
 */

function Paraboloid(){
    //this.paraScalar = 1;
    this.Nu = 25;
    this.Nv = 25;

    this.paraboloidMaterial = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        color:0xc7f6f5,
        depthWrite: true,
        transparent: true,
        opacity:.7
    });

    this.paraboloidQ1Geometry = new THREE.ParametricGeometry(this.f_paraQ1(), this.Nu, this.Nv, false);
    this.paraboloidQ1Geometry.rotateX(-Math.PI / 2);
    this.paraboloidQ1 = new THREE.Mesh(this.paraboloidQ1Geometry, this.paraboloidMaterial);
    this.paraboloidQ1.draggable = false;

    this.paraboloidQ2Geometry = new THREE.ParametricGeometry(this.f_paraQ2(), this.Nu, this.Nv, false);
    this.paraboloidQ2Geometry.rotateX(-Math.PI / 2);
    this.paraboloidQ2 = new THREE.Mesh(this.paraboloidQ2Geometry, this.paraboloidMaterial);
    this.paraboloidQ2.draggable = false;

    this.paraboloidQ3Geometry = new THREE.ParametricGeometry(this.f_paraQ3(), this.Nu, this.Nv, false);
    this.paraboloidQ3Geometry.rotateX(-Math.PI / 2);
    this.paraboloidQ3 = new THREE.Mesh(this.paraboloidQ3Geometry, this.paraboloidMaterial);
    this.paraboloidQ3.draggable = false;

    this.paraboloidQ4Geometry = new THREE.ParametricGeometry(this.f_paraQ4(), this.Nu, this.Nv, false);
    this.paraboloidQ4Geometry.rotateX(-Math.PI / 2);
    this.paraboloidQ4 = new THREE.Mesh(this.paraboloidQ4Geometry, this.paraboloidMaterial);
    this.paraboloidQ4.draggable = false;

    this.group = new THREE.Group();
    this.group.add(this.paraboloidQ1);
    this.group.add(this.paraboloidQ2);
    this.group.add(this.paraboloidQ3);
    this.group.add(this.paraboloidQ4);
}

Paraboloid.prototype.getGroup = function(){
    return this.group;
};


Paraboloid.prototype.f_paraQ1 = function(){
    return function (u, v) {
        var x = u;
        var y = v;
        var z = x * x + y * y;
        return new THREE.Vector3(x, y, z);
    }
};

Paraboloid.prototype.f_paraQ2 = function(){

    return function (u, v) {
        var x = -u;
        var y = v;
        var z = x * x + y * y;
        return new THREE.Vector3(x, y, z);
    };
};

Paraboloid.prototype.f_paraQ3 = function(){
    return function (u, v) {
        var x = u;
        var y = -v;
        var z = x * x + y * y;
        return new THREE.Vector3(x, y, z);
    };
};

Paraboloid.prototype.f_paraQ4 = function(){
    return function (u, v) {
        var x = -u;
        var y = -v;
        var z = x * x + y * y;
        return new THREE.Vector3(x, y, z);
    };
};
