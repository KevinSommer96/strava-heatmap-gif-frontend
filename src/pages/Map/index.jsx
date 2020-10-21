import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import { Redirect } from 'react-router-dom';

const styles = {
  width: '80vw',
  height: 'calc(80vh - 80px)',
  position: 'absolute',
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState([]);
  const mapContainer = useRef(null);
  const [gif, setGif] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [6, 50],
        zoom: 7,
      });

      var draw = new MapboxDraw({
        modes: {
          ...MapboxDraw.modes,
          DRAW_RECTANGLE: DrawRectangle,
        },
      });

      map.addControl(draw, 'top-left');
      draw.changeMode('DRAW_RECTANGLE');

      map.on('draw.create', function (feature) {
        setCoords(feature.features[0].geometry.coordinates[0]);
      });

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <>
      <button
        onClick={() => {
          setMap(null);
          setCoords([]);
        }}
      >
        reset
      </button>
      <button
        onClick={() => {
          if (coords.length !== 0) {
            setGif(true);
          }
        }}
      >
        send
      </button>

      {gif ? (
        <Redirect
          to={{
            pathname: '/gif',
            state: { coords: coords },
          }}
        />
      ) : (
        <div>nothing selected</div>
      )}
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
    </>
  );
};

export default MapboxGLMap;
