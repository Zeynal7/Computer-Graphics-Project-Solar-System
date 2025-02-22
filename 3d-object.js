/**
 * _3DObject class represents an abstract structure to define 3D objects.
 * Objects should be initialized by passing program id for compiled shaders.
 * Object holds internally references to buffers, vertices, indices and other attributes of an object.
 * Position is a vec3(x, y, z) structure.
 * Model matrix is object transformation matrix, which initally is identity matrix. 
 * Child classes should override loadData method and implement specific vertex, index loading mechanism.
 */
class _3DObject {
    constructor(program, position = vec3(0, 0, 0), rotationSpeed = 0, emission = vec3(0, 0, 0)) {
        this.program = program;
        this.bufVertex = 0;
        this.bufIndex = 0;
        this.bufNormal = 0;
        this.bufTexture = 0;
        this.rotationAxis = vec3(0, 1, 0);
        this.rotationSpeedAroundGivenAxis = 0;
        this.whichPlanetToRotateAround = -1;
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texturePoints = [];
        this.position = position;
        this.rotationSpeed = rotationSpeed;
        this.matModel = mat4();
        this.material = {
            ambient: vec3(0.0, 0.0, 0.0),
            diffuse: vec3(1.0, 1.0, 1.0),
            specular: vec3(0.0, 0.0, 0.0),
            shininess: 250.0
        }
        this.emission = emission;
        this.texture = 0;
        this.bumpTexture = 0;
    }

    loadData() {
        // do nothing
    }

    init() {
        this.matModel = translate(this.position[0], this.position[1], this.position[2]);

        this.loadData();
        this.generateTexture();

        var sampler = gl.getUniformLocation(program, "sampler");
        gl.uniform1i(sampler, 0);

        var bumpSampler = gl.getUniformLocation(program, "bumpSampler");
        gl.uniform1i(bumpSampler, 1);


        // creating buffer for vertex positions
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
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.texturePoints), gl.STATIC_DRAW);

        // creating buffer for element indices
        this.bufIndex = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIndex);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

    }

    render() {

        // Bump Mapping 
        var modelView = mult(this.matModel, camera.matView);
        var normalMatrix = mat4ToInverseMat3(modelView);

        var normal = vec4(0.0, 1.0, 0.0, 0.0);
        var tangent = vec3(1.0, 0.0, 0.0);

        gl.uniform4fv( gl.getUniformLocation(program, "normal"),flatten(normal));
        gl.uniform3fv( gl.getUniformLocation(program, "objTangent"),flatten(tangent));
        gl.uniformMatrix3fv( gl.getUniformLocation(program, "normalMatrix"), false, flatten(normalMatrix));
    

        // sending material properties
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
        gl.vertexAttribPointer(pos, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pos);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNormal);

        var norm = gl.getAttribLocation(this.program, "v_Norm");
        gl.vertexAttribPointer(norm, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(norm);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTexture);

        var texCoordAttributeLocation = gl.getAttribLocation(program, 'vertTexCoord');
        gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
        gl.enableVertexAttribArray(texCoordAttributeLocation);


        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);


        gl.activeTexture(gl.TEXTURE0+1);
        gl.bindTexture(gl.TEXTURE_2D, this.bumpTexture);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIndex);
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);

    }


    generateTexture(){
            // Creating regular Texture
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById(self.texture_id));

            // Getting image data, and adding it to bump Texture
            this.bumpTexture = gl.createTexture();
            var image = document.getElementById(self.texture_id+'-bump');
            var normalsOfImage = getHeightData(image);
            gl.bindTexture(gl.TEXTURE_2D, this.bumpTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1000, 500, 0, gl.RGB, gl.UNSIGNED_BYTE, normalsOfImage);

    }

    translate(dir) {
        this.matModel = mult(translate(dir), this.matModel);
    }

    rotate(angle = self.rotationSpeed) {
        this.matModel = mult(rotate(angle, vec3(0, 1, 0)), this.matModel);
    }


    rotateAround(speed = self.rotationSpeedAroundGivenAxis, axis = this.rotationAxis){

        // If planet has other planet to rotate around
        if(this.whichPlanetToRotateAround != -1){
            // If it is trackball move, then get current planet, otherwise get whatever was given
            var newPos = subtract(trackballMove ? this.matModel : spheres[this.whichPlanetToRotateAround].matModel, mat4());
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    newPos[i][j] = 0;
                }
            }

            // Move to the origin
            this.matModel = subtract(this.matModel, newPos);
            // Rotate around given axis
            this.matModel = mult(rotate(speed, negate(axis)), this.matModel);
            // Move Back
            this.matModel = add(newPos, this.matModel);
        }
    }
}


function mult_v(m, v) {
    if (!m.matrix) {
        return "trying to multiply by non matrix";
    }

    var result;
    if (v.length == 2) result = vec2();
    else if (v.length == 3) result = vec3();
    else if (v.length == 4) result = vec4();
    
    for (var i = 0; i < m.length; i++) {
        if (m[i].length != v.length) 
            return "dimensions do not match";
        
        result[i] = 0;
        for (var j = 0; j < m[i].length; j++)
            result[i] += m[i][j] * v[j];
    }
    return result;
}
