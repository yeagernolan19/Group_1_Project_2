const defaultLatitude = 39.0997;
const defaultLongitude = -94.5786;
const defaultZoom = 5;
let map = L.map('map').setView([defaultLatitude, defaultLongitude], defaultZoom);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
function fetchTornadoData(tornadoType) {
    return d3.json(`http://localhost:5000/api/tornadoes/${tornadoType}`);
}
function onTornadoTypeChange() {
    const selectedTornadoType = document.getElementById("tornado-type").value;
    fetchTornadoData(selectedTornadoType)
        .then((tornadoData) => {
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
            plotTornadoPoints(tornadoData);
        })
        .catch((error) => console.error('Error fetching tornado data:', error));
}
function plotTornadoPoints(tornadoData) {
    let latlngs = tornadoData.map(tornado => [tornado.slat, tornado.slon, tornado.Date]);
    latlngs.forEach(latlng => {
        let marker = L.marker([latlng[0], latlng[1]]).addTo(map);
        marker.bindPopup(`Date: ${latlng[2]}`);
    });
}
onTornadoTypeChange();
