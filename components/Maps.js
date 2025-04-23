import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -16.3780823,
  lng: -40.8648211,
};

export default function MapWeb() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCjMCD2Ffsvjh90LaM1JSoHXeG8vEMf2M4">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
