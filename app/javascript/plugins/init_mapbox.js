import mapboxgl from 'mapbox-gl';

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    const markers = JSON.parse(mapElement.dataset.markers);
    const mapMarkers = []
    markers.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

      const m = new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(map)
      mapMarkers.push(m)
      m.getElement().dataset.markerId = marker.id;
      m.getElement().addEventListener('mouseenter', (e) => toggleHighlightCard(e) );
      m.getElement().addEventListener('mouseleave', (e) => toggleHighlightCard(e) );
    });

    fitMapToMarkers(map, markers);
    openInfoWindow(mapMarkers);
  }
};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};

const highlightCard = (event) => {
  const card = document.querySelector(`[data-flat-id="${event.currentTarget.dataset.markerId}"]`);
  card.classList.add('highlight');
}

const toggleHighlightCard = (event) => {
  const card = document.querySelector(`[data-flat-id="${event.currentTarget.dataset.markerId}"]`);
  card.classList.toggle('highlight');
}

const openInfoWindow = (markers) => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => { markers[index].togglePopup(); });
    card.addEventListener('mouseleave', () => { markers[index].togglePopup(); });
  });
}

export { initMapbox };
