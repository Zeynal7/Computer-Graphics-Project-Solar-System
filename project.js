var canvas;
var gl;
var program;
var camera;
var light;
var extraLightFromCamera;
var triangle;
var triangle2;



function print(x){
    return console.log(x);
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - (12/100) * window.innerHeight;

    addNavigationTo(canvas);

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    camera = new Camera(program, vec3(0, 0, 100), vec3(0, 0, -100), vec3(0, -1, 0));
    light = new Light(program, vec4(0, 0, 0, 1));

    createPlanets();

    // Ring of the saturn
    triangle = new Triangle(program, vec4(spheres[6].position), 20, rotationSpeedsAroundSun[6]/divisionOfSpeeds);
    triangle2 = new Triangle(program, vec4(spheres[6].position), 20, rotationSpeedsAroundSun[6]/divisionOfSpeeds);
    triangle2.invert = -1;
    triangle.init();
    triangle2.init();
    render();

}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    camera.render();
    checkNavigation();

    for (var i = 0; i < numberOfSpheres; i++) {
        spheres[i].render();
        if (shouldRotate){
            spheres[i].rotate(spheres[i].rotationSpeed);
            spheres[i].rotateAround(spheres[i].rotationSpeedAroundGivenAxis);
        }
    }

    // If planet is nearby, add a light source from camera
    // and rotate with the trackball;
    if(isNearAnyPlanet[0]){
        if(isNearAnyPlanet[1] != 0){ // If not sun
            print("RENDERING EXTRA");
            extraLightFromCamera.render();
        }
        axis = normalize(axis);
        if(angle != 0){
        spheres[window.isNearAnyPlanet[1]].rotateAround(1, axis);
    }
    }else{
        light.render();
    }
                

    // Rendering and rotating the ring of the saturn
    triangle.render();
    triangle2.render();
    if (shouldRotate){
        triangle.rotate(spheres[6].rotationSpeed);
        triangle2.rotate(spheres[6].rotationSpeed);
    }

    requestAnimFrame(render);
}

