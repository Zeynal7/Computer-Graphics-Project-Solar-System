
function findVector(start, end){
	var out = vec3();
	glMatrix.vec3.subtract(out, end, start);
	return out;
}

function getUnitVectorFromPoints(p1, p2){
	var vector = findVector(p1, p2);
	var lengthOfVector = glMatrix.vec3.length(vector);
	return vec3(vector[0]/lengthOfVector, vector[1]/lengthOfVector, vector[2]/lengthOfVector);
}

function findInBetweenPoints(point1, point2){
    var x1 = point1[0], y1 = point1[1], z1 = point1[2];
    var x2 = point2[0], y2 = point2[1], z2 = point2[2];
    var listOfPoints = [];
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var dz = Math.abs(z2 - z1);
    if (x2 > x1){
        xs = 1;
    }else{
        xs = -1;
    }
    if (y2 > y1){ 
        ys = 1;
    }else{
        ys = -1;
    }
    if (z2 > z1){
        zs = 1;
    }else{ 
        zs = -1;
    }
  
    if (dx >= dy && dx >= dz){      
        p1 = 2 * dy - dx; 
        p2 = 2 * dz - dx;
        x1 += xs;
        if (p1 >= 0){
            y1 += ys;
            p1 -= 2 * dx;
        }
        if (p2 >= 0){
            z1 += zs;
            p2 -= 2 * dx;
        }
        p1 += 2 * dy; 
        p2 += 2 * dz; 
    }else if (dy >= dx && dy >= dz){        
        p1 = 2 * dx - dy;
        p2 = 2 * dz - dy; 
            y1 += ys;
            if (p1 >= 0){ 
                x1 += xs;
                p1 -= 2 * dy;
            } 
            if (p2 >= 0){
                z1 += zs; 
                p2 -= 2 * dy; 
            }
            p1 += 2 * dx; 
            p2 += 2 * dz; 
    }else{    
        p1 = 2 * dy - dz; 
        p2 = 2 * dx - dz; 
            z1 += zs;
            if (p1 >= 0){
                y1 += ys;
                p1 -= 2 * dz;
                } 
            if (p2 >= 0){ 
                x1 += xs; 
                p2 -= 2 * dz;
                } 
            p1 += 2 * dy; 
            p2 += 2 * dx;
        }

        return vec3(x1, y1, z1);
    };


// Finding the vector to add to the initial point
function findIteration(point1, point2){
    var nextPoint = findInBetweenPoints(point1, point2);
    var pointsToAdd2 = vec3();
    glMatrix.vec3.subtract(pointsToAdd2, point1, nextPoint);
    pointsToAdd2 = vec3(pointsToAdd2[0], pointsToAdd2[1], pointsToAdd2[2]);
    return pointsToAdd2;
}

// function getXYZ(vector){
//     return vector[0], vector[1], vector[2]);
// }
