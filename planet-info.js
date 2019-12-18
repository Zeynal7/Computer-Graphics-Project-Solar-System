// Planets
var numberOfSpheres = 10; // 9 planets + 1 Sun
var spheres = [];

var divisionOfSizes = 20000;
var divisionOfDistance = 10000000;
var divisionOfSpeeds = 100000;


// Infos taken from: https://www.enchantedlearning.com/subjects/astronomy/planets/

var radiuses = [ // in KM
    60268, // Sun - real value is 695510, but it is too big that eats other planets
    2439.7, // Mercury
    6051.8, // Venus
    6378.1, // Earth
    3396.2, // Mars
    71492,  // Jupiter
    60268,  // Saturn
    25559,  // Uranus
    24764,  // Neptune
    1195    // Pluto
];
var distancesFromSun = [ // in KM
    0,          // Sun itself
    57900000,   // Mercury
    108200000,  // Venus
    149600000,  // Earth
    227900000,  // Mars
    778300000,  // Jupiter
    1427000000, // Saturn
    2871000000, // Uranus
    4497100000, // Neptune
    5913000000  // Pluto
]

var rotationSpeedsAroundSun = [ // Km/h;
    0.0,    // Sun itself
    172404, // Mercury
    126108, // Venus
    107244, // Earth
    86868,  // Mars
    47016,  // Jupiter
    34705,  // Saturn
    24516,  // Uranus
    19548,  // Neptune
    17064   // Pluto
];

var planetLocations = [];

function createSpheres(){
    for (var i = 0; i < numberOfSpheres; i++) {
        var newSphere= new Sphere(program, planetLocations[i], rotationSpeedsAroundSun[i]/divisionOfSpeeds, radiuses[i]/divisionOfSizes, texture_id = i.toString());
        spheres.push(newSphere);
        spheres[i].init();
    }
}

function createCoordinates(){
    for (var i = 0; i < numberOfSpheres; i++) {
        var newCoordinate = vec4(0.0, 0.0, 0.0, 0.0);
        glMatrix.vec4.add(newCoordinate, vec4(0.0, 0.0, 0.0, 0.0), vec4(distancesFromSun[i]/divisionOfDistance, 0.0, 0.0, 0.0));
        planetLocations.push(newCoordinate);
    }
}

function createPlanets(){
    createCoordinates();
    createSpheres();
    spheres[0].emission = vec3(1, 1, 0);
}
