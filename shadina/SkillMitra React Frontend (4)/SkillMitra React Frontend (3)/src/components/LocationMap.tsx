import { useCallback, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Thrissur district boundaries (approximate)
const THRISSUR_BOUNDS = {
  north: 10.75,
  south: 10.25,
  east: 76.50,
  west: 76.00,
};

// Center of Thrissur district
const THRISSUR_CENTER = {
  lat: 10.5276,
  lng: 76.2144,
};

// Ocean Mermaid themed map styles
const mapStyles = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#90E0EF' }, { lightness: 17 }], // Ocean light
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#F8FEFF' }, { lightness: 20 }], // Pearl white
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#CAF0F8' }, { lightness: 17 }], // Ocean whisper
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#00B4D8' }, { lightness: 29 }, { weight: 0.2 }], // Ocean bright
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#FFFFFF' }, { lightness: 18 }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#FFFFFF' }, { lightness: 16 }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#B2F5D8' }, { lightness: 21 }], // Sea green pastel
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#7FDBBB' }], // Sea green soft
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#ADE8F4' }], // Turquoise mist
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{ color: '#F0F9FF' }, { lightness: 20 }], // Mist blue
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#48CAE4' }, { lightness: 17 }, { weight: 1.2 }], // Turquoise calm
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ visibility: 'on' }, { color: '#FFFFFF' }, { lightness: 16 }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ saturation: 36 }, { color: '#001F3F' }, { lightness: 40 }], // Navy deep
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'on' }, { saturation: -50 }],
  },
];

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '20px',
};

export interface WorkerLocation {
  id: string;
  name: string;
  skill: string;
  lat: number;
  lng: number;
  rating?: number;
  phone?: string;
}

interface LocationMapProps {
  workers?: WorkerLocation[];
  userLocation?: { lat: number; lng: number };
  onMarkerClick?: (worker: WorkerLocation) => void;
}

export function LocationMap({ workers = [], userLocation, onMarkerClick }: LocationMapProps) {
  const [selectedWorker, setSelectedWorker] = useState<WorkerLocation | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    // Set map restrictions to Thrissur district
    map.setOptions({
      restriction: {
        latLngBounds: THRISSUR_BOUNDS,
        strictBounds: false,
      },
    });
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (worker: WorkerLocation) => {
    setSelectedWorker(worker);
    if (onMarkerClick) {
      onMarkerClick(worker);
    }
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return (
      <div className="card-ocean p-8 text-center">
        <div className="mb-4">
          <svg className="mx-auto h-16 w-16 text-ocean-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-navy-deep mb-2">Google Maps Configuration Required</h3>
        <p className="text-charcoal-medium mb-4">
          Please add your Google Maps API key to the <code className="bg-ocean-whisper px-2 py-1 rounded text-ocean-deep">.env</code> file.
        </p>
        <div className="bg-mist-blue p-4 rounded-lg text-left">
          <p className="text-sm text-charcoal-dark mb-2 font-semibold">Steps:</p>
          <ol className="text-sm text-charcoal-dark space-y-1 list-decimal list-inside">
            <li>Get a Google Maps API key from Google Cloud Console</li>
            <li>Enable Maps JavaScript API</li>
            <li>Add to <code className="bg-white px-1 rounded">.env</code>: <code className="bg-white px-1 rounded">VITE_GOOGLE_MAPS_API_KEY=your_key_here</code></li>
            <li>Restart the development server</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="card-ocean p-0 overflow-hidden shadow-ocean-glow">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={THRISSUR_CENTER}
          zoom={11}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: mapStyles,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
            restriction: {
              latLngBounds: THRISSUR_BOUNDS,
              strictBounds: false,
            },
          }}
        >
          {/* User location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#FF9999', // Coral pink
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 3,
              }}
              title="Your Location"
            />
          )}

          {/* Worker location markers */}
          {workers.map((worker) => (
            <Marker
              key={worker.id}
              position={{ lat: worker.lat, lng: worker.lng }}
              onClick={() => handleMarkerClick(worker)}
              icon={{
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 6,
                fillColor: '#00B4D8', // Ocean bright
                fillOpacity: 0.9,
                strokeColor: '#006B8F', // Ocean deep
                strokeWeight: 2,
                rotation: 180,
              }}
              title={worker.name}
            />
          ))}

          {/* Info window for selected worker */}
          {selectedWorker && (
            <InfoWindow
              position={{ lat: selectedWorker.lat, lng: selectedWorker.lng }}
              onCloseClick={() => setSelectedWorker(null)}
            >
              <div className="p-3 max-w-xs">
                <h3 className="text-lg font-bold text-navy-deep mb-1">{selectedWorker.name}</h3>
                <p className="text-sm text-ocean-deep font-semibold mb-2">{selectedWorker.skill}</p>
                {selectedWorker.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-coral-pink text-sm">★</span>
                    <span className="text-sm text-charcoal-dark font-medium">{selectedWorker.rating.toFixed(1)}</span>
                  </div>
                )}
                {selectedWorker.phone && (
                  <p className="text-xs text-charcoal-medium">{selectedWorker.phone}</p>
                )}
                <button className="mt-3 bg-gradient-ocean text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity w-full font-medium">
                  View Profile
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default LocationMap;
