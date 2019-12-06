

var movingSpeed = 40;
var movingSpeedVec3 = vec3(movingSpeed, movingSpeed, movingSpeed);

var shouldMoveTo = "";
var movementLeft = 0;
var pointsToAdd = vec3();


function addEventListeners(element){

    // canvas.addEventListener('mousedown', function (event) {
    //     mouseDown = true;
    //     vInitial = eventToWorld(event);
    //     vCurrent = vInitial;
    //     console.log(vInitial);
    // });
    // canvas.addEventListener('mouseup', function (event) {
    //     sphereMatrix = mult(calcRotation(), sphereMatrix);
    //     vInitial = vCurrent;
    //     mouseDown = false;
    // });
    // canvas.addEventListener('mousemove', function (event) {
    //     if (!mouseDown) return;
    //     vCurrent = eventToWorld(event);
    // });

    
    element.addEventListener('keydown', function(e) {
        // console.log(e); // TODO fix movements by finding the vector of the points
        // https://math.stackexchange.com/questions/83404/finding-a-point-along-a-line-in-three-dimensions-given-two-points
        switch(e.keyCode){
            case 87: // w
                window.pointsToAdd = findIteration(camera.position, camera.target);
                addMovements("Forward");
                break;
            case 83: // s
                window.pointsToAdd = findIteration(camera.position, camera.target);
                addMovements("Backward");
                break;
            case 65: // a
                var fromPositionToTarget = findVector(camera.position, camera.target);
                var upEndPoint = vec3();
                glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
                var fromPositionToUp = findVector(camera.position, upEndPoint);
                var crossProduct = vec3();
                glMatrix.vec3.cross(crossProduct, fromPositionToUp, fromPositionToTarget);
                var endingPoint = vec3();
                glMatrix.vec3.add(endingPoint, crossProduct, camera.position);
                window.pointsToAdd = findIteration(camera.position, endingPoint);
                addMovements("Left");
                break;
            case 68: // d
                var fromPositionToTarget = findVector(camera.position, camera.target);
                var upEndPoint = vec3();
                glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
                var fromPositionToUp = findVector(camera.position, upEndPoint);
                var crossProduct = vec3();
                glMatrix.vec3.cross(crossProduct, fromPositionToUp, fromPositionToTarget);
                var endingPoint = vec3();
                glMatrix.vec3.add(endingPoint, crossProduct, camera.position);
                window.pointsToAdd = findIteration(camera.position, endingPoint);
                addMovements("Right");
                break;
            case 88: // x - down
                var upEndPoint = vec3();
                glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
                window.pointsToAdd = findIteration(camera.position, upEndPoint);                
                addMovements("Down");              
                break; 
            case 90: // z - up
                var upEndPoint = vec3();
                glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
                window.pointsToAdd = findIteration(camera.position, upEndPoint);
                addMovements("Up");           
                break; 
            case 39: // Arrow Right
                glMatrix.vec3.rotateY(camera.target, camera.target, camera.position, -movingSpeed*Math.PI/180);
                break;
            case 37: // Arrow Left
                glMatrix.vec3.rotateY(camera.target, camera.target, camera.position, movingSpeed*Math.PI/180);
                break;
            case 38: // Arrow Up
                camera.target[1] += movingSpeed;
                break;
            case 40: // Arrow Down
                camera.target[1] -= movingSpeed;
                break;
        }
    });
}


function addMovements(direction){
    shouldMoveTo = direction;
    movementLeft = movingSpeed;
}


function updateMovementCount(){
    if (movementLeft > 0){
        movementLeft--;
    }else {
        shouldMoveTo = ""
    }    
}

function checkNavigation(){
    switch(shouldMoveTo){
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
    updateMovementCount();
}

