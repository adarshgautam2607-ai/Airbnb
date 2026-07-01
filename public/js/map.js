const mapElement = document.getElementById("map");

const lat = parseFloat(mapElement.dataset.lat);
const lng = parseFloat(mapElement.dataset.lng);
const title = mapElement.dataset.title;

if(isNaN(lat) || isNaN(lng)) {
    mapElement.innerHTML = "<p style='padding:10px; color:gray;'>Map not available for this listing.</p>";
} else {
    const map = L.map("map").setView([lat, lng], 9);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap &copy; CARTO"
    }).addTo(map);

    const redIcon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    L.marker([lat, lng], {icon: redIcon})
        .addTo(map)
        .bindPopup(`<b>${title}</b><br>Exact location provided after booking`)
        .openPopup();
}