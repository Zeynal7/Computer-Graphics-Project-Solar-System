var texSize = 256;
var materialDiffuse = vec4( 0.7, 0.7, 0.7, 1.0 );

// Bump Data

var data = new Array()
    for (var i = 0; i<= texSize; i++)  data[i] = new Array();
    for (var i = 0; i<= texSize; i++)
    	for (var j=0; j<=texSize; j++) 
        	data[i][j] = 0.0;

    for (var i = texSize/4; i<3*texSize/4; i++)
    	for (var j = texSize/4; j<3*texSize/4; j++)
        	data[i][j] = 10.0;
print(data);
// Bump Map Normals
    
var normalst = new Array()
    for (var i=0; i<texSize; i++)
    	normalst[i] = new Array();
    for (var i=0; i<texSize; i++)
    	for ( var j = 0; j < texSize; j++) 
        	normalst[i][j] = new Array();

    for (var i=0; i<texSize; i++)
    	for ( var j = 0; j < texSize; j++) {
	        normalst[i][j][0] = data[i][j]-data[i+1][j];
	        normalst[i][j][1] = data[i][j]-data[i][j+1];
	        normalst[i][j][2] = 1;
    }

print("NORMALST");
print(normalst);

// Scale to Texture Coordinates

    for (var i=0; i<texSize; i++) for (var j=0; j<texSize; j++) {
       var d = 0;
       for(k=0;k<3;k++) d+=normalst[i][j][k]*normalst[i][j][k];
       d = Math.sqrt(d);
       for(k=0;k<3;k++) normalst[i][j][k]= 0.5*normalst[i][j][k]/d + 0.5;
    }

print("NORMALST AFTER");
print(normalst);

// Normal Texture Array

var normals = new Uint8Array(3*texSize*texSize);

    for ( var i = 0; i < texSize; i++ ) 
        for ( var j = 0; j < texSize; j++ ) 
           for(var k =0; k<3; k++) 
                normals[3*texSize*i+3*j+k] = 255*normalst[i][j][k];


var normal = vec4(0.0, 1.0, 0.0, 0.0);
var tangent = vec3(1.0, 0.0, 0.0);

var materialDiffuse = vec4( 0.7, 0.7, 0.7, 1.0 );


function mat4ToInverseMat3(mat) {

    dest = mat3();
	
	var a00 = mat[0][0], a01 = mat[0][1], a02 = mat[0][2];
	var a10 = mat[1][0], a11 = mat[1][1], a12 = mat[1][2];
	var a20 = mat[2][0], a21 = mat[2][1], a22 = mat[2][2];
	
	var b01 = a22*a11-a12*a21;
	var b11 = -a22*a10+a12*a20;
	var b21 = a21*a10-a11*a20;
		
	var d = a00*b01 + a01*b11 + a02*b21;
	if (!d) { return null; }
	var id = 1/d;
	
	
	dest[0][0] = b01*id;
	dest[0][1] = (-a22*a01 + a02*a21)*id;
	dest[0][2] = (a12*a01 - a02*a11)*id;
	dest[1][0] = b11*id;
	dest[1][1] = (a22*a00 - a02*a20)*id;
	dest[1][2] = (-a12*a00 + a02*a10)*id;
	dest[2][0] = b21*id;
	dest[2[1]] = (-a21*a00 + a01*a20)*id;
	dest[2][2] = (a11*a00 - a01*a10)*id;
	
	return dest;
};

function createBumMap(){
	    // var normalMatrix = mat4ToInverseMat3(modelViewMatrix);

}



function getHeightData(img) {
    var canvasForImage = document.createElement( 'canvas' );
    canvasForImage.width = 1000;
    canvasForImage.height = 500;
    var context = canvasForImage.getContext( '2d' );

    var size = 3 * 1000 * 500, data = new Uint8Array( size );

    context.drawImage(img, 0, 0);

    for ( var i = 0; i < size; i ++ ) {
        data[i] = 0
    }

    var imgd = context.getImageData(0, 0, 1000, 500);
    var pix = imgd.data;
    print("PIX");
    print(pix);
    print("IMGD");
    print(imgd);

    var j=0;
    for (var i = 0, n = pix.length; i < n; i +=4) { //RGBA
        data[j++] = pix[i];
        data[j++] = pix[i+1];
        data[j++] = pix[i+2];
    }
    print(data.length);

    return data;
}
