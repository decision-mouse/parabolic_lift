/**
 * Created by Lynn Asselin on 7/20/17.
 */

function Circle2D(a,b,c){
    this.ab = this.getBisector(a.getVector3(),b.getVector3());
    // using b,c doesn't work, most likely because of how findCircumcenter() is calculated. Fix later.
    this.ac = this.getBisector(a.getVector3(),c.getVector3());
    //find intersection of both bisectors
    this.center = this.findCircumcenter();

    //calculate radius
    this.radius = Math.sqrt(
                    Math.pow(a.getVector3().getComponent(0)-this.center.getComponent(0),2) +
                    Math.pow(a.getVector3().getComponent(2)-this.center.getComponent(2),2)
    );
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
    return this.center;
};

Circle2D.prototype.update = function(a,b,c) {
    scene.remove(this.circleMesh);
    this.ab = this.getBisector(a.getVector3(),b.getVector3());
    this.ac = this.getBisector(a.getVector3(),c.getVector3());
    this.center = this.findCircumcenter();
    //calculate radius
    this.radius = Math.sqrt(
        Math.pow(a.getVector3().getComponent(0)-this.center.getComponent(0),2) +
        Math.pow(a.getVector3().getComponent(2)-this.center.getComponent(2),2)
    );

    //draw circle
    this.circleGeom = new THREE.CircleBufferGeometry(this.radius, 64 ); //radius,segments
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
    scene.add(this.circleMesh);
};

Circle2D.prototype.getBisector = function(a,b) {
    midX = (a.getComponent(0) + b.getComponent(0)) / 2;
    midY = (a.getComponent(2) + b.getComponent(2)) / 2;
    slope = -(b.getComponent(0) - a.getComponent(0)) / (b.getComponent(2) - a.getComponent(2));//old slope
    //slope = (b.y- a.y) / (b.x- a.x);
    if(slope == Infinity){
        slope = 0;
    }
    return new Bisector2D(midX, midY, slope);
};

// Arbitrarily use bisectors ab and ac to find the circumcenter
// Arbitrarily use bisectors ab and ac to find the circumcenter
Circle2D.prototype.findCircumcenter = function(){
    foundX = (this.ab.getM()*this.ab.getX()-this.ab.getY()-this.ac.getM()*this.ac.getX()+this.ac.getY()) / (this.ab.getM()-this.ac.getM());
    foundY = this.ac.getM()*foundX - this.ac.getM()*this.ac.getX()+this.ac.getY();
    return new THREE.Vector3(foundX, 0, foundY);
};