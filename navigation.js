

var movingSpeed = 1;
var movingSpeedVec3 = vec3(movingSpeed, movingSpeed, movingSpeed);


var navigationDict = {
    "Forward": [false, vec3()],
    "Backward": [false, vec3()],
    "Left": [false, vec3()],
    "Right": [false, vec3()],
    "Up": [false, vec3()],
    "Down": [false, vec3()],
    "RotateUp": [false, vec3()],
    "RotateDown": [false, vec3()]
}

// For resetting oppsite direction to zero 
// As we add the movement to whatever is left, clicking opposite direction might not have any effect
// ex. when you clicked left 1000 times and want to turn right,
// without reset you also have to click right 1000 times.
var oppositeDirectionOf = {
    "Forward" : "Backward",
    "Backward" : "Forward",
    "Left" : "Right",
    "Right" : "Left",
    "Up" : "Down",
    "Down" : "Up",
    "RotateUp" : "RotateDown",
    "RotateDown" : "RotateUp"
}

var initialPoint = vec2(0, 0);
var nextPoint = vec2(0, 0);
// function canvasToWorld(x, y){
//     var canvasX = 2*x/canvas.width-1;
//     var canvasY = 2*(canvas.height-y)/canvas.height-1;
//     return vec2(canvasX, canvasY);
// }

var fromPositionToTarget;
var upEndPoint;
var fromPositionToUp;
var crossProduct;
var rotMat4;
var movingMode = false;

function addNavigationTo(element){

    element.addEventListener('mousedown', function (event) {
        // print("X");
        // print(event.clientX);
        // print("Y")
        // print(event.clientY);
        if(movingMode){
            movingMode = false;
        }else {
            movingMode = true;
        }
        // print(canvasToWorld(event.clientX, event.clientY));
        // fromPositionToTarget = findVector(camera.position, camera.target);
        // upEndPoint = vec3();
        // glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
        // fromPositionToUp = findVector(camera.position, upEndPoint);
        // crossProduct = vec3();
        // glMatrix.vec3.cross(crossProduct, fromPositionToUp, fromPositionToTarget);
        // glMatrix.vec3.rotateY(fromPositionToTarget, fromPositionToTarget, vec3(0, 1, 0), 0.001*Math.PI/180);
        // glMatrix.vec3.add(camera.target, fromPositionToTarget, camera.position);

        // rotMat4 = mat4();
        // glMatrix.mat4.fromRotation(rotMat4, 45*Math.PI/180, crossProduct);
        // glMatrix.vec3.transformMat4(camera.target, camera.target, rotMat4);
        // glMatrix.vec3.transformMat4(upEndPoint, upEndPoint, rotMat4);
        // camera.target = rotMat4;
        // camera.up
        // print("get");
    });
    element.addEventListener('mouseup', function (event) {
        // sphereMatrix = mult(calcRotation(), sphereMatrix);
        // vInitial = vCurrent;
        // mouseDown = false;
        // print("GET");

    });
    element.addEventListener('mousemove', function (event) {
        // if (!mouseDown) return;
        // vCurrent = eventToWorld(event);
        // print("GETME");
        // print(event)
        if(movingMode){
            // print("START");
            // print(event.movementX);
            // print("EvenetY");
            // print(event.movementY);
            // print("END");
            var cameraPosition = vec3();
            glMatrix.vec3.add(cameraPosition, camera.position, vec3());
            // print("CAMERA POSITION BEFORE");
            // print(camera.position);
            // print("CAMERA TARGET");
            // print(camera.target);
            glMatrix.vec3.sub(camera.target, camera.target, cameraPosition);
            glMatrix.vec3.sub(camera.position, camera.position, cameraPosition);
            // print("CAMERA POSITION After");
            // print(camera.position);
            // print("CAMERA TARGET");
            // print(camera.target);
            // print("DEF");
            var fromPositionToTarget = findVector(camera.position, camera.target);
            // print(fromPositionToTarget);
            fromPositionToTarget = normalize(fromPositionToTarget);
            // var upEndPoint = vec3();
            // glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
            // var fromPositionToUp = findVector(camera.position, upEndPoint);
            var crossProduct = vec3();
            // print("HERE");
            glMatrix.vec3.cross(crossProduct, camera.up, fromPositionToTarget);
            crossProduct = normalize(crossProduct);
            print("THERE");
            print("CROSS");
            print(crossProduct);


            var mat4toRotateY = mat4();
            glMatrix.mat4.fromRotation(mat4toRotateY, event.movementY*Math.PI/180/2, crossProduct);
            var mat4toRotateX = mat4();
            glMatrix.mat4.fromRotation(mat4toRotateX, -event.movementX*Math.PI/180/2, camera.up);


            // glMatrix.vec3.rotateX(camera.target, camera.target, vec3(), (1-crossProduct[0])*event.movementX*Math.PI/180);
            // glMatrix.vec3.rotateY(camera.target, camera.target, vec3(), (1-crossProduct[1])*event.movementX*Math.PI/180)
            // glMatrix.vec3.rotateZ(camera.target, camera.target, vec3(), (1-crossProduct[2])*event.movementX*Math.PI/180)
            // print("CAMERA POSITION ARRAY");
            // print(cameraPosition);
            glMatrix.vec3.transformMat4(camera.target, camera.target, mat4toRotateY);
            var fromPositionToTarget = findVector(camera.position, camera.target);
            print(fromPositionToTarget);
            fromPositionToTarget = normalize(fromPositionToTarget);
            // var upEndPoint = vec3();
            // glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
            // var fromPositionToUp = findVector(camera.position, upEndPoint);
            // crossProduct = vec3();
            // print("HERE");
            // glMatrix.vec3.cross(crossProduct, camera.up, fromPositionToTarget);
            // crossProduct = normalize(crossProduct);
            print("THERE");
            print("CROSS");
            print(crossProduct);
            var crossForUp = vec3();
            glMatrix.vec3.cross(crossForUp, camera.target, crossProduct);
            crossForUp = normalize(crossForUp);
            // glMatrix.vec3.transformMat4(camera.up, camera.up, mat4toRotateX);
            camera.up = crossForUp;
            print("camera up");
            print(camera.up);
            glMatrix.vec3.add(camera.target, camera.target, cameraPosition);
            glMatrix.vec3.add(camera.position, camera.position, cameraPosition);
            print("CAMERA UP");
            print(camera.up);
            
            glMatrix.vec3.transformMat4(camera.target, camera.target, mat4toRotateX);
            // print("CAMERA POSITION After Addition");
            // print(camera.position);
            // print("CAMERA TARGET");
            // print(camera.target);

            // camera.target = vec3();
            // glMatrix.
            // camera.position = vec3();

            // var mat4toRotate = mat4();

            // var position = vec3(0, 0, 0);
            // var target = vec3(0, 0, -1);
            // var up = vec3(0, 1, 0);

            // var x = vec3(0, 0, 0);
            // var y = vec3(0, 0, 0);
            // var center = vec3(0, 0, 0);
            // var tilt_rotate = 
            // glMatrix.vec3.rotateY(camera.target, camera.target, camera.position, -event.movementX*Math.PI/180);

        // let sensitivity = 0.02;
        // nextPoint[0] = event.movementX/100;
        // nextPoint[1] = event.movementY/100;

        // fromPositionToTarget = findVector(camera.position, camera.target);
        // upEndPoint = vec3();
        // glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
        // fromPositionToUp = findVector(camera.position, upEndPoint);
        // crossProduct = vec3();
        // // glMatrix.vec3.cross(crossProduct, camera.up, fromPositionToTarget);
        // crossProuct = cross(normalize(fromPositionToTarget), camera.up);
        // var mat4toRotate = mat4();

        // print("MAT4")
        // print(mat4toRotate);
        // glMatrix.mat4.rotate(mat4toRotate, mat4toRotate, event.movementX*Math.PI/180, vec3(0, 1, 0));
        // camera.target
        // glMatrix.vec3.transformMat4(camera.target, camera.target, mat4toRotate);
        // print("AFTER")
        // print(mat4toRotate);
        // camera.rotate(event.movementX);
        // glMatrix.vec3.rotateY(camera.target, camera.target, camera.position, -nextPoint[0]);
        // glMatrix.vec3.rotateX(camera.target, camera.target, camera.position, -nextPoint[1]);

        // fromPositionToTarget = normalize(findVector(camera.position, camera.target));

        // camera.up = cross(fromPositionToTarget, crossProduct);
        // var upPos = vec3();
        // glMatrix.vec3.cross(upPos, crossProduct, fromPositionToTarget);
        // camera.up = normalize(upPos);
        // print(camera.up);

        // nextPoint[0] = initialPoint[0] - event.movementY * sensitivity;
        // nextPoint[1] = initialPoint[1] - event.movementX * sensitivity;

        // if (nextPoint[0] < -Math.PI / 2) {
        //     nextPoint[0] = -Math.PI / 2;
        // }
        // if (nextPoint[0] > Math.PI / 2) {
        //     nextPoint[0] = Math.PI / 2;
        // }
        // xMovement = event.movementX - initialPoint[0]; //+ initialPoint[0];
        // yMovement = event.movementY - initialPoint[1]; //+ initialPoint[1];
        // nextPoint = vec2(xMovement, yMovement);
        // var diff = vec2();
        // glMatrix.vec2.subtract(diff, initialPoint, nextPoint);

        // fromPositionToTarget = findVector(camera.position, camera.target);
        // upEndPoint = vec3();
        // glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
        // fromPositionToUp = findVector(camera.position, upEndPoint);
        // crossProduct = vec3();
        // glMatrix.vec3.cross(crossProduct, fromPositionToUp, fromPositionToTarget);
        // camera.rotate()
        // glMatrix.vec3.rotateZ(camera.target, camera.target, vec3(nextPoint, 0), 5*Math.PI/180);
        // glMatrix.vec3.rotateX(fromPositionToTarget, fromPositionToTarget, vec3(0,1,0), diff);
        // camera.target = vec3(mult_v(rotate(0.0001, vec3(0, 1, 0)), vec4(nextPoint)))
        // glMatrix.vec3.rotateY(fromPositionToTarget, fromPositionToTarget, camera.up, xMovement*Math.PI/1800);
        // glMatrix.vec3.rotateX(fromPositionToTarget, fromPositionToTarget, camera.up, -yMovement*Math.PI/1800);
        // glMatrix.vec3.add(camera.target, fromPositionToTarget, camera.position);
        // initialPoint = nextPoint;
        // camera.rotateX(-nextPoint[0]);
        // camera.rotateY(nextPoint[1]);

        // initialPoint = nextPoint;
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
                var upEndPoint = vec3();
                glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
                var fromPositionToUp = findVector(camera.position, upEndPoint);
                var crossProduct = vec3();
                glMatrix.vec3.cross(crossProduct, fromPositionToUp, fromPositionToTarget);
                var endingPoint = vec3();
                glMatrix.vec3.add(endingPoint, crossProduct, camera.position);
                var pointsToAdd = findIteration(camera.position, endingPoint);
                addMovements("Left", pointsToAdd);
                break;
            case 68: // d
                // TODO: Refactor
                var fromPositionToTarget = findVector(camera.position, camera.target);
                var upEndPoint = vec3();
                glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
                var fromPositionToUp = findVector(camera.position, upEndPoint);
                var crossProduct = vec3();
                glMatrix.vec3.cross(crossProduct, fromPositionToUp, fromPositionToTarget);
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
            case 39: // Arrow Right
                glMatrix.vec3.rotateY(camera.target, camera.target, camera.position, -movingSpeed*Math.PI/180);
                break;
            case 37: // Arrow Left
                glMatrix.vec3.rotateY(camera.target, camera.target, camera.position, movingSpeed*Math.PI/180);
                break;
            case 38: // Arrow Up
                movingSpeed +=0.1;
                movingSpeedVec3 = vec3(movingSpeed, movingSpeed, movingSpeed);
                // camera.target[1] += movingSpeed;
                break;
            case 40: // Arrow Down
                if (movingSpeed > 1){
                    movingSpeed -=0.1;
                    movingSpeedVec3 = vec3(movingSpeed, movingSpeed, movingSpeed);
                } 
                // camera.target[1] -= movingSpeed;
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
    // print(navigationDict[direction]);
    navigationDict[direction][0] = true;
    glMatrix.vec3.mul(pointsToAdd, pointsToAdd, movingSpeedVec3);
    navigationDict[direction][1] = pointsToAdd;

    // Resetting opposite direction movement
    // navigationDict[oppositeDirectionOf[direction]][0] = false;
    // print(navigationDict[direction]);
    // print(navigationDict);
    // movementLeft = movingSpeed;
}


function resetMovements(direction){
    navigationDict[direction][0] = false;
}

function updateMovementCount(){
    if (movementLeft > 0){
        movementLeft--;
    }else {
        shouldMoveTo = ""
    }    
}

function checkNavigation(){
    for (var key in navigationDict) {
        if(navigationDict[key][0] == true) {

        var pointsToAdd = navigationDict[key][1];
        // print(navigationDict[key]);
        // print(pointsToAdd);
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

        // navigationDict[key][0]=1;

            // print(navigationDict[key]);
    }

}


}

