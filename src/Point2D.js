/**
 *
 * old color: 0x9932CC
 */

function Point2D(x,y,color=0xf6b132){
    //x and y are ideally in the world coordinates

    this.color = color;

    this.x = x;
    this.y = -y;
    this.z = this.x*this.x+this.y*this.y;

    this.pointGeom = new THREE.CircleGeometry(.03, 32 );//.075
    this.pointGeom.rotateX( - Math.PI / 2 );
    this.pointMaterial = new THREE.MeshLambertMaterial({
        color: this.color,
        //opacity: 0.1,
        //transparent: false,
        side: THREE.DoubleSide,
        depthWrite: true
    });
    this.pointMesh = new THREE.Mesh( this.pointGeom, this.pointMaterial );
    this.pointMesh.draggable = true;
    this.pointMesh.position.set(this.x, 0, this.y);

    this.liftedPointGeom = new THREE.SphereGeometry(.03, 32, 32 );
    this.liftedPointMesh = new THREE.Mesh( this.liftedPointGeom, this.pointMaterial );
    this.liftedPointMesh.draggable = true;
    this.liftedPointMesh.position.set(this.x, this.z, this.y);

    this.lineGeometry = new THREE.Geometry();
    this.lineGeometry.vertices.push(this.pointMesh.position);
    this.lineGeometry.vertices.push(this.liftedPointMesh.position);
    this.lineGeometry.computeLineDistances();
    this.lineMaterial = new THREE.LineDashedMaterial( {
        color: 0xf6b132,
        scale: 1,
        dashSize:.01,
        gapSize: .01
    } );

    this.lineMesh = new THREE.Line(this.lineGeometry, this.lineMaterial);
}

Point2D.prototype.getLineMesh = function(){
    return this.lineMesh;
};

Point2D.prototype.getVector3 = function(){
    return this.pointMesh.position;
};

Point2D.prototype.getLiftedVector3 = function(){
    return new THREE.Vector3(this.x,this.z,this.y);
};

Point2D.prototype.getPosition = function(){
    return this.liftedPointMesh.position;
};

Point2D.prototype.getPointMesh = function(){
    return this.pointMesh;
};

Point2D.prototype.getLiftedPointMesh = function(){
    return this.liftedPointMesh;
};

Point2D.prototype.updateLocation = function(){
    this.x = this.pointMesh.position.getComponent(0);
    this.z = this.pointMesh.position.getComponent(2);
    //naive fix for restricting three.js' transformcontrols
    if(this.pointMesh.position.getComponent(1)!= 0){
        this.pointMesh.position.set(this.x,0,this.z);
    }

    this.y = this.x*this.x+this.z*this.z;
    this.liftedPointMesh.position.set(this.x, this.y, this.z);
    //console.log('point location' , this.pointMesh.position);
    scene.remove(this.lineMesh);
    this.lineGeometry = new THREE.Geometry();
    this.lineGeometry.vertices.push(this.pointMesh.position);
    this.lineGeometry.vertices.push(this.liftedPointMesh.position);
    this.lineGeometry.computeLineDistances();
    this.lineMesh = new THREE.Line(this.lineGeometry, this.lineMaterial);
    scene.add(this.lineMesh);
};

Point2D.prototype.setColor = function(determinant){

    if(determinant > 0){
        this.getPointMesh().material.color.setHex( 0x1d6260 );
        this.lineMesh.material.color.setHex( 0x1d6260 );
    }else if(determinant < 0){
        this.getPointMesh().material.color.setHex( 0x37b7b5 );
        this.lineMesh.material.color.setHex( 0x37b7b5 );
    }else{
        this.getPointMesh().material.color.setHex( 0xF6B132 );
        this.lineMesh.material.color.setHex( 0xF6B132 );
    }
};