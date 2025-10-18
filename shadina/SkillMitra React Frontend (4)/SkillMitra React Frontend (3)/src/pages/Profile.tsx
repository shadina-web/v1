import { useState, useEffect } from 'react';
import { User } from '../lib/types';
import { api, SKILLS, VILLAGES } from '../lib/api';
import { userService } from '../services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Skeleton } from '../components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { X, Plus, User as UserIcon, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [servicesNeeded, setServicesNeeded] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      
      // Get user from localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        toast.error('Please login first');
        return;
      }
      
      const user = JSON.parse(userStr);
      
      // Fetch full profile from backend
      const data = await userService.getUserById(user.id);
      
      if (data) {
        setProfile(data);
        setName(data.name || '');
        setVillage(data.location || '');
        setPhone(data.phone || '');
        setEmail(data.email || '');
        setBio(data.bio || '');
        // Map backend skills to frontend format if needed
        setSkillsOffered(data.skills || []);
        setServicesNeeded(data.interests || []);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!village) {
      newErrors.village = 'Village is required';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (skillsOffered.length === 0 && servicesNeeded.length === 0) {
      newErrors.skills = 'Please add at least one skill offered or service needed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      setSaving(true);
      
      // Prepare update data for backend
      const updateData = {
        name,
        phone,
        location: village,
        bio: bio || undefined,
        skills: skillsOffered,
        interests: servicesNeeded,
        preferredLanguage: 'en' as const
      };

      // Call backend API to update profile
      const response = await userService.updateProfile(updateData);
      
      toast.success('Profile updated successfully!');
      
      // Reload profile to get fresh data from backend
      await loadProfile();
    } catch (err: any) {
      console.error('Error saving profile:', err);
      const errorMessage = err.response?.data?.message || 'Failed to save profile';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (selectedSkill && !skillsOffered.includes(selectedSkill)) {
      setSkillsOffered([...skillsOffered, selectedSkill]);
      setSelectedSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkillsOffered(skillsOffered.filter(s => s !== skill));
  };

  const addService = () => {
    if (selectedService && !servicesNeeded.includes(selectedService)) {
      setServicesNeeded([...servicesNeeded, selectedService]);
      setSelectedService('');
    }
  };

  const removeService = (service: string) => {
    setServicesNeeded(servicesNeeded.filter(s => s !== service));
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-12 w-64" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">{profile ? 'Edit Profile' : 'Create Profile'}</h1>
          <p className="text-muted-foreground mt-2">
            {profile ? 'Update your profile information' : 'Set up your profile to get started'}
          </p>
        </div>
        {profile && profile.rating && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/30">
            <Star className="size-5 fill-secondary text-secondary" />
            <span className="text-lg">{profile.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({profile.ratingCount} reviews)</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="size-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Basic details about yourself
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Village */}
            <div className="space-y-2">
              <Label htmlFor="village">
                Village <span className="text-destructive">*</span>
              </Label>
              <Select value={village} onValueChange={setVillage}>
                <SelectTrigger id="village">
                  <SelectValue placeholder="Select your village" />
                </SelectTrigger>
                <SelectContent>
                  {VILLAGES.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.village && (
                <p className="text-sm text-destructive">{errors.village}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself, your experience, etc."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Skills & Services</CardTitle>
            <CardDescription>
              What can you offer and what do you need?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Skills Offered */}
            <div className="space-y-3">
              <Label>Skills You Offer</Label>
              <div className="flex gap-2">
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILLS.filter(s => !skillsOffered.includes(s)).map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={addSkill}
                  disabled={!selectedSkill}
                  className="gap-2"
                >
                  <Plus className="size-4" />
                  Add
                </Button>
              </div>
              {skillsOffered.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skillsOffered.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Services Needed */}
            <div className="space-y-3">
              <Label>Services You Need</Label>
              <div className="flex gap-2">
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILLS.filter(s => !servicesNeeded.includes(s)).map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={addService}
                  disabled={!selectedService}
                  className="gap-2"
                >
                  <Plus className="size-4" />
                  Add
                </Button>
              </div>
              {servicesNeeded.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {servicesNeeded.map((service) => (
                    <Badge key={service} variant="outline" className="gap-1">
                      {service}
                      <button
                        type="button"
                        onClick={() => removeService(service)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {errors.skills && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{errors.skills}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="mt-6 flex gap-3">
          <Button
            type="submit"
            size="lg"
            disabled={saving}
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <CheckCircle className="size-4" />
            {saving ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
          </Button>
          {profile && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={loadProfile}
              className="border-2 border-primary/30 hover:bg-primary/10"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}