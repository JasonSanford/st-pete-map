var xhr = require('xhr');

function addGeoJSON(url, layer, zoom_to) {
  var xhr_options = {
    uri:    url,
    json:   true,
    method: 'get'
  };
  function callback(error, resp, geojson) {
    if (error) {
      console.log(error);
      return;
    }
    layer.addData(geojson);
    if (zoom_to) {
      setTimeout(function() {
        map.fitBounds(layer.getBounds());
      }, 500);
    }
  }
  xhr(xhr_options, callback);
}

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

var eat_drink_layer = new L.GeoJSON(null, {
  onEachFeature: function (feature, layer) {
    var html = '<h3>' + feature.properties.name + '</h3>';
    if (feature.properties.cuisines) {
      html += '<p>'+ feature.properties.cuisines.split(',').join(', ') + '</p>';
    }
    layer.bindPopup(html);
  },
  pointToLayer: function (feature, lat_lng) {
    var symbol = feature.properties.status === 'Bar' ? 'bar' : 'restaurant';
    return L.marker(lat_lng, {
      icon: L.mapbox.marker.icon({
        'marker-size': 'small',
        'marker-symbol': symbol,
        'marker-color': '#141D2B'
      })
    });
  }
});
L.control.layers(null, {'Eat/Drink': eat_drink_layer}).addTo(map);

var geojson_layer_options = {
  pointToLayer: L.mapbox.marker.style,
  style: L.mapbox.simplestyle.style,
  onEachFeature: function (feature, layer) {
    var html = '<h3>' + feature.properties.title + '</h3>';
    if (feature.properties.address) {
      html += '<p>'+ feature.properties.address + '</p>';
    }
    if (feature.properties.distance) {
      html += '<p>'+ feature.properties.distance + ' mi.</p>';
    }
    layer.bindPopup(html);
  }
};
var geojson_layer = new L.GeoJSON(null, geojson_layer_options);
geojson_layer.addTo(map);

addGeoJSON('things.geojson', geojson_layer, true);
addGeoJSON('https://web.fulcrumapp.com/shares/81c7242d3cca922f.geojson', eat_drink_layer, false);
