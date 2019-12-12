class Camera {
    constructor(program, position, target, up) {
        this.program = program;
        this.position = position;
        this.target = target;
        this.up = up;
    }

    render() {
        var pos = gl.getUniformLocation(this.program, "v_Camera");
        gl.uniform4fv(pos, flatten(vec4(this.position, 1.0)));

        var view = gl.getUniformLocation(this.program, "m_View");
        var matView = lookAt(this.position, this.target, this.up);
        gl.uniformMatrix4fv(view, false, flatten(matView));

        var proj = gl.getUniformLocation(this.program, "m_Proj");
        // var matProj = perspective(10, canvas.width/canvas.height, 1, 1000);
        var matProj = perspective(70, canvas.width/canvas.height, 1, 1000);
        gl.uniformMatrix4fv(proj, false, flatten(matProj));
    }

    rotate(angle) {
        this.position = vec3(mult_v(rotate(angle, vec3(0, 1, 0)), vec4(this.position)));
    }

    rotateX(angle) {
        this.target = vec3(mult_v(rotate(angle, vec3(1, 0, 0)), vec4(this.target)));
        this.up = vec3(mult_v(rotate(angle, vec3(1, 0, 0)), vec4(this.up)));
    }

    rotateY(angle) {
        this.target = vec3(mult_v(rotate(angle, vec3(0, 1, 0)), vec4(this.target)));
        var upEndPoint = vec3();
        glMatrix.vec3.add(upEndPoint, camera.up, camera.position);
        // var fromPositionToUp = findVector(camera.position, upEndPoint);
        upEndPoint = vec3(mult_v(rotate(angle, vec3(0, 1, 0)), vec4(upEndPoint)));
        glMatrix.vec3.add(camera.up, upEndPoint, camera.position);

    }

    rotateAroundPosition(vector, angle){
        this.target = vec3(mult_v(rotate(angle, vector), vec4(this.target)));
    }
}