const glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");

class Utils{

	static orthoProjectPlane(point, pointPlan, vec1, vec2){
		console.log(pointPlan);
		let normal = glmatrix.vec3.create();
		glmatrix.vec3.cross(normal, vec1, vec2);
		//console.log(vec1, vec2);
		//console.log(normal);
		const plan = {
			a : normal[0],
			b : normal[1],
			c : normal[2],
			d : (-normal[0] * pointPlan[0]) + (-normal[1] * pointPlan[1]) + (-normal[2] * pointPlan[2]),
		}
		//console.log(plan);
		const beta = (-(point[0]*plan.a) - (point[1]*plan.b) - (point[2]*plan.c) - plan.d) / (plan.a * plan.a  + plan.b * plan.b + plan.c * plan.c);
		//console.log(beta);
		//console.log(point);
		return glmatrix.vec3.fromValues(point[0] + plan.a * beta, point[1] + plan.b * beta, point[2] + plan.c * beta);

	}

	static newVec(point1, point2){
		const p1 = glmatrix.vec3.create();
		glmatrix.vec3.scale(p1, point1, -1);
		const v3 = glmatrix.vec3.create();
		glmatrix.vec3.add(v3, point2, p1);
		return v3; 
	}

	static symPlane(point, planePoint, planeVec1, planeVec2){
    const proj = Utils.orthoProjectPlane(point, planePoint, planeVec1, planeVec2);
    let vec = Utils.newVec(point, proj);
    glmatrix.vec3.scale(vec, vec, 2);
    const result = glmatrix.vec3.create();
    glmatrix.vec3.add(result, point, vec);
    return result;
	}

}

module.exports = Utils;