

var movingSpeed = 10;
var movingSpeedVec3 = vec3(movingSpeed, movingSpeed, movingSpeed);

var shouldMoveTo = "";
var movementLeft = 0;
var pointsToAdd = vec3();

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
        print("X");
        print(event.clientX);
        print("Y")
        print(event.clientY);
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
        print(event)
        if(movingMode){
        // let sensitivity = 0.02;
        nextPoint[0] = event.movementX/100;
        nextPoint[1] = event.movementY/100;

        glMatrix.vec3.rotateY(camera.target, camera.target, camera.position, -nextPoint[0]/10);
        glMatrix.vec3.rotateX(camera.target, camera.target, camera.position, -nextPoint[1]/10);

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
        console.log(e); // TODO fix movements by finding the vector of the points
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
                // TODO: Refactor
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

