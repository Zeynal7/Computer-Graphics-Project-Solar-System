var canvas;
var gl;
var program;
var camera;
var light;

//var lightSourcesOfSun = [];

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

    camera = new Camera(program, vec3(0, 0, 100), vec3(0, 0, -10), vec3(0, 1, 0));
    light = new Light(program, vec4(0, 0, 0, 1));

    createPlanets();

    // for (var i = 0; i < spheres[0].vertices.length; i++) {
    //     var newLight = new Light(program, spheres[0].vertices[i]);
    //     lightSourcesOfSun.push(newLight);
    // }

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    camera.render();
    light.render();

    checkNavigation();

    // lightSourcesOfSun[point % (spheres[0].vertices.length-1)].render();
    // lightSourcesOfSun[spheres[0].vertices.length-1].render();
    // for (var i = 0; i < spheres[0].vertices.length; i++) {
    //     lightSourcesOfSun[i].render();
    //     // lightSourcesOfSun[i].rotate(2);
    // }

    for (var i = 0; i < numberOfSpheres; i++) {
        spheres[i].render();
        // spheres[i].rotate(spheres[i].rotationSpeed);
    }
    // glMatrix.vec3.rotateY(camera.target, camera.target, camera.position, -nextPoint[0]/10);
    // glMatrix.vec3.rotateX(camera.target, camera.target, camera.position, -nextPoint[1]/10);

    // camera.rotateY(-nextPoint[0]);
    // camera.rotateX(-nextPoint[1]);

    requestAnimFrame(render);
}

