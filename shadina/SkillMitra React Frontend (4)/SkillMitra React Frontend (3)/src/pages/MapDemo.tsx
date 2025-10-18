import { useState, useEffect } from 'react';
import ThrissurMap from '../components/ThrissurMap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Users, Filter, Navigation } from 'lucide-react';

interface WorkerLocation {
  id: string;
  name: string;
  skill: string;
  position: [number, number];
  rating?: number;
  color?: string;
}

// Sample worker data across Thrissur district
const sampleWorkerLocations: WorkerLocation[] = [
  { id: '1', name: 'Ravi Kumar', skill: 'Electrician', position: [10.5276, 76.2144], rating: 4.8, color: '#0891b2' },
  { id: '2', name: 'Priya Menon', skill: 'House Cleaning', position: [10.5650, 76.2120], rating: 4.9, color: '#06b6d4' },
  { id: '3', name: 'Arun Nair', skill: 'Plumber', position: [10.4950, 76.2300], rating: 4.6, color: '#0891b2' },
  { id: '4', name: 'Suma Krishnan', skill: 'Cook', position: [10.5100, 76.1800], rating: 4.7, color: '#14b8a6' },
  { id: '5', name: 'Vijay Raj', skill: 'Carpenter', position: [10.5400, 76.2500], rating: 4.5, color: '#0891b2' },
  { id: '6', name: 'Lakshmi Pillai', skill: 'Gardener', position: [10.5500, 76.2000], rating: 4.8, color: '#06b6d4' },
  { id: '7', name: 'Suresh Babu', skill: 'Painter', position: [10.5000, 76.2400], rating: 4.4, color: '#0891b2' },
  { id: '8', name: 'Meera Das', skill: 'Tailor', position: [10.5600, 76.2300], rating: 4.9, color: '#14b8a6' },
  { id: '9', name: 'Anand Kumar', skill: 'Mechanic', position: [10.5350, 76.2050], rating: 4.7, color: '#0891b2' },
  { id: '10', name: 'Divya Nambiar', skill: 'Beautician', position: [10.5150, 76.2250], rating: 4.8, color: '#06b6d4' },
];

export function MapDemo() {
  const [workers, setWorkers] = useState<WorkerLocation[]>(sampleWorkerLocations);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [showNearbyOnly, setShowNearbyOnly] = useState(false);

  useEffect(() => {
    let filtered = sampleWorkerLocations;

    // Filter by skill
    if (selectedSkill) {
      filtered = filtered.filter(w => w.skill === selectedSkill);
    }

    setWorkers(filtered);
  }, [selectedSkill, showNearbyOnly]);

  const skills = Array.from(new Set(sampleWorkerLocations.map((w) => w.skill))).sort();

  return (
    <div className="space-y-6 px-4 py-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center mb-4">
          <div className="size-16 rounded-2xl bg-gradient-ocean flex items-center justify-center shadow-ocean-glow">
            <MapPin className="size-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-navy-deep">
          Find Workers Near You
        </h1>
        <p className="text-charcoal-dark text-lg max-w-2xl mx-auto">
          Discover skilled workers across Thrissur district with our interactive map
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card className="card-ocean">
          <CardContent className="pt-6 text-center">
            <div className="size-12 rounded-xl bg-gradient-aqua flex items-center justify-center mx-auto mb-3 shadow-ocean-soft">
              <Users className="size-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-navy-deep">{workers.length}</div>
            <div className="text-sm text-charcoal-medium">Workers Available</div>
          </CardContent>
        </Card>

        <Card className="card-ocean">
          <CardContent className="pt-6 text-center">
            <div className="size-12 rounded-xl bg-gradient-teal flex items-center justify-center mx-auto mb-3 shadow-ocean-soft">
              <Filter className="size-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-navy-deep">{skills.length}</div>
            <div className="text-sm text-charcoal-medium">Different Skills</div>
          </CardContent>
        </Card>

        <Card className="card-ocean">
          <CardContent className="pt-6 text-center">
            <div className="size-12 rounded-xl bg-gradient-coral flex items-center justify-center mx-auto mb-3 shadow-ocean-soft">
              <Navigation className="size-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-navy-deep">Thrissur</div>
            <div className="text-sm text-charcoal-medium">District Coverage</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-ocean max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-navy-deep flex items-center gap-2">
            <Filter className="size-5 text-ocean-deep" />
            Filter Workers
          </CardTitle>
          <CardDescription className="text-charcoal-medium">
            Refine your search by skill or location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Skill Filter */}
            <div>
              <label className="block text-sm font-medium text-navy-deep mb-2">
                Filter by Skill
              </label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-4 py-2 border-2 border-ocean-light rounded-lg focus:border-ocean-bright focus:ring-2 focus:ring-ocean-whisper outline-none transition-colors text-charcoal-dark bg-white"
              >
                <option value="">All Skills</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* Proximity Filter */}
            <div className="flex flex-col justify-end">
              <div className="text-sm font-medium text-navy-deep mb-2">
                Location Filter
              </div>
              <div className="p-3 bg-mist-blue border-2 border-ocean-light rounded-lg text-sm text-charcoal-medium text-center">
                <MapPin className="size-4 inline mr-1 text-ocean-deep" />
                Showing workers in Thrissur district
              </div>
            </div>
          </div>

          {selectedSkill && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-charcoal-medium">Active filter:</span>
              <span className="bg-turquoise-mist text-ocean-deep px-3 py-1 rounded-full font-medium">
                {selectedSkill}
              </span>
              <button
                onClick={() => setSelectedSkill('')}
                className="text-coral-pink hover:text-coral-soft transition-colors ml-auto"
              >
                Clear
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Map */}
      <div className="max-w-6xl mx-auto">
        <Card className="card-ocean">
          <CardHeader>
            <CardTitle className="text-navy-deep flex items-center gap-2">
              <MapPin className="size-5 text-ocean-deep" />
              Thrissur District Map
            </CardTitle>
            <CardDescription className="text-charcoal-medium">
              Interactive map showing worker locations across Thrissur. Click markers for details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThrissurMap
              workers={workers}
              showUserLocation={true}
              height="600px"
              className="shadow-inner"
            />
          </CardContent>
        </Card>
      </div>

      {/* Worker List */}
      <div className="max-w-4xl mx-auto">
        <Card className="card-ocean">
          <CardHeader>
            <CardTitle className="text-navy-deep">Workers in View</CardTitle>
            <CardDescription className="text-charcoal-medium">
              {workers.length} worker{workers.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="flex items-center gap-4 p-4 bg-mist-blue rounded-lg hover:bg-turquoise-mist transition-colors border border-ocean-light"
                >
                  <div className="size-12 rounded-full bg-gradient-teal flex items-center justify-center text-white font-bold shadow-ocean-soft">
                    {worker.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy-deep">{worker.name}</h3>
                    <p className="text-sm text-ocean-deep font-medium">{worker.skill}</p>
                  </div>
                  {worker.rating && (
                    <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-ocean-soft">
                      <span className="text-coral-pink">★</span>
                      <span className="text-sm font-bold text-navy-deep">
                        {worker.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                  <Button size="sm" className="btn-ocean-primary">
                    Contact
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MapDemo;
