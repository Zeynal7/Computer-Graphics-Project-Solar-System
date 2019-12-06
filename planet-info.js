// Planets
var numberOfSpheres = 10; // 9 planets + 1 Sun
var spheres = [];

// Infos taken from: https://www.enchantedlearning.com/subjects/astronomy/planets/

var radiuses = [ // Miles divided by 10000
     0.4938, // Sun itself - 86.4938
     0.3031, // Mercury
     0.7521, // Venus
     0.7926, // Earth
     0.4222, // Mars
     8.8729, // Jupiter
     7.4600, // Saturn
     3.2600, // Uranus
     3.0200, // Neptune
     0.1413, // Pluto
];

var distancesFromSun = [ // Divided by 100 in KM
      0.0, // Sun itself
     5.79, // Mercury
    10.82, // Venus
    14.96, // Earth
    22.79, // Mars
    77.84, // Jupiter
    142.7, // Saturn
    287.1, // Uranus
    449.7, // Neptune
    591.3, // Pluto
]

var rotationSpeedsAroundSun = [ // Km/h divided by 100;
      0.0, // Sun itself
    1.07132, // Mercury
    1.26108, // Venus
    1.07244, // Earth
    0.86868, // Mars
    0.047016, // Jupiter
    0.34705, // Saturn
    0.24516, // Uranus
    0.19548, // Neptune
    0.17064, // Pluto
];

var planetLocations = [];

function createSpheres(){
    for (var i = 0; i < numberOfSpheres; i++) {
        var newSphere= new Sphere(program, planetLocations[i], rotationSpeedsAroundSun[i], radiuses[i]);
        spheres.push(newSphere);
        spheres[i].init();
    }
}

function createCoordinates(){
    for (var i = 0; i < numberOfSpheres; i++) {
        var newCoordinate = vec4(0.0, 0.0, 0.0, 0.0);
        glMatrix.vec4.add(newCoordinate, vec4(0.0, 0.0, 0.0, 0.0), vec4(distancesFromSun[i], 0.0, 0.0, 0.0));
        planetLocations.push(newCoordinate);
    }
}

function createPlanets(){
    createCoordinates();
    createSpheres();
}
