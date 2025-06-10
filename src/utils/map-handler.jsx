import L from 'leaflet';

export default class MapHandler {
  constructor(container) {
    this.container = container;
    this.map = null;
  }

  async initMap() {
    this.map = L.map(this.container, {
      scrollWheelZoom: false,
    }).setView([-2.5489, 118.0149], 5);
    this._initBaseLayers();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          this.map.setView([lat, lon], 12);
      
          const radius = 25000;
          const query = `
            [out:json][timeout:25];
            (
              node["amenity"="hospital"](around:${radius},${lat},${lon});
              node["healthcare"="hospital"](around:${radius},${lat},${lon});
              node["amenity"="pharmacy"](around:${radius},${lat},${lon});
              node["amenity"="clinic"](around:${radius},${lat},${lon});
              node["healthcare"="clinic"](around:${radius},${lat},${lon});
            );
            out body;
          `;
      
          const url = "https://overpass-api.de/api/interpreter";
      
          try {
            const resp = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain' },
              body: query,
            });
            if (!resp.ok) {
              console.error('Overpass API error:', resp.status);
              return;
            }
            const data = await resp.json();
      
            data.elements.forEach((element) => {
              const { lat: alat, lon: alon, tags } = element;
              let iconUrl;
              if (tags.amenity === "hospital") {
                iconUrl = "/icons/hospital.png";
              } else if (tags.amenity === "clinic") {
                iconUrl = "/icons/clinic.png";
              } else {
                iconUrl = "/icons/pharmacy.png";
              }
              const markerIcon = L.icon({
                iconUrl,
                shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -36],
              });
              L.marker([alat, alon], { icon: markerIcon })
                .addTo(this.map)
                .bindPopup(`<b>${tags.name || tags.amenity}</b>`);
            });
          } catch (err) {
            console.error('Overpass query failed:', err);
          }
        },
        (err) => {
          console.error("Gagal mendapatkan lokasi:", err);
        }
      );
    }
  }

  _initBaseLayers() {
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    const osmHOT = L.tileLayer(
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    const openTopoMap = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    L.control
      .layers(
        {
          OpenStreetMap: osm,
          'OpenStreetMap.HOT': osmHOT,
          OpenTopoMap: openTopoMap,
        },
        {},
        { position: 'topright' }
      )
      .addTo(this.map);
  }
}
