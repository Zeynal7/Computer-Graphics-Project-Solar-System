class Camera {
    constructor(program, position, target, up) {
        this.program = program;
        this.position = position;
        this.target = target;
        this.up = up;
        this.matView = mat4();
    }

    render() {
        var pos = gl.getUniformLocation(this.program, "v_Camera");
        gl.uniform4fv(pos, flatten(vec4(this.position, 1.0)));

        var view = gl.getUniformLocation(this.program, "m_View");
        this.matView = lookAt(this.position, this.target, this.up);
        gl.uniformMatrix4fv(view, false, flatten(this.matView));

        var proj = gl.getUniformLocation(this.program, "m_Proj");
        var matProj = perspective(50, canvas.width/canvas.height, 0.01, 1000);
        gl.uniformMatrix4fv(proj, false, flatten(matProj));
    }
}