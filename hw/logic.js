// Creating map object

var myMap = L.map("map", {
  center: [38.7128, -112.0059],
  zoom: 5
});

// Adding tile layer to the map

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var APILink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

var markers = [];


function markerSize(mag) {
  return mag*2;
}

function markerColor(mag) {
  if (mag < 3.0) {
    return "#ffd9b3";
  } 
  else if (mag < 4.5) {
    return "#ff9933";
  }
  else {
    return "#b35900";
  }

}
d3.json(APILink, function(response) {

  // Loop through data
  for (var i = 0; i < response.features.length; i++) {
    var feature = response.features[i];
    // Set the data location property to a variable
    var location = feature.geometry;
    var magnitude = feature.properties.mag;
    var place = feature.properties.title;
    // Check for location property
    if (location) {

        L.circleMarker([location.coordinates[1], location.coordinates[0]], {
          fillOpacity: .75,
          color: markerColor(magnitude),
          radius: markerSize(magnitude)
        })
        .bindPopup("<h3>"+"Magnitude:" + magnitude + "</h3>" + "<p>" + "</p>" +
        "<h3>"+"Location:" + place + "</h3>")
        .addTo(myMap)
    }

  }
  // Add our marker cluster layer to the map

});
