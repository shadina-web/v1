import { Request } from '../lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MapPin, Wrench, Scissors, Zap, Paintbrush, Hammer, Camera, Code, Music, Car, Truck, Home, GraduationCap, Stethoscope, Calculator, Briefcase, ChefHat, Scissors as Barber, Leaf, Baby, Dog, UtensilsCrossed, Search, Droplet, Fish, Shirt, TreePine, Wheat, Milk, Pickaxe, Hammer as Builder, Wind, Eye, Shield } from 'lucide-react';

interface RequestCardProps {
  request: Request;
  onClick: () => void;
}

// Function to get icon based on service name - Village/Rural focused
const getServiceIcon = (service: string) => {
  const serviceLower = service.toLowerCase();
  
  // Traditional Village Services
  if (serviceLower.includes('plumb')) return { Icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-100' };
  if (serviceLower.includes('tailor') || serviceLower.includes('stitch') || serviceLower.includes('sew')) return { Icon: Scissors, color: 'text-pink-600', bg: 'bg-pink-100' };
  if (serviceLower.includes('carpenter') || serviceLower.includes('wood')) return { Icon: Hammer, color: 'text-amber-700', bg: 'bg-amber-100' };
  if (serviceLower.includes('electric')) return { Icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100' };
  if (serviceLower.includes('mason') || serviceLower.includes('construction') || serviceLower.includes('build')) return { Icon: Home, color: 'text-slate-600', bg: 'bg-slate-100' };
  if (serviceLower.includes('barber') || serviceLower.includes('hair')) return { Icon: Barber, color: 'text-cyan-600', bg: 'bg-cyan-100' };
  if (serviceLower.includes('cook')) return { Icon: ChefHat, color: 'text-orange-700', bg: 'bg-orange-100' };
  if (serviceLower.includes('driver') || serviceLower.includes('transport')) return { Icon: Car, color: 'text-blue-700', bg: 'bg-blue-100' };
  if (serviceLower.includes('paint')) return { Icon: Paintbrush, color: 'text-purple-600', bg: 'bg-purple-100' };
  
  // Agricultural & Rural Work
  if (serviceLower.includes('farmer') || serviceLower.includes('farm') || serviceLower.includes('agriculture')) return { Icon: Wheat, color: 'text-green-700', bg: 'bg-green-100' };
  if (serviceLower.includes('coconut') || serviceLower.includes('climb')) return { Icon: TreePine, color: 'text-green-600', bg: 'bg-green-100' };
  
  // Artisan & Craft
  if (serviceLower.includes('pot') || serviceLower.includes('clay') || serviceLower.includes('potter')) return { Icon: Droplet, color: 'text-amber-600', bg: 'bg-amber-100' };
  if (serviceLower.includes('welder') || serviceLower.includes('weld')) return { Icon: Wind, color: 'text-orange-600', bg: 'bg-orange-100' };
  
  // Food & Supply
  if (serviceLower.includes('fish')) return { Icon: Fish, color: 'text-cyan-700', bg: 'bg-cyan-100' };
  if (serviceLower.includes('milk') || serviceLower.includes('dairy')) return { Icon: Milk, color: 'text-blue-400', bg: 'bg-blue-50' };
  
  // Maintenance & Services
  if (serviceLower.includes('mechanic') || serviceLower.includes('auto') || serviceLower.includes('vehicle') || serviceLower.includes('repair')) return { Icon: Wrench, color: 'text-red-600', bg: 'bg-red-100' };
  if (serviceLower.includes('garden')) return { Icon: Leaf, color: 'text-green-700', bg: 'bg-green-100' };
  if (serviceLower.includes('laundry') || serviceLower.includes('wash') || serviceLower.includes('iron')) return { Icon: Shirt, color: 'text-indigo-600', bg: 'bg-indigo-100' };
  if (serviceLower.includes('well') || serviceLower.includes('dig')) return { Icon: Pickaxe, color: 'text-slate-700', bg: 'bg-slate-100' };
  if (serviceLower.includes('helper') || serviceLower.includes('labour')) return { Icon: Builder, color: 'text-orange-500', bg: 'bg-orange-100' };
  if (serviceLower.includes('tile')) return { Icon: Home, color: 'text-purple-500', bg: 'bg-purple-100' };
  if (serviceLower.includes('watchman') || serviceLower.includes('security')) return { Icon: Shield, color: 'text-slate-700', bg: 'bg-slate-100' };
  if (serviceLower.includes('housemaid') || serviceLower.includes('clean')) return { Icon: Home, color: 'text-pink-500', bg: 'bg-pink-100' };
  
  // Beauty & Personal Care
  if (serviceLower.includes('beautician') || serviceLower.includes('beauty') || serviceLower.includes('makeup')) return { Icon: Scissors, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100' };
  
  // Education
  if (serviceLower.includes('teacher') || serviceLower.includes('tutor') || serviceLower.includes('teach') || serviceLower.includes('class')) return { Icon: GraduationCap, color: 'text-blue-700', bg: 'bg-blue-100' };
  
  // Default
  return { Icon: Search, color: 'text-cyan-600', bg: 'bg-cyan-100' };
};

export function RequestCard({ request, onClick }: RequestCardProps) {
  const { Icon, color, bg } = getServiceIcon(request.service);
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all hover:border-cyan-400 hover:shadow-cyan-500/10 bg-white border-2 border-slate-200"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start gap-3">
          {/* Service Icon */}
          <div className={`size-12 rounded-xl ${bg} flex items-center justify-center shrink-0 shadow-sm`}>
            <Icon className={`size-6 ${color}`} />
          </div>
          
          {/* Title & User */}
          <div className="flex-1 min-w-0">
            <CardTitle className="line-clamp-1 text-slate-900 text-lg">{request.service}</CardTitle>
            <CardDescription className="text-slate-600">{request.userName}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="size-4 text-cyan-600" />
            <span className="text-sm">{request.village}</span>
          </div>
          <p className="line-clamp-2 text-sm text-slate-700">{request.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}