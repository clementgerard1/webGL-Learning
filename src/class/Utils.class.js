const glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");

class Utils{

	static nextID=-1;

	static newID(){
		this.nextID = this.nextID + 1;
		return this.nextID;
	}

	static orthoProjectPlane(point, pointPlan, vec1, vec2){
		let normal = glmatrix.vec3.create();
		glmatrix.vec3.cross(normal, vec1, vec2);
		const plan = {
			a : normal[0],
			b : normal[1],
			c : normal[2],
			d : (-normal[0] * pointPlan[0]) + (-normal[1] * pointPlan[1]) + (-normal[2] * pointPlan[2]),
		}
		const beta = (-(point[0]*plan.a) - (point[1]*plan.b) - (point[2]*plan.c) - plan.d) / (plan.a * plan.a  + plan.b * plan.b + plan.c * plan.c);
		return glmatrix.vec3.fromValues(point[0] + plan.a * beta, point[1] + plan.b * beta, point[2] + plan.c * beta);

	}

	static newVec3(point1, point2){
		const p1 = glmatrix.vec3.create();
		glmatrix.vec3.scale(p1, point1, -1);
		const v3 = glmatrix.vec3.create();
		glmatrix.vec3.add(v3, point2, p1);
		return v3; 
	}

	static newVec4(point1, point2){
		const p1 = glmatrix.vec4.create();
		glmatrix.vec4.scale(p1, point1, -1);
		const v4 = glmatrix.vec4.create();
		glmatrix.vec4.add(v4, point2, p1);
		v4[3] = 1;
		return v4; 
	}

	static symPlane(point, planePoint, planeVec1, planeVec2){
    const proj = Utils.orthoProjectPlane(point, planePoint, planeVec1, planeVec2);
    let vec = Utils.newVec(point, proj);
    glmatrix.vec3.scale(vec, vec, 2);
    const result = glmatrix.vec3.create();
    glmatrix.vec3.add(result, point, vec);
    return result;
	}

	static getCentroid(vec1, vec2, vec3){
		return [ (vec1[0] + vec2[0] + vec3[0]) / 3 , (vec1[1] + vec2[1] + vec3[1]) / 3 , (vec1[2] + vec2[2] + vec3[2]) / 3 ];
	}

	static fromDegToDotSpace(x){
		return Math.cos((x / 180) * Math.PI);
	}

}

module.exports = Utils;