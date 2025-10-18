import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Thrissur district center coordinates
const THRISSUR_CENTER: [number, number] = [10.5276, 76.2144];
const DEFAULT_ZOOM = 11;

// Thrissur district approximate boundaries
const THRISSUR_BOUNDS: L.LatLngBoundsExpression = [
  [10.25, 75.95], // Southwest corner
  [10.75, 76.45], // Northeast corner
];

// Custom ocean-themed marker icon for workers
const createWorkerIcon = (color: string = '#0891b2') => {
  return L.divIcon({
    className: 'custom-worker-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 6px rgba(8, 145, 178, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Custom user location marker icon
const userLocationIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: #ec4899;
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2);
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    "></div>
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

// Component to handle map bounds restriction
function MapBoundsController() {
  const map = useMap();

  useEffect(() => {
    // Set max bounds to restrict panning
    map.setMaxBounds(THRISSUR_BOUNDS);
    map.on('drag', () => {
      map.panInsideBounds(THRISSUR_BOUNDS, { animate: false });
    });
  }, [map]);

  return null;
}

interface Worker {
  id: string;
  name: string;
  skill: string;
  position: [number, number];
  rating?: number;
  color?: string;
}

interface ThrissurMapProps {
  workers?: Worker[];
  showUserLocation?: boolean;
  height?: string;
  className?: string;
}

export default function ThrissurMap({
  workers = [],
  showUserLocation = true,
  height = '500px',
  className = '',
}: ThrissurMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Get user's location if permission is granted
    if (showUserLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Check if user is within Thrissur district bounds
          if (
            latitude >= 10.25 &&
            latitude <= 10.75 &&
            longitude >= 75.95 &&
            longitude <= 76.45
          ) {
            setUserLocation([latitude, longitude]);
          } else {
            // User is outside Thrissur, don't show location
            console.log('User location is outside Thrissur district');
          }
        },
        (error) => {
          console.log('Location permission denied or unavailable:', error.message);
        }
      );
    }
  }, [showUserLocation]);

  return (
    <div className={`thrissur-map-container ${className}`} style={{ height, width: '100%' }}>
      <MapContainer
        center={THRISSUR_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={10}
        maxZoom={16}
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        scrollWheelZoom={true}
        maxBounds={THRISSUR_BOUNDS}
        maxBoundsViscosity={1.0}
      >
        {/* Ocean-themed OpenStreetMap tiles with custom styling */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="ocean-themed-tiles"
        />

        {/* Bounds controller */}
        <MapBoundsController />

        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold text-ocean-deep">Your Location</p>
                <p className="text-sm text-ocean-muted">Thrissur, Kerala</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Worker markers */}
        {workers.map((worker) => (
          <Marker
            key={worker.id}
            position={worker.position}
            icon={createWorkerIcon(worker.color)}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-bold text-ocean-deep mb-1">{worker.name}</h3>
                <p className="text-sm text-ocean-muted mb-2">{worker.skill}</p>
                {worker.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{worker.rating.toFixed(1)}</span>
                  </div>
                )}
                <button className="mt-3 w-full bg-ocean-primary hover:bg-ocean-accent text-white px-3 py-1.5 rounded-md text-sm transition-colors">
                  View Profile
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom CSS for ocean theme */}
      <style>{`
        .thrissur-map-container {
          position: relative;
          overflow: hidden;
        }

        /* Ocean-themed tile filter for subtle blue tint */
        .ocean-themed-tiles {
          filter: hue-rotate(190deg) saturate(0.8) brightness(1.05);
          opacity: 0.95;
        }

        /* Leaflet control styling - ocean theme */
        .leaflet-control-zoom a {
          background-color: white !important;
          color: var(--ocean-primary, #0891b2) !important;
          border: 2px solid var(--ocean-whisper, #cffafe) !important;
          transition: all 0.3s ease !important;
        }

        .leaflet-control-zoom a:hover {
          background-color: var(--ocean-whisper, #cffafe) !important;
          transform: scale(1.05);
        }

        /* Custom marker popups - ocean theme */
        .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(8, 145, 178, 0.2);
          border: 2px solid var(--ocean-whisper, #cffafe);
        }

        .leaflet-popup-tip {
          background: white;
          border: 2px solid var(--ocean-whisper, #cffafe);
          border-top: none;
          border-left: none;
        }

        /* Remove default marker shadow for custom icons */
        .custom-worker-marker,
        .custom-user-marker {
          background: transparent !important;
          border: none !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .leaflet-control-zoom {
            transform: scale(0.9);
          }
        }

        /* Loading state */
        .thrissur-map-container .leaflet-container {
          background: linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%);
        }

        /* Attribution styling */
        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.9) !important;
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
