class Triangle {
    constructor(program, position, size = 1, rotationSpeed = 0, emission = vec3(0, 0, 0)) {
        // super(program, position);
        this.program = program;
        this.position = position;
        this.size = size;
        this.bufVertex = 0;
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texturePoints = [];
        this.matModel = mat4();
        this.material = {
            ambient: vec3(0.2, 0.3, 0.4),
            diffuse: vec3(0.3, 0.6, 0.5),
            specular: vec3(0.9, 1.0, 0.9),
            shininess: 250.0
        }
        this.emission = emission;
        this.texture_id = '11';
        this.invert = 1;
        this.rotationSpeed = rotationSpeed;
    }

    init(){
        this.matModel = translate(this.position[0], this.position[1], this.position[2]);
        this.loadData();

        this.generateTexture();

        this.bufVertex = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufVertex);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);


        // creating another buffer for vertex normals
        this.bufNormal = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNormal);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.normals), gl.STATIC_DRAW);

        // creating buffer for textures
        this.bufTexture = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTexture);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);

        // // creating buffer for element indices
        // this.bufIndex = gl.createBuffer();
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIndex);
        // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

    }

    loadData() {
        var self = this;

        for (var i=0.0; i<=360; i+=5) {
          var j = i * Math.PI / 180;
          var vert1 = [ Math.sin(j) * this.size, this.invert * 0.5,  Math.cos(j) * this.size];
          var vert2 = [ Math.sin(j) * this.size * 0.75, 0.0, Math.cos(j) * this.size * 0.75];
          this.vertices = this.vertices.concat(vert2);
          this.vertices = this.vertices.concat(vert1);
        }

        var generateNormals = function () {
            for (var i in self.vertices) {
                self.normals.push(vec4(normalize(vec3(self.vertices[i])), 0.0));
            }
        };

        generateNormals();
    }

    render(){

        var ambient = gl.getUniformLocation(this.program, "col_Ambient");
        gl.uniform3fv(ambient, flatten(this.material.ambient));

        var diffuse = gl.getUniformLocation(this.program, "col_Diffuse");
        gl.uniform3fv(diffuse, flatten(this.material.diffuse));

        var specular = gl.getUniformLocation(this.program, "col_Specular");
        gl.uniform3fv(specular, flatten(this.material.specular));

        var shininess = gl.getUniformLocation(this.program, "col_Shininess");
        gl.uniform1f(shininess, this.material.shininess);

        var ambient = gl.getUniformLocation(this.program, "light_Emission");
        gl.uniform3fv(ambient, flatten(this.emission));

        var model = gl.getUniformLocation(this.program, "m_Model");
        gl.uniformMatrix4fv(model, false, flatten(this.matModel));

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufVertex);

        var pos = gl.getAttribLocation(this.program, "v_Pos");
        gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pos);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNormal);

        var norm = gl.getAttribLocation(this.program, "v_Norm");
        gl.vertexAttribPointer(norm, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(norm);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTexture);

        var texCoordAttributeLocation = gl.getAttribLocation(program, 'vertTexCoord');
        gl.vertexAttribPointer(texCoordAttributeLocation, 3, gl.FLOAT, gl.FALSE, 0, 0);
        gl.enableVertexAttribArray(texCoordAttributeLocation);

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.activeTexture(gl.TEXTURE0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertices.length/3);

    }

    rotate(angle = self.rotationSpeed) {
        this.matModel = mult(rotate(angle, vec3(0, 1, 0)), this.matModel);
    }

    generateTexture(){
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById('5'));
    }

}