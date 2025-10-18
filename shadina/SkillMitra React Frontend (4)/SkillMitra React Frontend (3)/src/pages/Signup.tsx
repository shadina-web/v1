import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { UserPlus, Mail, Lock, User, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { VILLAGES } from '../lib/api';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { authService } from '../services';

export function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    village: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.village) {
      newErrors.village = 'Please select your village';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Real API signup call to backend
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: 'WORKER', // Default role, can be changed later
        preferredLanguage: 'en' // Default to English, can be changed in profile
      });
      
      toast.success('Account created successfully! Please login.');
      navigate('/login');
    } catch (err: any) {
      console.error('Signup error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create account. Please try again.';
      toast.error(errorMessage);
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="size-16 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <UserPlus className="size-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t('auth.signup.title')}</CardTitle>
          <CardDescription>
            {t('auth.signup.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.submit && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">{t('common.name')} *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder={t('auth.signup.name_placeholder')}
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('common.email')} *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.signup.email_placeholder')}
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t('common.phone')} *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('auth.signup.phone_placeholder')}
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="village">{t('common.location')} *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground z-10" />
                <Select
                  value={formData.village}
                  onValueChange={(value: string) => updateField('village', value)}
                  disabled={loading}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select your village" />
                  </SelectTrigger>
                  <SelectContent>
                    {VILLAGES.map((village) => (
                      <SelectItem key={village} value={village}>
                        {village}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.village && <p className="text-sm text-destructive">{errors.village}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('common.password')} *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.signup.password_placeholder')}
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('common.password')} *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-accent to-secondary"
              disabled={loading}
            >
              {loading ? t('common.loading') : t('auth.signup.signup_button')}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {t('auth.signup.have_account')}{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                {t('auth.signup.login_link')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
