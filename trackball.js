
var trackingMouse = false;
var trackballMove = false;
var lastPos = [0, 0, 0];
var curx, cury;
var startX, startY;
var  angle = 0.0;
var  axis = [0, 0, 1];


var distanceForTrackball = 5 // x times of the radius

function checkTheTrackball(){
	var positionOfCamera = camera.position;

        var matModelOfPlanets = mat4();
        var isNearAnyPlanet = false;
        var oldPlanet = window.isNearAnyPlanet[1]

        for (var i = 0; i < numberOfSpheres; i++) {
            matModelOfPlanets = spheres[i].matModel;
            positionOfPlanet = vec3(matModelOfPlanets[0][3], matModelOfPlanets[1][3], matModelOfPlanets[2][3]);
            var distanceBetweenCameraAndPlanet = length(findVector(positionOfCamera, positionOfPlanet));
            if(distanceBetweenCameraAndPlanet < radiuses[i]*distanceForTrackball/divisionOfSizes){
                    window.isNearAnyPlanet = [true, i];
                    if(i != 0){
                    // spheres[i].emission = vec3(0.5, 0.5, 0.5);
                    extraLightFromCamera = new Light(program, vec4(camera.position, 1));
                    extraLightFromCamera.intensity.specular = vec3(1.0, 1.0, 1.0);
                    extraLightFromCamera.intensity.ambient = vec3(0.1, 0.1, 0.1);
                    extraLightFromCamera.intensity.diffuse = vec3(1.0, 1.0, 1.0);
                }
                    isNearAnyPlanet = true;
            }
        }

        window.isNearAnyPlanet[0] = isNearAnyPlanet;
        if(!isNearAnyPlanet && oldPlanet != -1){
            window.isNearAnyPlanet = [false, -1];
            angle = 0.0;
            trackballMove = false;
            for (var i = 1; i < numberOfSpheres; i++) {
                spheres[i].emission = vec3(0, 0, 0);
            }
        }
}


function canvasToWorld(event) {
	var x = 2*event.clientX/canvas.width-1;
	var y = 2*(canvas.height-event.clientY)/canvas.height-1;
	return vec2(x, y);
}

function eventToWorld(event) {
    var x = canvasToWorld(event.layerX, canvas.width);
    var y = -canvasToWorld(event.layerY, canvas.height);
    var z;
    var k = Math.sqrt(1 - x * x - y * y);
    console.log(k);
    if (Number.isNaN(k)){
        z = 0;
    }else {
        z = Math.sqrt(1 - x * x - y * y);
    }   
    return vec3(x, y, z);
}



function trackballView( x,  y ) {
    var d, a;
    var v = [];

    v[0] = x;
    v[1] = y;

    d = v[0]*v[0] + v[1]*v[1];
    if (d < 1.0)
      v[2] = Math.sqrt(1.0 - d);
    else {
      v[2] = 0.0;
      a = 1.0 /  Math.sqrt(d);
      v[0] *= a;
      v[1] *= a;
    }
    return v;
}

function mouseMotion( x,  y)
{
    var dx, dy, dz;

    var curPos = trackballView(x, y);
    if(trackingMouse) {
      dx = curPos[0] - lastPos[0];
      dy = curPos[1] - lastPos[1];
      dz = curPos[2] - lastPos[2];

      if (dx || dy || dz) {
	       angle = -1 * Math.sqrt(dx*dx + dy*dy + dz*dz);


	       axis[0] = lastPos[1]*curPos[2] - lastPos[2]*curPos[1];
	       axis[1] = lastPos[2]*curPos[0] - lastPos[0]*curPos[2];
	       axis[2] = lastPos[0]*curPos[1] - lastPos[1]*curPos[0];

           lastPos[0] = curPos[0];
	       lastPos[1] = curPos[1];
	       lastPos[2] = curPos[2];
      }
    }
}

function startMotion( x,  y)
{
    trackingMouse = true;
    startX = x;
    startY = y;
    curx = x;
    cury = y;

    lastPos = trackballView(x, y);
    trackballMove=true;
    document.getElementById('trackball').innerHTML = "Trackball Move: Active";
}

function stopMotion( x,  y)
{
    trackingMouse = false;
    if (startX != x || startY != y) {
    }
    else {
	     angle = 0.0;
	     trackballMove = false;
         document.getElementById('trackball').innerHTML = "Trackball Move: Deactive";
    }
    if(!isNearAnyPlanet[0]){
	   angle = 0.0;
	   trackballMove = false;
       document.getElementById('trackball').innerHTML = "Trackball Move: Deactive";
    }
}