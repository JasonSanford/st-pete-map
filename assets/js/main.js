var xhr = require('xhr');

var map = new L.mapbox.Map('map-container', 'jcsanford.k8mii9c2', {
  infoControl: false,
  attributionControl: true,
  center: L.latLng(27.770925, -82.6381319)
});

var locate_options = {
  locateOptions: {
    enableHighAccuracy: true
  }
};
L.control.locate(locate_options).addTo(map);

var geojson_layer_options = {
  pointToLayer: L.mapbox.marker.style,
  onEachFeature: function (feature, layer) {
    var html = '<h3>' + feature.properties.title + '</h3>';
    if (feature.properties.address) {
      html += '<p>'+ feature.properties.address + '</p>';
    }
    layer.bindPopup(html);
  }
};
var geojson_layer = new L.GeoJSON(null, geojson_layer_options);
geojson_layer.addTo(map);

var xhr_options = {
  uri:    'things.geojson',
  json:   true,
  method: 'get'
};
function callback(error, resp, geojson) {
  if (error) {
    console.log(error);
    return;
  }
  geojson_layer.addData(geojson);
  setTimeout(function() {
    map.fitBounds(geojson_layer.getBounds());
  }, 500);
}

xhr(xhr_options, callback);

module.exports = {
  map: map
};
