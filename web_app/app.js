let map = L.map('map').setView([latitude, longitude], zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function fetchTornadoData(year) {
    return d3.json(`http://localhost:5000/api/tornadoes/${year}`);
}
function plotTornadoPoints(tornadoData) {
    let latlngs = tornadoData.map(tornado => [tornado.slat, tornado.slon]);
    latlngs.forEach(latlng => {
        L.marker(latlng).addTo(map);
    });
}
fetchTornadoData('EFS_3')
    .then(tornadoData => plotTornadoPoints(tornadoData))
    .catch(error => console.error('Error fetching EFS_3 data:', error));

fetchTornadoData('EFS_4')
    .then(tornadoData => plotTornadoPoints(tornadoData))
    .catch(error => console.error('Error fetching EFS_4 data:', error));

fetchTornadoData('EFS_5')
    .then(tornadoData => plotTornadoPoints(tornadoData))
    .catch(error => console.error('Error fetching EFS_5 data:', error));