import React, { useEffect, useRef, useState } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
    onMapClick: (lat: number, lng: number) => void;
}

const MapInteraction: React.FC<MapComponentProps> = ({ onMapClick }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLong] = useState<number>(0);

    useEffect(() => {
        if (mapRef.current) {
            const map = L.map(mapRef.current!).setView([14.882087, 102.020948], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            map.on('click', (e: LeafletMouseEvent) => {
                const { lat, lng } = e.latlng;
                setLat(lat);
                setLong(lng);
                onMapClick(lat, lng);
            });


            const markerIcon = L.icon({
                iconUrl: 'https://e7.pngegg.com/pngimages/457/630/png-clipart-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-thumbnail.png',
                iconSize: [15, 20],
                iconAnchor: [16, 32],
                popupAnchor: [0, 0],
            });

            L.marker([lat, lng], { icon: markerIcon }).addTo(map);

            return () => {
                map.off('click');
                map.remove();
            };
        }
        return () => { };
    }, [lat, lng, onMapClick]);

    return <div id="map" style={{ height: '300px', width: '300px' }} ref={mapRef} />;
};

export default MapInteraction;
