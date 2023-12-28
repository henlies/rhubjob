import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapDisplayComponentProps {
    initialLat?: number;
    initialLng?: number;
    imageUrl?: string;
}

const MapDisplay: React.FC<MapDisplayComponentProps> = ({
    initialLat = 14.882087,
    initialLng = 102.020948,
    imageUrl
}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (mapRef.current) {
            const map = L.map(mapRef.current).setView([initialLat, initialLng], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            if (imageUrl) {
                const customIcon = L.divIcon({
                    className: 'custom-icon',
                    html: `<img style="width: 15px; height: 20px; background: transparent;" src="${imageUrl}" alt="Custom Marker" />`,
                });


                L.marker([initialLat, initialLng], { icon: customIcon }).addTo(map);
            }

            return () => {
                map.remove();
            };
        }
    }, [initialLat, initialLng, imageUrl]);

    return <div id="map" style={{ height: '250px', width: '250px' }} ref={mapRef} />;
};

export default MapDisplay;
