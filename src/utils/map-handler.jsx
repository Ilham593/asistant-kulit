import L from 'leaflet';

export default class MapHandler {
  constructor(container) {
    this.container = container;
    this.map = null;
  }

  initMap() {
    this.map = L.map(this.container).setView([-2.5489, 118.0149], 5);
    this._initBaseLayers();
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
