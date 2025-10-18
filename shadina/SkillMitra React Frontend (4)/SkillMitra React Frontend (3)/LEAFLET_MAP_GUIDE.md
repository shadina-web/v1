# 🗺️ Leaflet Map Integration Guide

## Overview
This project uses **Leaflet.js** (via React-Leaflet) instead of Google Maps for displaying worker locations across **Thrissur district, Kerala, India**. The implementation is completely free with no API keys required and features a custom ocean/mermaid theme.

---

## 📦 Installation

The following packages have been installed:

```bash
npm install leaflet react-leaflet@4 @types/leaflet --legacy-peer-deps
```

**Note**: We use React-Leaflet v4 for compatibility with React 18.

---

## 🎯 Key Features

### ✅ Thrissur District Focused
- **Center Coordinates**: 10.5276°N, 76.2144°E
- **Default Zoom**: Level 11 (shows entire district)
- **Boundary Restrictions**: Users cannot pan outside Thrissur district
- **Bounds**: Southwest (10.25, 75.95) to Northeast (10.75, 76.45)

### ✅ Map Tiles
- **Provider**: OpenStreetMap (OSM)
- **No API Key Required**: Completely free and open-source
- **Custom Styling**: Ocean-themed filter applied for soft blue appearance

### ✅ Markers
- **User Location**: Pink pulsing marker (requires geolocation permission)
- **Worker Locations**: Custom ocean-themed teardrop markers
- **Interactive Popups**: Click markers to view worker details, ratings, and profile buttons

### ✅ Ocean/Mermaid Theme
- Soft blue water tones (hue-rotated OpenStreetMap)
- Custom styled controls and popups
- Ocean-colored markers (#0891b2 cyan, #14b8a6 teal)
- White borders and shadows for ocean aesthetic

### ✅ Responsive Design
- Fully responsive to container size
- Mobile-friendly zoom controls
- Adapts to screen width automatically

---

## 🧩 Component Structure

### `ThrissurMap.tsx`
Main map component with the following props:

```typescript
interface ThrissurMapProps {
  workers?: Worker[];           // Array of worker locations
  showUserLocation?: boolean;   // Show user's current location
  height?: string;              // Map height (default: '500px')
  className?: string;           // Additional CSS classes
}

interface Worker {
  id: string;
  name: string;
  skill: string;
  position: [number, number];  // [latitude, longitude]
  rating?: number;
  color?: string;              // Custom marker color
}
```

**Key Features**:
- Automatic geolocation detection
- Boundary restriction enforcement
- Custom ocean-themed markers
- Interactive popups with worker information

### `MapDemo.tsx`
Demo page showcasing the map with:
- Sample worker data (10 workers across Thrissur)
- Skill filtering dropdown
- Worker statistics cards
- Responsive grid layout
- Ocean theme styling

---

## 🚀 Usage Examples

### Basic Usage

```tsx
import ThrissurMap from '../components/ThrissurMap';

function MyPage() {
  const workers = [
    {
      id: '1',
      name: 'Ravi Kumar',
      skill: 'Electrician',
      position: [10.5276, 76.2144],
      rating: 4.8,
      color: '#0891b2'
    }
  ];

  return (
    <ThrissurMap
      workers={workers}
      showUserLocation={true}
      height="600px"
    />
  );
}
```

### With Custom Styling

```tsx
<ThrissurMap
  workers={workerData}
  showUserLocation={true}
  height="500px"
  className="shadow-lg border-2 border-ocean-whisper"
/>
```

### In a Card Container

```tsx
<Card>
  <CardHeader>
    <CardTitle>Find Workers Near You</CardTitle>
  </CardHeader>
  <CardContent>
    <ThrissurMap
      workers={filteredWorkers}
      showUserLocation={true}
      height="600px"
    />
  </CardContent>
</Card>
```

---

## 🎨 Customization

### Custom Marker Colors

You can customize worker marker colors by passing the `color` prop:

```typescript
const workers = [
  { id: '1', name: 'Worker 1', color: '#0891b2' }, // Ocean cyan
  { id: '2', name: 'Worker 2', color: '#14b8a6' }, // Teal
  { id: '3', name: 'Worker 3', color: '#06b6d4' }, // Light cyan
];
```

### Adjusting Map Bounds

Edit the `THRISSUR_BOUNDS` constant in `ThrissurMap.tsx`:

```typescript
const THRISSUR_BOUNDS: L.LatLngBoundsExpression = [
  [10.25, 75.95], // Southwest corner
  [10.75, 76.45], // Northeast corner
];
```

### Changing Zoom Levels

```typescript
const DEFAULT_ZOOM = 11;  // Change default zoom
// In MapContainer:
minZoom={10}  // Minimum zoom level
maxZoom={16}  // Maximum zoom level
```

### Custom Tile Providers

Replace the default OpenStreetMap tiles:

```tsx
{/* Alternative: Watercolor style */}
<TileLayer
  url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
  attribution='Map tiles by Stamen Design'
/>

{/* Alternative: Dark theme */}
<TileLayer
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; OpenStreetMap, &copy; CartoDB'
/>
```

---

## 🌐 Accessing the Map

### Routes
- **Map Demo**: `http://localhost:3000/map`
- **Home Page**: Main landing page (map can be integrated)
- **Matching Page**: Can integrate map for showing matched workers

### Navigation
The map demo is accessible via:
1. Direct URL: `/map`
2. Add to navbar (optional)
3. Embedded in other pages (Dashboard, Profile, etc.)

---

## 🔒 Geolocation Permissions

### How It Works
1. Map automatically requests geolocation permission when `showUserLocation={true}`
2. If granted, shows pink pulsing marker at user's location
3. If denied, map still works but no user marker appears
4. Location is validated to be within Thrissur bounds

### Testing Geolocation
- **Chrome**: Settings → Privacy → Site Settings → Location
- **Firefox**: Permissions icon in address bar
- **Localhost**: Usually allowed by default

### Fallback Behavior
If user denies permission or is outside Thrissur:
- Map still loads with center at Thrissur
- Worker markers still visible
- Console log shows status message

---

## 📱 Responsive Design

### Mobile Optimization
- Zoom controls scale down on mobile (90% size)
- Touch-friendly marker interactions
- Popups adjust to screen width
- Grid layouts stack vertically

### Container Sizing
The map is **100% responsive** to its container:

```tsx
{/* Full viewport height */}
<ThrissurMap height="100vh" />

{/* Fixed pixel height */}
<ThrissurMap height="500px" />

{/* Percentage of container */}
<div style={{ height: '80vh' }}>
  <ThrissurMap height="100%" />
</div>
```

---

## 🎯 Performance Tips

### Optimizing Marker Count
- Limit visible markers to 50-100 for best performance
- Use clustering for large datasets (install `react-leaflet-cluster`)
- Filter workers by skill/location before passing to map

### Lazy Loading
```tsx
import { lazy, Suspense } from 'react';

const ThrissurMap = lazy(() => import('../components/ThrissurMap'));

function MyPage() {
  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <ThrissurMap workers={workers} />
    </Suspense>
  );
}
```

### Reducing Tile Requests
- Set appropriate `minZoom` and `maxZoom` limits
- Use `maxBounds` to prevent unnecessary tile loading
- Cache tiles in browser (automatic with Leaflet)

---

## 🔧 Troubleshooting

### Markers Not Showing
**Issue**: Default Leaflet markers may not appear  
**Solution**: The component includes marker icon fix:
```typescript
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});
```

### Map Not Loading
**Issue**: Blank gray box instead of map  
**Solutions**:
1. Import Leaflet CSS: `import 'leaflet/dist/leaflet.css';`
2. Set container height explicitly
3. Check browser console for errors

### Popups Not Styled
**Issue**: Popups appear without ocean theme  
**Solution**: Ensure `<style>` block in `ThrissurMap.tsx` is rendering

### Boundaries Not Working
**Issue**: Users can pan outside Thrissur  
**Solution**: Verify `maxBoundsViscosity={1.0}` is set in `MapContainer`

---

## 🆚 Google Maps vs Leaflet

| Feature | Google Maps | Leaflet + OSM |
|---------|-------------|---------------|
| **API Key** | Required | ❌ Not needed |
| **Cost** | $200/month free, then paid | ✅ Completely free |
| **Customization** | Limited | ✅ Highly customizable |
| **Performance** | Good | ✅ Excellent (lighter) |
| **Offline** | No | ✅ Possible with tiles |
| **Privacy** | Tracked by Google | ✅ No tracking |
| **Styling** | Complex | ✅ CSS-based, easy |

---

## 📚 Additional Resources

- **Leaflet Docs**: https://leafletjs.com/
- **React-Leaflet**: https://react-leaflet.js.org/
- **OpenStreetMap**: https://www.openstreetmap.org/
- **Custom Tiles**: https://leaflet-extras.github.io/leaflet-providers/preview/

---

## 🎨 Ocean Theme CSS Variables

The map uses these CSS variables (defined in `colors.css`):

```css
--ocean-primary: #0891b2;
--ocean-accent: #06b6d4;
--ocean-deep: #164e63;
--ocean-whisper: #cffafe;
--ocean-mist: #ecfeff;
--ocean-muted: #0e7490;
```

Customize these to change the entire map color scheme!

---

## ✅ Next Steps

1. **Integrate with Backend**: Connect to your API to fetch real worker locations
2. **Add Clustering**: Install `react-leaflet-cluster` for many markers
3. **Real-time Updates**: Use WebSockets to update worker positions live
4. **Routing**: Add directions between user and worker locations
5. **Search**: Implement geocoding for address-based search
6. **Heatmaps**: Visualize worker density across Thrissur

---

## 📝 Notes

- **No Google Maps API needed**: Completely free solution
- **Thrissur-focused**: Optimized for local district coverage
- **Ocean theme**: Matches SkillMitra's mermaid color palette
- **Production ready**: Fully responsive and performant
- **Extensible**: Easy to add features like clustering, routing, etc.

---

**Happy Mapping! 🗺️🌊**
