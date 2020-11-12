import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


const Mapbox = ({ place }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoibm95cnZlbiIsImEiOiJja2dwZWM1NHUya2Q0MnN0ZXV6c2lmeHV1In0.9bkWgI7WFqwc259SYw68uQ';
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/noyrven/ckgrz4c7e0prc19pafr7zu85n", // stylesheet location
        center: [place.location.coordinates[0], place.location.coordinates[1]],
        zoom: 16
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      new mapboxgl.Marker()
      .setLngLat([place.location.coordinates[0], place.location.coordinates[1]])
      .addTo(map);
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, place]);

  return <div ref={el => (mapContainer.current = el)} />;
};

export default Mapbox;