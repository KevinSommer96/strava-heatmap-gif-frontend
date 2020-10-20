import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import mapboxGLDrawRectangleDrag from 'mapboxgl-draw-rectangle-drag';

const styles = {
  width: '80vw',
  height: 'calc(80vh - 80px)',
  position: 'absolute',
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState({});
  const mapContainer = useRef(null);

  // console.log(MapboxDraw);
  // console.log(new MapboxDraw());

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [6, 50],
        zoom: 7,
      });

      const modes = MapboxDraw.modes;
      modes.draw_rectangle = DrawRectangle;

      const draw = new MapboxDraw({
        modes: {
          ...MapboxDraw.modes,
          DRAW_RECTANGLE: mapboxGLDrawRectangleDrag,
        },
      });

      console.log('draw', draw);

      // setDraw(
      //   new MapboxDraw({
      //     controls: { point: true },
      //     displayControlsDefault: false,
      //     modes: {
      //       ...MapboxDraw.modes,
      //       DRAW_RECTANGLE: mapboxGLDrawRectangleDrag,
      //     },
      //   })
      // );

      // draw.changeMode('DRAW_RECTANGLE');
      map.addControl(draw, 'top-left');

      draw.changeMode('draw_rectangle');
      map.on('draw.create', function (feature) {
        console.log(feature);
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
          const draw_copy = draw;
          // draw_copy.changeMode('DRAW_RECTANGLE');
          // console.log(draw);
        }}
        className='enable'
      >
        Enable control
      </button>
      <div ref={(el) => (mapContainer.current = el)} style={styles}></div>
    </>
  );
};

export default MapboxGLMap;
