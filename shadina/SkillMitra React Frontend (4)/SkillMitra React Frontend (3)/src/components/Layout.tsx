import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Home, Briefcase, FileText, User, LogOut, LogIn, LayoutDashboard, MessageSquare, Calendar, CreditCard, Bell, Star, Settings, HelpCircle, Sparkles, UserPlus } from 'lucide-react';
import { isAuthenticated, logout, getUserName } from '../utils/auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = isAuthenticated();
  const userName = getUserName();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const allNavItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard, protected: true },
    { path: '/offers', label: t('nav.offers'), icon: Briefcase },
    { path: '/requests', label: t('nav.requests'), icon: FileText },
    { path: '/matching', label: 'Matching', icon: Sparkles, protected: true },
    { path: '/messages', label: t('nav.messages'), icon: MessageSquare, protected: true },
    { path: '/booking', label: 'Bookings', icon: Calendar, protected: true },
    { path: '/payment', label: 'Payments', icon: CreditCard, protected: true },
    { path: '/profile', label: t('nav.profile'), icon: User, protected: true },
  ];

  const guestMenuItems = [
    { path: '/offers', label: 'Browse Offers', icon: Briefcase, protected: false },
    { path: '/requests', label: 'View Requests', icon: FileText, protected: false },
    { path: '/about', label: 'About Us', icon: HelpCircle, protected: false },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-pearl-white">
      <header className="border-b-2 border-ocean-light sticky top-0 z-50 shadow-ocean-medium bg-gradient-ocean backdrop-blur">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="size-10 rounded-full bg-gradient-aqua flex items-center justify-center shadow-ocean-glow group-hover:shadow-ocean-glow transition-all">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white drop-shadow-lg">SkillMitra</span>
            </Link>
            <div className="hidden xl:flex items-center gap-1 flex-1 justify-center">
              {(isAuth ? allNavItems : guestMenuItems).map((item) => {
                if (item.protected && !isAuth) return null;
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button variant="ghost" size="sm" className={`gap-2 transition-all whitespace-nowrap font-medium ${isActive ? 'bg-ocean-whisper text-ocean-deep hover:bg-ocean-whisper' : 'text-white hover:bg-white/10'}`}>
                      <Icon className={`h-4 w-4 ${isActive ? 'text-ocean-deep' : 'text-white'}`} />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              {isAuth ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 text-white hover:bg-white/10 border border-ocean-whisper rounded-full">
                      <div className="size-9 rounded-full bg-gradient-teal flex items-center justify-center text-white font-semibold text-sm shadow-ocean-soft">
                        {userName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="hidden sm:inline text-sm font-medium">{userName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-shell-cream border-ocean-light shadow-ocean-large rounded-xl">
                    <DropdownMenuLabel className="text-navy-deep">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-ocean-light" />
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="text-charcoal-dark"><User className="mr-2 h-4 w-4 text-ocean-deep" /><span>Profile</span></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/messages')} className="text-charcoal-dark"><Bell className="mr-2 h-4 w-4 text-aqua-vibrant" /><span>Notifications</span></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/messages')} className="text-charcoal-dark"><Star className="mr-2 h-4 w-4 text-coral-pink" /><span>Reviews</span></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="text-charcoal-dark"><Settings className="mr-2 h-4 w-4 text-teal-medium" /><span>Settings</span></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="text-charcoal-dark"><HelpCircle className="mr-2 h-4 w-4 text-lavender-soft" /><span>Help</span></DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-ocean-light" />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600"><LogOut className="mr-2 h-4 w-4" /><span>Logout</span></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login"><Button variant="outline" size="sm" className="gap-2 border-2 border-white bg-white/10 text-white hover:bg-white hover:text-ocean-deep font-medium shadow-ocean-soft rounded-full"><LogIn className="h-4 w-4" /><span className="text-sm">Sign In</span></Button></Link>
                  <Link to="/signup"><Button size="sm" className="bg-gradient-coral hover:bg-coral-pink text-white gap-2 shadow-ocean-medium font-medium text-sm px-6 rounded-full"><UserPlus className="h-4 w-4" /><span>Sign Up</span></Button></Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="xl:hidden border-t border-ocean-whisper py-2 px-4 overflow-x-auto bg-white/5">
          <div className="flex items-center gap-1">
            {(isAuth ? allNavItems : guestMenuItems).map((item) => {
              if (item.protected && !isAuth) return null;
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button variant="ghost" size="sm" className={`gap-2 whitespace-nowrap flex-shrink-0 font-medium ${isActive ? 'bg-ocean-whisper text-ocean-deep' : 'text-white hover:bg-white/10'}`}>
                    <Icon className={`h-4 w-4 ${isActive ? 'text-ocean-deep' : 'text-white'}`} />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gradient-ocean border-t-2 border-ocean-light py-12 shadow-ocean-large">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-6 w-6 text-turquoise-mist" />
                <h3 className="font-bold text-xl">SkillMitra</h3>
              </div>
              <p className="text-sm opacity-90">Connecting Local Skills, Building Communities</p>
              <p className="text-xs mt-2 opacity-75">Villages in Kerala</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-turquoise-mist">Quick Links</h4>
              <ul className="text-sm space-y-2">
                <li><Link to="/offers" className="hover:text-turquoise-mist transition opacity-90">Browse Offers</Link></li>
                <li><Link to="/requests" className="hover:text-turquoise-mist transition opacity-90">View Requests</Link></li>
                <li><Link to="/about" className="hover:text-turquoise-mist transition opacity-90">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-turquoise-mist">Language</h4>
              <p className="text-sm opacity-90">English • മലയാളം • हिन्दी</p>
              <div className="divider-ocean my-4"></div>
              <p className="text-xs opacity-75"> 2024 SkillMitra. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
