const defaultLatitude = 39.0997;
const defaultLongitude = -94.5786;
const defaultZoom = 5;
let map = L.map('map').setView([defaultLatitude, defaultLongitude], defaultZoom);

let baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let satelliteLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
        maxZoom: 19,
    }
);

let markers = L.layerGroup().addTo(map);

function fetchTornadoData(tornadoType) {
    return d3.json(`http://localhost:5000/api/tornadoes/${tornadoType}`);
}
function onTornadoTypeChange() {
    const selectedTornadoType = document.getElementById("tornado-type").value;
    fetchTornadoData(selectedTornadoType)
        .then((tornadoData) => {
            markers.clearLayers();
            plotTornadoPoints(tornadoData);
        })
        .catch((error) => console.error('Error fetching tornado data:', error));
}
function onMapTypeChange() {
    const selectedMapType = document.getElementById("map-type").value;
    if (selectedMapType === "osm") {
        map.removeLayer(satelliteLayer);
        map.addLayer(baseLayer);
    } else if (selectedMapType === "satellite") {
        map.removeLayer(baseLayer);
        map.addLayer(satelliteLayer);
    }
}
function plotTornadoPoints(tornadoData) {
    let latlngs = tornadoData.map(tornado => [tornado.slat, tornado.slon, tornado.Date, tornado.State, tornado.Distance, tornado.width]);
    latlngs.forEach(latlng => {
        let marker = L.marker([latlng[0], latlng[1]]).addTo(markers);
        marker.bindPopup(
            `Date: ${latlng[2]}<br>
            State: ${latlng[3]}<br>
            Distance: ${latlng[4]}<br>
            Width: ${latlng[5]}`
        );
    });
}
onTornadoTypeChange();
