var canvas;
var gl;
var program;
var camera;
var light;


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
    
    render();
}

var x = 3;

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    camera.render();
    light.render();

    checkNavigation();

    for (var i = 0; i < numberOfSpheres; i++) {
        spheres[i].render();
        if (shouldRotate){
            spheres[i].rotate(spheres[i].rotationSpeed);
            spheres[i].rotateAround(spheres[i].rotationSpeedAroundGivenAxis);
        }
    }

    requestAnimFrame(render);
}

