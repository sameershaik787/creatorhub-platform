import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function LocationMap({ creators, selectedCreator, onSelectCreator }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      // Default centered on USA / Europe center or 20, 0
      const map = L.map(mapRef.current).setView([40, -40], 2);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Custom Icon Generator
    const createCustomIcon = (creator) => {
      const isSelected = selectedCreator && selectedCreator.id === creator.id;
      return L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            width: ${isSelected ? '44px' : '36px'};
            height: ${isSelected ? '44px' : '36px'};
            border-radius: 50%;
            border: 3px solid ${isSelected ? '#ec4899' : '#6366f1'};
            box-shadow: 0 0 15px ${isSelected ? 'rgba(236, 72, 153, 0.8)' : 'rgba(99, 102, 241, 0.6)'};
            overflow: hidden;
            background: #090d16;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <img src="${creator.avatar}" style="width:100%; height:100%; object-fit:cover;" />
          </div>
        `,
        iconSize: [isSelected ? 44 : 36, isSelected ? 44 : 36],
        iconAnchor: [isSelected ? 22 : 18, isSelected ? 22 : 18]
      });
    };

    // Add markers for all creators
    const bounds = L.latLngBounds();

    creators.forEach((creator) => {
      if (creator.lat && creator.lng) {
        const marker = L.marker([creator.lat, creator.lng], {
          icon: createCustomIcon(creator)
        }).addTo(map);

        marker.on('click', () => {
          if (onSelectCreator) onSelectCreator(creator);
        });

        marker.bindTooltip(`
          <div style="font-family: sans-serif; font-size: 12px; color: #fff; background: #0f172a; padding: 4px 8px; border-radius: 6px; border: 1px solid #334155;">
            <strong>${creator.name}</strong><br/>
            <span style="color: #818cf8;">${creator.title}</span><br/>
            <span style="color: #34d399;">$${creator.hourlyRate}/hr</span> • ${creator.location}
          </div>
        `, { direction: 'top', opacity: 0.9 });

        markersRef.current.push(marker);
        bounds.extend([creator.lat, creator.lng]);
      }
    });

    if (creators.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
    }

  }, [creators, selectedCreator]);

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl glass-card">
      <div ref={mapRef} className="w-full h-full z-10" />
      <div className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-300 backdrop-blur-md">
        📍 {creators.length} Creators Pinned Worldwide
      </div>
    </div>
  );
}
