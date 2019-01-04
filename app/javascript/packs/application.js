import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css';

import { initMapbox } from '../plugins/init_mapbox';
import { previewImageOnFileSelect } from '../components/photo_preview.js';

initMapbox();
previewImageOnFileSelect();
