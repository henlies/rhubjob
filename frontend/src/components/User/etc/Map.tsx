import React, { useEffect } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
    onMapClick: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onMapClick }) => {
    useEffect(() => {
        const map = L.map('map').setView([14.882087, 102.020948], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        map.on('click', (e: LeafletMouseEvent) => {
            const { lat, lng } = e.latlng;
            onMapClick(lat, lng);
        });

        return () => {
            map.off('click');
            map.remove();
        };
    }, [onMapClick]);

    return <div id="map" style={{ height: '300px', width: '300px'}} />;
};

export default MapComponent;