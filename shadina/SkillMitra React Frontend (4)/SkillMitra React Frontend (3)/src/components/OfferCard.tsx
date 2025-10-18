import { Offer } from '../lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Star, Wrench, Scissors, Zap, Paintbrush, Hammer, Camera, Code, Music, Car, Truck, Home, GraduationCap, Stethoscope, Calculator, Briefcase, ChefHat, Scissors as Barber, Leaf, Baby, Dog, UtensilsCrossed, User, Droplet, Fish, Shirt, TreePine, Wheat, Milk, Pickaxe, Hammer as Builder, Wind, Eye, Shield } from 'lucide-react';

interface OfferCardProps {
  offer: Offer;
  onClick: () => void;
}

// Function to get icon based on skill name - Village/Rural focused
const getSkillIcon = (skill: string) => {
  const skillLower = skill.toLowerCase();
  
  // Traditional Village Services
  if (skillLower.includes('plumb')) return { Icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-100' };
  if (skillLower.includes('tailor') || skillLower.includes('stitch') || skillLower.includes('sew')) return { Icon: Scissors, color: 'text-pink-600', bg: 'bg-pink-100' };
  if (skillLower.includes('carpenter') || skillLower.includes('wood')) return { Icon: Hammer, color: 'text-amber-700', bg: 'bg-amber-100' };
  if (skillLower.includes('electric')) return { Icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100' };
  if (skillLower.includes('mason') || skillLower.includes('construction')) return { Icon: Home, color: 'text-slate-600', bg: 'bg-slate-100' };
  if (skillLower.includes('barber') || skillLower.includes('hair')) return { Icon: Barber, color: 'text-cyan-600', bg: 'bg-cyan-100' };
  if (skillLower.includes('cook')) return { Icon: ChefHat, color: 'text-orange-700', bg: 'bg-orange-100' };
  if (skillLower.includes('driver')) return { Icon: Car, color: 'text-blue-700', bg: 'bg-blue-100' };
  if (skillLower.includes('paint')) return { Icon: Paintbrush, color: 'text-purple-600', bg: 'bg-purple-100' };
  
  // Agricultural & Rural Work
  if (skillLower.includes('farmer') || skillLower.includes('farm') || skillLower.includes('agriculture')) return { Icon: Wheat, color: 'text-green-700', bg: 'bg-green-100' };
  if (skillLower.includes('coconut') || skillLower.includes('climb')) return { Icon: TreePine, color: 'text-green-600', bg: 'bg-green-100' };
  
  // Artisan & Craft
  if (skillLower.includes('pot') || skillLower.includes('clay') || skillLower.includes('potter')) return { Icon: Droplet, color: 'text-amber-600', bg: 'bg-amber-100' };
  if (skillLower.includes('welder') || skillLower.includes('weld')) return { Icon: Wind, color: 'text-orange-600', bg: 'bg-orange-100' };
  
  // Food & Supply
  if (skillLower.includes('fish')) return { Icon: Fish, color: 'text-cyan-700', bg: 'bg-cyan-100' };
  if (skillLower.includes('milk') || skillLower.includes('dairy')) return { Icon: Milk, color: 'text-blue-400', bg: 'bg-blue-50' };
  
  // Maintenance & Services
  if (skillLower.includes('mechanic') || skillLower.includes('auto') || skillLower.includes('vehicle')) return { Icon: Wrench, color: 'text-red-600', bg: 'bg-red-100' };
  if (skillLower.includes('garden')) return { Icon: Leaf, color: 'text-green-700', bg: 'bg-green-100' };
  if (skillLower.includes('laundry') || skillLower.includes('wash') || skillLower.includes('iron')) return { Icon: Shirt, color: 'text-indigo-600', bg: 'bg-indigo-100' };
  if (skillLower.includes('well') || skillLower.includes('dig')) return { Icon: Pickaxe, color: 'text-slate-700', bg: 'bg-slate-100' };
  if (skillLower.includes('helper') || skillLower.includes('labour')) return { Icon: Builder, color: 'text-orange-500', bg: 'bg-orange-100' };
  if (skillLower.includes('tile')) return { Icon: Home, color: 'text-purple-500', bg: 'bg-purple-100' };
  if (skillLower.includes('watchman') || skillLower.includes('security')) return { Icon: Shield, color: 'text-slate-700', bg: 'bg-slate-100' };
  if (skillLower.includes('housemaid') || skillLower.includes('clean')) return { Icon: Home, color: 'text-pink-500', bg: 'bg-pink-100' };
  
  // Beauty & Personal Care
  if (skillLower.includes('beautician') || skillLower.includes('beauty') || skillLower.includes('makeup')) return { Icon: Scissors, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100' };
  
  // Education
  if (skillLower.includes('teacher') || skillLower.includes('tutor') || skillLower.includes('teach')) return { Icon: GraduationCap, color: 'text-blue-700', bg: 'bg-blue-100' };
  
  // Default
  return { Icon: User, color: 'text-teal-600', bg: 'bg-teal-100' };
};

export function OfferCard({ offer, onClick }: OfferCardProps) {
  const { Icon, color, bg } = getSkillIcon(offer.skill);
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all hover:border-teal-400 hover:shadow-teal-500/10 bg-white border-2 border-slate-200"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            {/* Skill Icon */}
            <div className={`size-12 rounded-xl ${bg} flex items-center justify-center shrink-0 shadow-sm`}>
              <Icon className={`size-6 ${color}`} />
            </div>
            
            {/* Title & User */}
            <div className="flex-1 min-w-0">
              <CardTitle className="line-clamp-1 text-slate-900 text-lg">{offer.skill}</CardTitle>
              <CardDescription className="mt-1 text-slate-600">{offer.userName}</CardDescription>
            </div>
          </div>
          
          {/* Rating Badge */}
          {offer.rating && (
            <Badge variant="secondary" className="gap-1 shrink-0 bg-amber-100 text-amber-700 border-amber-300">
              <Star className="size-3 fill-amber-500 text-amber-500" />
              {offer.rating.toFixed(1)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="size-4 text-teal-600" />
            <span className="text-sm">{offer.village}</span>
          </div>
          <p className="line-clamp-2 text-sm text-slate-700">{offer.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}