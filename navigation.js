

var movingSpeed = 0.7;
var movingSpeedVec3 = vec3(movingSpeed, movingSpeed, movingSpeed);
var movingMode = false;

var navigationInfo = {
    "Forward": [false, vec3()],
    "Backward": [false, vec3()],
    "Left": [false, vec3()],
    "Right": [false, vec3()],
    "Up": [false, vec3()],
    "Down": [false, vec3()],
    "RotateUp": [false, vec3()],
    "RotateDown": [false, vec3()]
}

function addNavigationTo(element){

    element.addEventListener('mousedown', function (event) {
        movingMode = !movingMode;
    });
    element.addEventListener('mousemove', function (event) {
        if(movingMode){
            // Getting old camera position and Moving Camera to origin
            // Getting direct copy result in only reference of a variable, not a copy itself.
            var oldCameraPosition = vec3();
            glMatrix.vec3.add(oldCameraPosition, camera.position, vec3());
            glMatrix.vec3.sub(camera.target, camera.target, oldCameraPosition);
            glMatrix.vec3.sub(camera.position, camera.position, oldCameraPosition);

            // Finding position to Target vector, and 
            // getting cross product with up vector to get vector to the left
            var fromPositionToTarget = findVector(camera.position, camera.target);
            fromPositionToTarget = normalize(fromPositionToTarget);
            var crossProduct = vec3();
            glMatrix.vec3.cross(crossProduct, camera.up, fromPositionToTarget);
            crossProduct = normalize(crossProduct);


            // Creating Rotation Matrices around X and Y axises
            var mat4toRotateY = mat4();
            var mat4toRotateX = mat4();

            glMatrix.mat4.fromRotation(mat4toRotateY, event.movementY*Math.PI/180/2, crossProduct);
            glMatrix.mat4.fromRotation(mat4toRotateX, -event.movementX*Math.PI/180/2, camera.up);

            var targetAfterRotation = vec3();
            glMatrix.vec3.add(targetAfterRotation, camera.target, vec3());
            glMatrix.vec3.transformMat4(targetAfterRotation, targetAfterRotation, mat4toRotateY);
            glMatrix.vec3.transformMat4(targetAfterRotation, targetAfterRotation, mat4toRotateX);

            // Check new target, if target is in the same direction with 'up' vector, then don't allow it
            fromPositionToTarget = findVector(camera.position, targetAfterRotation);
            var dotProductOfPosToTargetWithUp = glMatrix.vec3.dot(normalize(fromPositionToTarget), camera.up);
            if (Math.abs(dotProductOfPosToTargetWithUp) < 0.985) {
                glMatrix.vec3.transformMat4(camera.target, camera.target, mat4toRotateY);
                glMatrix.vec3.transformMat4(camera.target, camera.target, mat4toRotateX);
            }

            glMatrix.vec3.add(camera.target, camera.target, oldCameraPosition);
            glMatrix.vec3.add(camera.position, camera.position, oldCameraPosition);
    }
    });



    
    element.addEventListener('keydown', function(e) {
        // console.log(e); // TODO fix movements by finding the vector of the points
        // https://math.stackexchange.com/questions/83404/finding-a-point-along-a-line-in-three-dimensions-given-two-points
        switch(e.keyCode){
            case 87: // w
                var pointsToAdd = findIteration(camera.position, camera.target);
                addMovements("Forward", pointsToAdd);
                break;
            case 83: // s
                var pointsToAdd = findIteration(camera.position, camera.target);
                addMovements("Backward", pointsToAdd);
                break;
            case 65: // a
                var fromPositionToTarget = findVector(camera.position, camera.target);
                var crossProduct = vec3();
                glMatrix.vec3.cross(crossProduct, camera.up, fromPositionToTarget);
                var endingPoint = vec3();
                glMatrix.vec3.add(endingPoint, crossProduct, camera.position);
                var pointsToAdd = findIteration(camera.position, endingPoint);
                addMovements("Left", pointsToAdd);
                break;
            case 68: // d
                // TODO: Refactor
                var fromPositionToTarget = findVector(camera.position, camera.target);
                var crossProduct = vec3();
                glMatrix.vec3.cross(crossProduct, camera.up, fromPositionToTarget);
                var endingPoint = vec3();
                glMatrix.vec3.add(endingPoint, crossProduct, camera.position);
                var pointsToAdd = findIteration(camera.position, endingPoint);
                addMovements("Right", pointsToAdd);
                break;
            case 88: // x - down
                var upEndPoint = vec3();
                glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
                var pointsToAdd = findIteration(camera.position, upEndPoint);                
                addMovements("Down", pointsToAdd);              
                break; 
            case 90: // z - up
                var upEndPoint = vec3();
                glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
                var pointsToAdd = findIteration(camera.position, upEndPoint);
                addMovements("Up", pointsToAdd);           
                break; 
            case 38: // Arrow Up
                movingSpeed +=0.05;
                movingSpeedVec3 = vec3(movingSpeed, movingSpeed, movingSpeed);
                break;
            case 40: // Arrow Down
                if (movingSpeed > 0.05){
                    movingSpeed -=0.05;
                    movingSpeedVec3 = vec3(movingSpeed, movingSpeed, movingSpeed);
                } 
                break;
        }
    });

    element.addEventListener('keyup', function(e) {
        // console.log(e); // TODO fix movements by finding the vector of the points
        // https://math.stackexchange.com/questions/83404/finding-a-point-along-a-line-in-three-dimensions-given-two-points
        switch(e.keyCode){
            case 87: // w
                resetMovements("Forward");
                break;
            case 83: // s
                resetMovements("Backward");
                break;
            case 65: // a
                resetMovements("Left");
                break;
            case 68: // d
                resetMovements("Right");
                break;
            case 88: // x - down
                resetMovements("Down");              
                break; 
            case 90: // z - up
                resetMovements("Up");           
                break;
        }
    });
}


function addMovements(direction, pointsToAdd){
    navigationInfo[direction][0] = true;
    glMatrix.vec3.mul(pointsToAdd, pointsToAdd, movingSpeedVec3);
    navigationInfo[direction][1] = pointsToAdd;
}


function resetMovements(direction){
    navigationInfo[direction][0] = false;
}


function checkNavigation(){
    for (var key in navigationInfo) {
        if(navigationInfo[key][0] == true) {

        var pointsToAdd = navigationInfo[key][1];

            switch(key){
                case "Forward":
                    glMatrix.vec3.subtract(camera.target, camera.target, pointsToAdd);
                    glMatrix.vec3.subtract(camera.position, camera.position, pointsToAdd);
                    break;
                case "Backward":
                    glMatrix.vec3.add(camera.target, camera.target, pointsToAdd);
                    glMatrix.vec3.add(camera.position, camera.position, pointsToAdd);
                    break;
                case "Left":
                    glMatrix.vec3.subtract(camera.target, camera.target, pointsToAdd);
                    glMatrix.vec3.subtract(camera.position, camera.position, pointsToAdd);
                    break;
                case "Right":
                    glMatrix.vec3.add(camera.target, camera.target, pointsToAdd);
                    glMatrix.vec3.add(camera.position, camera.position, pointsToAdd);
                    break;
                case "Down":
                    glMatrix.vec3.add(camera.target, camera.target, pointsToAdd);
                    glMatrix.vec3.add(camera.position, camera.position, pointsToAdd);
                    break;
                case "Up":
                    glMatrix.vec3.subtract(camera.target, camera.target, pointsToAdd);
                    glMatrix.vec3.subtract(camera.position, camera.position, pointsToAdd);
                    break;
            } 
    }

}


}

