import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { authService } from '../services';

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Real API login call to backend
      const response = await authService.login({ email, password });
      
      // Backend returns { token: "jwt-token-string" }
      // Store auth token
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userEmail', email);
      
      toast.success('Login successful! Welcome back!');
      navigate('/profile');
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Invalid email or password. Please try again.';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="size-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <LogIn className="size-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t('auth.login.title')}</CardTitle>
          <CardDescription>
            {t('auth.login.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t('common.email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.login.email_placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('common.password')}</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  {t('auth.login.forgot_password')}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.login.password_placeholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-accent"
              disabled={loading}
            >
              {loading ? t('common.loading') : t('auth.login.signin_button')}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {t('auth.login.no_account')}{' '}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                {t('auth.login.signup_link')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
