# paraboliclift
<h1>First off, people I need to thank:</h1>

- Dr. Don Sheehy at the University of Connecticut for offering an inspiring Computational Geometry course.

- To the contributors to the catmull spline editor example on the three.js website at: https://github.com/mrdoob/three.js/blob/dev/examples/webgl_geometry_spline_editor.html
  The template provided allowed me to focus on the making my project work by making it look good from the start.

<h1>The Pieces</h1>

For this project I separated the classes into their own .js files to hopefully enhance readability.
I tried to maintain as much of an object oriented style as possible.

Point2D:
A class which encompasses the representation of a 2d point on the plane with a circle on the plane whose center is the point, a sphere in 3d space whose center is the projected point, and a dashed line between them signifying their connection.

Paraboloid:
A class which encompasses the representation of the paraboloid as 4 three.js mesh objects. The parametric geometry objects of three.js are parameterized on the interval [0,1] thus to fill the four quadrants we must account the four combinations of parameterized values (+,+),(+,-),(-,+),(-,-). The final representation is a group of the four meshes for this object.

Plane:
This is the class which represents the hyperplane passing through the three lifted cocircular points. First we calculate the normal vector using the cross product of two of our points converted to vectors, then we solve the linear system of equations for the plane for the remaining point.

PlaneSideTester:
This class calculates which side of the plane through the 3 lifted cocircular points the query point is on. This is done by converting the 3d lifted points into 4d homogeneous points, and then combining them into a matrix. The sign of the determinant of this matrix determines the location of the query point relative to the circle in 2d.

Bisector2D:
This class stores the mid point between two points in 2d and the slope of their perpendicular bisector. Note: There is no visual component for this class.

Circle2D:
This class calculates its center using the intersection point of two perpendicular bisectors by solving their system of linear equations. Then, it finds the distance from the center to one of the cocircular points to find the radius.
