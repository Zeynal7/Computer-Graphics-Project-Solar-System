/**
 * Class sphere, extends from the _3DObject class
 */
class Sphere extends _3DObject {
    constructor(program, position, rotationSpeed, radius = 1, texture_id = '0',  emission = vec3(0, 0, 0), N = 50, M = 50) {
        super(program, position, rotationSpeed, emission);
        this.position = position;
        this.radius = radius;
        this.rotationSpeed = rotationSpeed;
        this.N = N;
        this.M = M;
        this.texture_id = texture_id;
    }

    loadData() {
        var self = this;

        var generateVertices = function (N, M) {
            for (var i = 0; i < N; i++) {
                var alfa = i * Math.PI / (N - 1) - Math.PI / 2;

                for (var j = 0; j < M; j++) {
                    var beta = j * 2 * Math.PI / M;

                    var x = self.radius * Math.cos(alfa) * Math.cos(beta);
                    var y = self.radius * Math.sin(alfa);
                    var z = self.radius * Math.cos(alfa) * Math.sin(beta);

                    self.vertices.push(vec4(x, y, z, 1.0));
                }
            }
        };

        var generateNormals = function (N, M) {
            for (var i in self.vertices) {
                self.normals.push(vec4(normalize(vec3(self.vertices[i])), 0.0));
            }
        };

        var generateIndices = function (N, M) {
            var index = function (i, j) {
                return i * M + j;
            }

            for (var i = 0; i < N; i++)
                for (var j = 0; j < M; j++) {
                    if(i != N - 1){
                    self.indices.push(index(i, j));
                    self.indices.push(index(i, (j + 1) % M));
                    self.indices.push(index(i + 1, j));
                    self.indices.push(index(i, (j + 1) % M));
                    self.indices.push(index(i + 1, (j + 1) % M));
                    self.indices.push(index(i + 1, j));
                }
                    self.texturePoints.push(vec2(j / M, i / M));
                }
        };

        var generateTexture = function(){
            self.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, self.texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById(self.texture_id));
        }

        generateVertices(this.N, this.M);
        generateNormals(this.N, this.M);
        generateIndices(this.N, this.M);
        generateTexture();
    }
}