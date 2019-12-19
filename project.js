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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    addNavigationTo(canvas);

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    camera = new Camera(program, vec3(0, 0, 100), vec3(0, 0, -100), vec3(0, -1, 0));
    // camera = new Camera(program, vec3(0, 100, 0), vec3(0, -100, 0), vec3(0, 0, 1));
    light = new Light(program, vec4(0, 0, 0, 1));

    createPlanets();

    // print(spheres[6].position)
    triangle = new Triangle(program, vec4(spheres[6].position), 20, rotationSpeedsAroundSun[6]/divisionOfSpeeds);
    triangle2 = new Triangle(program, vec4(spheres[6].position), 20, rotationSpeedsAroundSun[6]/divisionOfSpeeds);
    triangle2.invert = -1;
    triangle.init();
    triangle2.init();
    render();

}

var x = 3;

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    camera.render();
    // light.render();

    checkNavigation();

    for (var i = 0; i < numberOfSpheres; i++) {
        spheres[i].render();
        if (shouldRotate && !isNearAnyPlanet[0]){
            spheres[i].rotate(spheres[i].rotationSpeed);
            spheres[i].rotateAround(spheres[i].rotationSpeedAroundGivenAxis);
        }
    }

    if(isNearAnyPlanet[0]){
        // print("LIGHT IS RENDERED");
        extraLightFromCamera.render();
    }else{
        light.render();
    }


    triangle.render();
    triangle2.render();
    if (shouldRotate && !isNearAnyPlanet[0]){
        triangle.rotate(spheres[6].rotationSpeed);
        triangle2.rotate(spheres[6].rotationSpeed);
}

//     if(x>0){
//     spheres[1].rotate(spheres[1].rotationSpeed);
//     print(spheres[1].matModel);
//     x--;
// }



    requestAnimFrame(render);
}

