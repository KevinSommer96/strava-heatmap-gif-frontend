import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import styled from 'styled-components';
import * as turf from '@turf/turf';
import { Container, Heading, Button } from '../../common/styles';

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 1em auto;
  font-size: 150%;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.3em;
  height: 1em;
`;

const Input = styled.input`
  width: 20%;
  height: 100%;
`;

const styles = {
  width: '60vw',
  height: '65vh',
  margin: '0 auto',
};

const coordsToRatio = (coords) => {
  const transformedCoords = turf.toMercator(turf.multiPoint(coords)).geometry
    .coordinates;
  const longitudes = transformedCoords.map((el) => el[0]);
  const latitudes = transformedCoords.map((el) => el[1]);
  const min_lon = Math.min(...longitudes);
  const max_lat = Math.max(...latitudes);
  const max_lon = Math.max(...longitudes);
  const min_lat = Math.min(...latitudes);

  return (max_lat - min_lat) / (max_lon - min_lon);
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const [pos, setPos] = useState([7.36, 50.21]);
  const [coords, setCoords] = useState([]);
  const mapContainer = useRef(null);
  const [gif, setGif] = useState(false);

  const formik = useFormik({
    initialValues: {
      colour: '#d9381e',
      backgroundColour: '#1a1a1d',
      mapType: 'none',
      alpha: 0.5,
    },
    onSubmit: (values) => {
      if (coords.length !== 0) {
        setGif(true);
      }
    },
  });
  navigator.geolocation.getCurrentPosition((position) => {
    setPos([position.coords.longitude, position.coords.latitude]);
  });
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: pos,
        zoom: 10,
      });

      var draw = new MapboxDraw({
        displayControlsDefault: false,
        modes: {
          ...MapboxDraw.modes,
          DRAW_RECTANGLE: DrawRectangle,
        },
      });

      map.addControl(draw, 'top-left');
      draw.changeMode('DRAW_RECTANGLE');

      map.on('draw.create', function (feature) {
        console.log('feature', feature);
        console.log(draw.get(feature.features[0].id));
        setCoords(feature.features[0].geometry.coordinates[0]);
      });

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, pos]);

  return (
    <>
      {gif ? (
        <Redirect
          to={{
            pathname: '/gif',
            state: {
              coords: coords,
              ratio: coordsToRatio(coords),
              colour: formik.values.colour,
              backgroundColour: formik.values.backgroundColour,
              alpha: formik.values.alpha,
            },
          }}
        />
      ) : (
        <Container>
          <Heading>Select a Region</Heading>
        </Container>
      )}
      <div ref={(el) => (mapContainer.current = el)} style={styles} />

      <FormBox onSubmit={formik.handleSubmit}>
        <InputBox>
          <label htmlFor='colour'>Colour</label>
          <Input
            id='colour'
            name='colour'
            type='color'
            onChange={formik.handleChange}
            value={formik.values.colour}
          />
        </InputBox>
        <InputBox>
          <label htmlFor='backgroundColour'>Background Colour</label>
          <Input
            id='backgroundColour'
            name='backgroundColour'
            type='color'
            onChange={formik.handleChange}
            value={formik.values.backgroundColour}
          />
        </InputBox>
        <InputBox>
          <label htmlFor='alpha'>Alpha</label>
          <Input
            type='number'
            id='alpha'
            name='alpha'
            min='0'
            max='1'
            step='0.1'
            onChange={formik.handleChange}
            value={formik.values.alpha}
          />
        </InputBox>
        <InputBox>
          <Button
            onClick={() => {
              setMap(null);
              setCoords([]);
              formik.resetForm();
            }}
          >
            Reset
          </Button>
          <Button type='submit'>Submit</Button>
        </InputBox>
      </FormBox>
    </>
  );
};

export default MapboxGLMap;
