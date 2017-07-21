/**
 * Created by Lynn Asselin on 7/20/17.
 */

function Circle2D(a,b,c){

    this.ab = this.getBisector(a,b);
    this.bc = this.getBisector(b,c);

    //find intersection of both bisectors
    this.center = this.findCircumcenter();

    //calculate radius
    this.radius = Math.sqrt(
                    Math.pow(a.getVector3().getComponent(0)-this.center.getComponent(0),2) +
                    Math.pow(a.getVector3().getComponent(2)-this.center.getComponent(2),2)
    );
    console.log(this.radius);

    //draw circle
    this.circleGeom = new THREE.CircleBufferGeometry(this.radius, 32 ); //radius,segments
    this.circleMaterial = new THREE.MeshBasicMaterial( {
        color: 0x6e338e,
        opacity:.3,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    } );
    this.circleMesh = new THREE.Mesh( this.circleGeom, this.circleMaterial );
    this.circleGeom.rotateX( - Math.PI / 2 );
    this.circleMesh.position.set(this.center.getComponent(0), 0, this.center.getComponent(2));    // 0 is used as the z value since the circle is in the plane
}

Circle2D.prototype.getCircleMesh = function(){
    return this.circleMesh;
};

Circle2D.prototype.getVector3 = function(){
    return new THREE.Vector3(this.x,0,this.y);
};

Circle2D.prototype.adjust = function(a,b,c) {
    this.ab = this.getBisector(a,b);
    this.bc = this.getBisector(b,c);

    //find intersection of both bisectors
    this.center = this.getCircumcenter(ab,bc);


    //calculate radius

    //draw circle
};

Circle2D.prototype.getBisector = function(a,b) {
    midX = (a.x + b.x) / 2;
    midY = (a.y + b.y) / 2;
    slope = -(b.x - a.x) / (b.y - a.y);
    return new Bisector2D(midX, midY, slope);
};

// Arbitrarily use bisectors ab and bc to find the circumcenter
Circle2D.prototype.findCircumcenter = function(){
    foundX = (-this.bc.getM()*this.bc.getX()+this.bc.getY()+this.ab.getM()*this.ab.getX()-this.ab.getY())/(this.ab.getM()-this.bc.getM());
    foundY = this.bc.getM()*foundX - this.bc.getM()*this.bc.getX()+this.bc.getY();
    console.log(new THREE.Vector3(foundX, 0, foundY));
    return new THREE.Vector3(foundX, 0, foundY);

};

// Arbitrarily use distance from center to point a
Circle2D.prototype.findRadius = function(){
    this.center.getComponent(0)
};