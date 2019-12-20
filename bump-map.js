
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


    var j=0;
    for (var i = 0, n = pix.length; i < n; i +=4) { //RGBA
        data[j++] = pix[i];
        data[j++] = pix[i+1];
        data[j++] = pix[i+2];
    }

    return data;
}


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
