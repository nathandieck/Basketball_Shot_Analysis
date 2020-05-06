var bounds = [[0,0], [940,500]];

var map = L.map('leftCourt', {
    crs: L.CRS.Simple,
    // center: bounds.getCenter(),
    zoom: 1,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
});

var image = L.imageOverlay("./graphics/court2.png", bounds).addTo(map);

map.fitBounds(bounds);

//https://gis.stackexchange.com/questions/238414/adding-a-new-and-removing-an-old-marker-every-time-the-user-click-on-the-map

var theMarker = {};

let shooter = "Steph Curry";

let probability = "0.77";


map.on('click',function(e){
    playerLat = parseInt(e.latlng.lat);
    playerLon = parseInt(e.latlng.lng);

    console.log("You clicked the map at LAT: "+ playerLat+" and LONG: "+playerLon );
      //Clear existing marker, 

    if (theMarker != undefined) {
        map.removeLayer(theMarker);
    };

    emptyTheBoxes();

  //Add a marker to show where you clicked.
    theMarker = L.marker([playerLat,playerLon]).addTo(map);

    fillTheBoxes();
});



function emptyTheBoxes() {
    let shooterInformation = d3.select("#playerShotResponse");
    let probabilityInformation = d3.select("#playerProbabilityResponse")

    shooterInformation.html("");
    probabilityInformation.html("");
}

function fillTheBoxes() {
    let shooterInformation = d3.select("#playerShotResponse");
    let probabilityInformation = d3.select("#playerProbabilityResponse")

    shooterInformation.append("h5").text(shooter);
    probabilityInformation.append("h5").text(probability);

}

function choice(y) {
    console.log(y);
}


function kickoff() {
    
    let dropdown = d3.select("#dropDown");
    
    d3.json("data/standin_data.json").then(function(data) {

        console.log(data);

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

    });
    
}

kickoff();