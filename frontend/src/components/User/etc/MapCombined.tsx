import React, { useEffect, useRef, useState } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapDisplayComponentProps {
    onMapClick: (lat: number, lng: number) => void;
    initialLat?: number;
    initialLng?: number;
    imageUrl?: string;
}

const MapCombined: React.FC<MapDisplayComponentProps> = ({
    onMapClick,
    initialLat = 14.882087,
    initialLng = 102.020948,
    imageUrl
}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [lat, setLat] = useState<number>(initialLat);
    const [lng, setLng] = useState<number>(initialLng);

    useEffect(() => {
        if (mapRef.current) {
            const map = L.map(mapRef.current).setView([lat, lng], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            map.on('click', (e: LeafletMouseEvent) => {
                const { lat, lng } = e.latlng;
                setLat(lat);
                setLng(lng);
                onMapClick(lat, lng);
            });
            
            if (imageUrl) {
                const customIcon = L.divIcon({
                    className: 'custom-icon',
                    html: `<img style="width: 15px; height: 20px; background: transparent;" src="${imageUrl}" alt="Custom Marker" />`,
                });

                L.marker([lat, lng], { icon: customIcon }).addTo(map);
            }

            return () => {
                map.off('click');
                map.remove();
            };
        }
    }, [lat, lng, imageUrl, onMapClick]);

    useEffect(() => {
        // Update the map when initialLat or initialLng changes
        setLat(initialLat);
        setLng(initialLng);
    }, [initialLat, initialLng]);

    return <div id="map" style={{ height: '300px', width: '300px' }} ref={mapRef} />;
};

export default MapCombined;
