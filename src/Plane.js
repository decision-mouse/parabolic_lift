/**
 * old color: 0xff4f38
 */

function Plane(a,b,c) {
    this.a = a;
    this.b = b;
    this.c = c;

    this.planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xf6b132,
        opacity:.3,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });

    this.planeQ1Geometry = new THREE.ParametricGeometry(this.f_planeQ1(a.getPosition(), b.getPosition(), c.getPosition()), 30, 30, false);
    this.planeQ1 = new THREE.Mesh(this.planeQ1Geometry, this.planeMaterial);
    this.planeQ1.draggable = false;

    this.planeQ2Geometry = new THREE.ParametricGeometry(this.f_planeQ2(a.getPosition(), b.getPosition(), c.getPosition()), 30, 30, false);
    this.planeQ2 = new THREE.Mesh(this.planeQ2Geometry, this.planeMaterial);
    this.planeQ2.draggable = false;

    this.planeQ3Geometry = new THREE.ParametricGeometry(this.f_planeQ3(a.getPosition(), b.getPosition(), c.getPosition()), 30, 30, false);
    this.planeQ3 = new THREE.Mesh(this.planeQ3Geometry, this.planeMaterial);
    this.planeQ3.draggable = false;

    this.planeQ4Geometry = new THREE.ParametricGeometry(this.f_planeQ4(a.getPosition(), b.getPosition(), c.getPosition()), 30, 30, false); //1st param was: p_surface
    this.planeQ4 = new THREE.Mesh(this.planeQ4Geometry, this.planeMaterial);
    this.planeQ4.draggable = false;

    this.group = new THREE.Group();
    this.group.add( this.planeQ1 );
    this.group.add( this.planeQ2 );
    this.group.add( this.planeQ3 );
    this.group.add( this.planeQ4 );

}

Plane.prototype.getGroup = function(){
    return this.group;
};

Plane.prototype.adjust = function() {
    this.a.updateLocation();
    this.b.updateLocation();
    this.c.updateLocation();

    scene.remove(this.group);

    this.planeQ1Geometry = new THREE.ParametricGeometry(this.f_planeQ1(this.a.getPosition(), this.b.getPosition(), this.c.getPosition()), 30, 30, false);
    this.planeQ1 = new THREE.Mesh(this.planeQ1Geometry, this.planeMaterial);
    this.planeQ1.draggable = false;

    this.planeQ2Geometry = new THREE.ParametricGeometry(this.f_planeQ2(this.a.getPosition(), this.b.getPosition(), this.c.getPosition()), 30, 30, false);
    this.planeQ2 = new THREE.Mesh(this.planeQ2Geometry, this.planeMaterial);
    this.planeQ2.draggable = false;

    this.planeQ3Geometry = new THREE.ParametricGeometry(this.f_planeQ3(this.a.getPosition(), this.b.getPosition(), this.c.getPosition()), 30, 30, false);
    this.planeQ3 = new THREE.Mesh(this.planeQ3Geometry, this.planeMaterial);
    this.planeQ3.draggable = false;

    this.planeQ4Geometry = new THREE.ParametricGeometry(this.f_planeQ4(this.a.getPosition(), this.b.getPosition(), this.c.getPosition()), 30, 30, false);
    this.planeQ4 = new THREE.Mesh(this.planeQ4Geometry, this.planeMaterial);
    this.planeQ4.draggable = false;

    this.group = new THREE.Group();
    this.group.add( this.planeQ1 );
    this.group.add( this.planeQ2 );
    this.group.add( this.planeQ3 );
    this.group.add( this.planeQ4 );
    globalDict['plane'] = this.group;
    scene.add(this.group);

};

Plane.prototype.f_planeQ1 = function(p1, p2, p3){
    //plane scalars
    var width = 10;
    var height = 10;
    var v1 = p2.clone().sub(p1);
    var v2 = p3.clone().sub(p1);
    var cv = new THREE.Vector3();
    cv.crossVectors(v1, v2);

    return function (u, v) {

        var scaledU = u * width;
        var scaledV = v * height;
        var z = -(cv.getComponent(0) * ( scaledU - p1.getComponent(0)) + cv.getComponent(1) * ( scaledV - p1.getComponent(1) )) / cv.getComponent(2) + p1.getComponent(2);
        var x = -(cv.getComponent(1) * ( scaledV - p1.getComponent(1)) + cv.getComponent(2) * ( z - p1.getComponent(2) )) / cv.getComponent(0) + p1.getComponent(0);
        var y = -(cv.getComponent(0) * ( scaledU - p1.getComponent(0)) + cv.getComponent(2) * ( z - p1.getComponent(2) )) / cv.getComponent(1) + p1.getComponent(1);
        return new THREE.Vector3(x, y, z);
    };
};

Plane.prototype.f_planeQ2 = function(p1, p2, p3){
    //plane scalars
    var width = -10;
    var height = 10;
    var v1 = p2.clone().sub(p1);
    var v2 = p3.clone().sub(p1);
    var cv = new THREE.Vector3();
    cv.crossVectors(v1, v2);

    return function (u, v) {

        var scaledU = u * width;
        var scaledV = v * height;
        var z = -(cv.getComponent(0) * ( scaledU - p1.getComponent(0)) + cv.getComponent(1) * ( scaledV - p1.getComponent(1) )) / cv.getComponent(2) + p1.getComponent(2);
        var x = -(cv.getComponent(1) * ( scaledV - p1.getComponent(1)) + cv.getComponent(2) * ( z - p1.getComponent(2) )) / cv.getComponent(0) + p1.getComponent(0);
        var y = -(cv.getComponent(0) * ( scaledU - p1.getComponent(0)) + cv.getComponent(2) * ( z - p1.getComponent(2) )) / cv.getComponent(1) + p1.getComponent(1);
        return new THREE.Vector3(x, y, z);
    };
};

Plane.prototype.f_planeQ3 = function(p1, p2, p3){
    //plane scalars
    var width = 10;
    var height = -10;
    var v1 = p2.clone().sub(p1);
    var v2 = p3.clone().sub(p1);
    var cv = new THREE.Vector3();
    cv.crossVectors(v1, v2);

    return function (u, v) {

        var scaledU = u * width;
        var scaledV = v * height;
        var z = -(cv.getComponent(0) * ( scaledU - p1.getComponent(0)) + cv.getComponent(1) * ( scaledV - p1.getComponent(1) )) / cv.getComponent(2) + p1.getComponent(2);
        var x = -(cv.getComponent(1) * ( scaledV - p1.getComponent(1)) + cv.getComponent(2) * ( z - p1.getComponent(2) )) / cv.getComponent(0) + p1.getComponent(0);
        var y = -(cv.getComponent(0) * ( scaledU - p1.getComponent(0)) + cv.getComponent(2) * ( z - p1.getComponent(2) )) / cv.getComponent(1) + p1.getComponent(1);
        return new THREE.Vector3(x, y, z);
    };
};

Plane.prototype.f_planeQ4 = function(p1, p2, p3){
    //plane scalars
    var width = -10;
    var height = -10;
    var v1 = p2.clone().sub(p1);
    var v2 = p3.clone().sub(p1);
    var cv = new THREE.Vector3();
    cv.crossVectors(v1, v2);

    return function (u, v) {

        var scaledU = u * width;
        var scaledV = v * height;
        var z = -(cv.getComponent(0) * ( scaledU - p1.getComponent(0)) + cv.getComponent(1) * ( scaledV - p1.getComponent(1) )) / cv.getComponent(2) + p1.getComponent(2);
        var x = -(cv.getComponent(1) * ( scaledV - p1.getComponent(1)) + cv.getComponent(2) * ( z - p1.getComponent(2) )) / cv.getComponent(0) + p1.getComponent(0);
        var y = -(cv.getComponent(0) * ( scaledU - p1.getComponent(0)) + cv.getComponent(2) * ( z - p1.getComponent(2) )) / cv.getComponent(1) + p1.getComponent(1);
        return new THREE.Vector3(x, y, z);
    };
};