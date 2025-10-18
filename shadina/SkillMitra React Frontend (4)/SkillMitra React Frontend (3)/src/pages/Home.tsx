import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Briefcase, FileText, Users, Star, ArrowRight, MessageSquare, Calendar, CreditCard, LayoutDashboard, Shield, TrendingUp, Sparkles, CheckCircle, Target, Award, Zap, Search, BadgeCheck, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-16 pb-12 pt-6 px-4">
      {/* Hero Section - Ocean Mermaid Theme */}
      <div className="text-center space-y-6 py-20 rounded-3xl shadow-ocean-large border-2 border-ocean-light bg-gradient-magical relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-aqua-vibrant/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-br from-turquoise-bright/20 to-transparent rounded-full blur-3xl"></div>
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-ocean border-2 border-turquoise-mist shadow-ocean-glow hover:shadow-ocean-large transition-all hover:scale-105 relative z-10">
          <Users className="size-5 text-white" />
          <span className="text-sm font-semibold text-white">🇮🇳 {t('hero.badge')}</span>
        </div>
        
        {/* Hero Title */}
        <div className="relative z-10 py-12">
          <h1 className="font-black px-4 text-center leading-none text-white" style={{ 
            fontFamily: "'Poppins', 'Montserrat', 'Inter', sans-serif", 
            fontSize: 'clamp(6rem, 15vw, 24rem)',
            letterSpacing: '-0.05em',
            textShadow: '0 10px 40px rgba(0, 51, 102, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
            filter: 'drop-shadow(0 0 50px rgba(0, 64, 128, 0.7)) drop-shadow(0 0 80px rgba(0, 115, 230, 0.5))',
            fontWeight: '900'
          }}>
            {t('app_name')}
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30" style={{
            background: 'radial-gradient(circle, rgba(0,51,102,0.5) 0%, rgba(0,115,230,0.3) 50%, transparent 70%)',
            zIndex: -1
          }}></div>
        </div>
        
        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base md:text-lg text-charcoal-dark leading-relaxed px-4 relative z-10 font-medium text-center">
          {t('hero.subtitle')} <span className="text-ocean-deep font-bold bg-turquoise-mist px-3 py-1 rounded-lg border-2 border-ocean-light">{t('hero.skilled_services')}</span>.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative z-10">
          <Link to="/map">
            <Button size="lg" className="btn-ocean-primary shadow-ocean-glow hover:shadow-ocean-large transition-all font-bold text-base px-10 py-7 rounded-2xl hover:scale-105">
              <MapPin className="size-5 mr-2" />
              {t('hero.cta_find_workers')}
            </Button>
          </Link>
          <Link to="/offers">
            <Button size="lg" variant="outline" className="gap-2 bg-white text-ocean-deep border-2 border-ocean-bright hover:bg-ocean-whisper shadow-ocean-soft hover:shadow-ocean-medium transition-all font-bold text-base px-10 py-7 rounded-2xl hover:scale-105">
              {t('hero.cta_browse')}
              <ArrowRight className="size-5" />
            </Button>
          </Link>
        </div>

        {/* Join Workers Text */}
        <div className="flex justify-center items-center gap-3 pt-8 relative z-10">
          <p className="text-lg text-navy-deep font-semibold">
            {t('hero.join_text')} <span className="text-ocean-deep font-bold text-2xl">5,000+</span> {t('hero.skilled_workers')}
          </p>
        </div>
      </div>

      {/* Features Section with Enhanced Cards */}
      <div className="space-y-8 container mx-auto">
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-4">
            <div className="size-20 rounded-3xl bg-gradient-teal flex items-center justify-center shadow-ocean-glow animate-pulse">
              <Zap className="size-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-deep">
            {t('features.why_choose')}
          </h2>
          <p className="text-charcoal-dark text-lg font-semibold">{t('features.tagline')} ✨</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="card-ocean hover:shadow-ocean-glow hover:-translate-y-1">
            <CardHeader>
              <div className="size-14 rounded-xl bg-gradient-ocean flex items-center justify-center mb-3 shadow-ocean-medium relative">
                <Briefcase className="size-7 text-white" />
                <div className="absolute -top-1 -right-1 size-5 rounded-full bg-seagreen-vibrant flex items-center justify-center">
                  <CheckCircle className="size-3 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl text-navy-deep font-bold">{t('features.offer_skills.title')}</CardTitle>
              <CardDescription className="text-sm text-charcoal-medium">
                {t('features.offer_skills.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/offers">
                <Button className="btn-ocean-primary w-full">
                  {t('features.offer_skills.button')}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-ocean hover:shadow-ocean-glow hover:-translate-y-1">
            <CardHeader>
              <div className="size-14 rounded-xl bg-gradient-aqua flex items-center justify-center mb-3 shadow-ocean-medium relative">
                <FileText className="size-7 text-white" />
                <div className="absolute -top-1 -right-1 size-5 rounded-full bg-ocean-bright flex items-center justify-center">
                  <Search className="size-3 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl text-navy-deep font-bold">{t('features.find_services.title')}</CardTitle>
              <CardDescription className="text-sm text-charcoal-medium">
                {t('features.find_services.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/requests">
                <Button className="btn-ocean-secondary w-full">
                  {t('features.find_services.button')}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-ocean hover:shadow-ocean-glow hover:-translate-y-1">
            <CardHeader>
              <div className="size-14 rounded-xl bg-gradient-teal flex items-center justify-center mb-3 shadow-ocean-medium relative">
                <Star className="size-7 text-white fill-white" />
                <div className="absolute -top-1 -right-1 size-5 rounded-full bg-coral-pink flex items-center justify-center">
                  <Award className="size-3 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl text-navy-deep font-bold">{t('features.build_reputation.title')}</CardTitle>
              <CardDescription className="text-sm text-charcoal-medium">
                {t('features.build_reputation.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/profile">
                <Button className="gap-2 bg-gradient-teal text-white hover:opacity-90 transition-all font-medium text-sm w-full rounded-xl shadow-ocean-soft">
                  {t('features.build_reputation.button')}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section - Ocean Mermaid Theme with Icons */}
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10 bg-gradient-to-br from-pearl-white via-mist-blue to-shell-cream rounded-3xl border-2 border-ocean-light shadow-ocean-large">
          <div className="text-center space-y-3 p-4 group hover:scale-110 transition-transform">
            <div className="flex justify-center mb-2">
              <div className="size-16 rounded-2xl bg-gradient-ocean flex items-center justify-center shadow-ocean-medium group-hover:shadow-ocean-glow">
                <Users className="size-8 text-white" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-black text-navy-deep">5,000+</div>
            <div className="text-xs font-bold text-ocean-deep uppercase tracking-wide">{t('stats.active_workers')}</div>
          </div>
          <div className="text-center space-y-3 p-4 group hover:scale-110 transition-transform">
            <div className="flex justify-center mb-2">
              <div className="size-16 rounded-2xl bg-gradient-aqua flex items-center justify-center shadow-ocean-medium group-hover:shadow-ocean-glow">
                <Briefcase className="size-8 text-white" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-black text-navy-deep">12,000+</div>
            <div className="text-xs font-bold text-aqua-vibrant uppercase tracking-wide">{t('stats.services_listed')}</div>
          </div>
          <div className="text-center space-y-3 p-4 group hover:scale-110 transition-transform">
            <div className="flex justify-center mb-2">
              <div className="size-16 rounded-2xl bg-gradient-teal flex items-center justify-center shadow-ocean-medium group-hover:shadow-ocean-glow">
                <CheckCircle className="size-8 text-white" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-black text-navy-deep">8,500+</div>
            <div className="text-xs font-bold text-teal-deep uppercase tracking-wide">{t('stats.projects_completed')}</div>
          </div>
          <div className="text-center space-y-3 p-4 group hover:scale-110 transition-transform">
            <div className="flex justify-center mb-2">
              <div className="size-16 rounded-2xl bg-gradient-coral flex items-center justify-center shadow-ocean-medium group-hover:shadow-ocean-glow">
                <Star className="size-8 text-white fill-white" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-black text-navy-deep">4.8★</div>
            <div className="text-xs font-bold text-coral-pink uppercase tracking-wide">{t('stats.average_rating')}</div>
          </div>
        </div>
      </div>

      {/* Powerful Features Section */}
      <div className="space-y-8 container mx-auto">
        <div className="text-center space-y-4 rounded-3xl py-12 px-6 border-4 border-turquoise-mist shadow-ocean-large bg-gradient-ocean relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMjBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTIwIDBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          <div className="flex justify-center mb-3 relative z-10">
            <div className="size-20 rounded-2xl bg-white/30 backdrop-blur-lg flex items-center justify-center shadow-ocean-large border-2 border-white/50">
              <Target className="size-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white relative z-10 drop-shadow-lg">
            {t('platform.title')}
          </h2>
          <p className="text-white text-xl font-bold relative z-10 drop-shadow">{t('platform.subtitle')} 🚀</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-ocean group hover:shadow-ocean-glow hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ocean-whisper/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="size-12 rounded-xl bg-gradient-ocean flex items-center justify-center mb-4 shadow-ocean-medium group-hover:shadow-ocean-glow group-hover:scale-110 transition-all">
                <LayoutDashboard className="size-6 text-white" />
              </div>
              <CardTitle className="text-lg text-navy-deep">{t('platform.dashboard.title')}</CardTitle>
              <CardDescription className="text-charcoal-medium">
                {t('platform.dashboard.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2 text-ocean-deep hover:bg-ocean-whisper group/btn">
                  {t('platform.dashboard.button')}
                  <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-ocean group hover:shadow-ocean-glow hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-turquoise-mist/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="size-12 rounded-xl bg-gradient-aqua flex items-center justify-center mb-4 shadow-ocean-medium group-hover:shadow-ocean-glow group-hover:scale-110 transition-all">
                <MessageSquare className="size-6 text-white" />
              </div>
              <CardTitle className="text-lg text-navy-deep">{t('platform.messaging.title')}</CardTitle>
              <CardDescription className="text-charcoal-medium">
                {t('platform.messaging.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/messages">
                <Button variant="ghost" size="sm" className="gap-2 text-turquoise-calm hover:bg-turquoise-mist group/btn">
                  {t('platform.messaging.button')}
                  <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-ocean group hover:shadow-ocean-glow hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-pastel/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="size-12 rounded-xl bg-gradient-teal flex items-center justify-center mb-4 shadow-ocean-medium group-hover:shadow-ocean-glow group-hover:scale-110 transition-all">
                <Calendar className="size-6 text-white" />
              </div>
              <CardTitle className="text-lg text-navy-deep">{t('platform.booking.title')}</CardTitle>
              <CardDescription className="text-charcoal-medium">
                {t('platform.booking.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/booking">
                <Button variant="ghost" size="sm" className="gap-2 text-teal-deep hover:bg-teal-pastel group/btn">
                  {t('platform.booking.button')}
                  <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-ocean group hover:shadow-ocean-glow hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ocean-whisper/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="size-12 rounded-xl bg-gradient-to-br from-ocean-deep to-ocean-medium flex items-center justify-center mb-4 shadow-ocean-medium group-hover:shadow-ocean-glow group-hover:scale-110 transition-all">
                <CreditCard className="size-6 text-white" />
              </div>
              <CardTitle className="text-lg text-navy-deep">{t('platform.payments.title')}</CardTitle>
              <CardDescription className="text-charcoal-medium">
                {t('platform.payments.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/payment">
                <Button variant="ghost" size="sm" className="gap-2 text-ocean-deep hover:bg-ocean-whisper group/btn">
                  {t('platform.payments.button')}
                  <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-ocean group hover:shadow-ocean-glow hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-coral-blush/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="size-12 rounded-xl bg-gradient-coral flex items-center justify-center mb-4 shadow-ocean-medium group-hover:shadow-ocean-glow group-hover:scale-110 transition-all">
                <Star className="size-6 text-white" />
              </div>
              <CardTitle className="text-lg text-navy-deep">{t('platform.reviews.title')}</CardTitle>
              <CardDescription className="text-charcoal-medium">
                {t('platform.reviews.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/reviews">
                <Button variant="ghost" size="sm" className="gap-2 text-coral-pink hover:bg-coral-blush group/btn">
                  {t('platform.reviews.button')}
                  <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-ocean group hover:shadow-ocean-glow hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-seagreen-pastel/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="size-12 rounded-xl bg-gradient-to-br from-seagreen-vibrant to-seagreen-soft flex items-center justify-center mb-4 shadow-ocean-medium group-hover:shadow-ocean-glow group-hover:scale-110 transition-all">
                <Search className="size-6 text-white" />
              </div>
              <CardTitle className="text-lg text-navy-deep">{t('platform.search.title')}</CardTitle>
              <CardDescription className="text-charcoal-medium">
                {t('platform.search.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/offers">
                <Button variant="ghost" size="sm" className="gap-2 text-seagreen-vibrant hover:bg-seagreen-pastel group/btn">
                  {t('platform.search.button')}
                  <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="card-ocean-gradient shadow-ocean-large">
        <CardContent className="p-12 text-center space-y-4">
          <div className="flex justify-center">
            <div className="size-20 rounded-2xl bg-gradient-ocean flex items-center justify-center shadow-ocean-glow">
              <BadgeCheck className="size-11 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-navy-deep">{t('cta.title')}</h2>
          <p className="text-charcoal-medium max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex gap-3 justify-center pt-4">
            <Link to="/signup">
              <Button size="lg" className="btn-ocean-primary shadow-ocean-medium hover:shadow-ocean-glow">
                {t('cta.get_started')}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link to="/offers">
              <Button size="lg" variant="outline" className="btn-ocean-outline">
                {t('cta.explore_services')}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}