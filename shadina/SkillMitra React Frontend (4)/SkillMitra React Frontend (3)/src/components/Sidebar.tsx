import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  FileText, 
  User, 
  LayoutDashboard,
  MessageSquare,
  Calendar,
  CreditCard,
  Heart,
  Star,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Users,
  Clock,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { NotificationBell } from './NotificationBell';
import { isAuthenticated, logout } from '../utils/auth';

interface SidebarProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  path: string;
  icon: any;
  badge?: string;
  requiresAuth?: boolean;
  category?: string;
}

const navigationItems: NavItem[] = [
  // Main Navigation
  { name: 'Home', path: '/', icon: Home, category: 'Main' },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, requiresAuth: true, category: 'Main' },
  
  // Marketplace
  { name: 'Browse Offers', path: '/offers', icon: Briefcase, category: 'Marketplace' },
  { name: 'Browse Requests', path: '/requests', icon: FileText, category: 'Marketplace' },
  { name: 'Smart Matching', path: '/matching', icon: Heart, badge: 'AI', requiresAuth: true, category: 'Marketplace' },
  { name: 'Advanced Search', path: '/offers', icon: Search, category: 'Marketplace' },
  
  // Communication
  { name: 'Messages', path: '/messages', icon: MessageSquare, badge: '3', requiresAuth: true, category: 'Communication' },
  { name: 'Notifications', path: '/dashboard', icon: Bell, requiresAuth: true, category: 'Communication' },
  
  // Services
  { name: 'My Bookings', path: '/booking', icon: Calendar, requiresAuth: true, category: 'Services' },
  { name: 'Payments', path: '/payment', icon: CreditCard, requiresAuth: true, category: 'Services' },
  { name: 'Reviews & Ratings', path: '/profile', icon: Star, requiresAuth: true, category: 'Services' },
  
  // Account
  { name: 'My Profile', path: '/profile', icon: User, requiresAuth: true, category: 'Account' },
  { name: 'Settings', path: '/profile', icon: Settings, requiresAuth: true, category: 'Account' },
  { name: 'Help & Support', path: '/', icon: HelpCircle, category: 'Account' },
];

export default function Sidebar({ children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const filteredItems = navigationItems.filter(item => 
    !item.requiresAuth || authenticated
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  const categoryOrder = ['Main', 'Marketplace', 'Communication', 'Services', 'Account'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hover:bg-purple-100 dark:hover:bg-purple-900/20"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">SkillMitra</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {authenticated && <NotificationBell />}
            {!authenticated && (
              <Button size="sm" asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-72'}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between gap-2">
            <Link to="/" className={`flex items-center gap-3 transition-all flex-1 min-w-0 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform flex-shrink-0">
                <span className="text-white font-bold">SM</span>
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent truncate">SkillMitra</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Connect & Grow</p>
                </div>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 hover:bg-purple-100 dark:hover:bg-purple-900/20 flex-shrink-0"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        {/* User Profile Section */}
        {authenticated && (
          <div className={`p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/10 ${isCollapsed ? 'hidden' : ''}`}>
            <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 group shadow-sm hover:shadow-md">
              <Avatar className="h-12 w-12 border-2 border-purple-500 ring-2 ring-purple-200 dark:ring-purple-900">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate text-gray-900 dark:text-white">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">4.8</span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white">Pro</Badge>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        )}

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {categoryOrder.map(category => {
              const items = groupedItems[category];
              if (!items || items.length === 0) return null;

              return (
                <div key={category} className="mb-6">
                  {!isCollapsed && (
                    <h3 className="px-3 mb-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {category}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {items.map((item) => {
                      const isActive = location.pathname === item.path;
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={handleNavClick}
                          className={`
                            group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                            ${isActive 
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 scale-105' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10 hover:scale-102'
                            }
                            ${isCollapsed ? 'justify-center' : ''}
                          `}
                          title={isCollapsed ? item.name : undefined}
                        >
                          <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 truncate">{item.name}</span>
                              {item.badge && (
                                <Badge 
                                  variant={isActive ? "secondary" : "default"}
                                  className={`text-xs font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'}`}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          {!isCollapsed && authenticated && (
            <Button
              variant="outline"
              className="w-full justify-start gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
          {isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(false)}
              className="w-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {!isCollapsed && (
            <div className="text-center text-xs text-gray-500 pt-2">
              <p>© 2025 SkillMitra</p>
              <p>Version 2.0</p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 z-50 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile Sidebar Header with Close Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-gray-800 dark:to-gray-900">
          <Link to="/" className="flex items-center gap-3 flex-1 min-w-0" onClick={handleNavClick}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0 hover:scale-110 transition-transform">
              <span className="text-white font-bold">SM</span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent truncate">SkillMitra</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Connect & Grow</p>
            </div>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="flex-shrink-0 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg"
            title="Close sidebar"
          >
            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
          </Button>
        </div>

        {/* Mobile User Profile */}
        {authenticated && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10">
            <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-200 shadow-sm hover:shadow-md" onClick={handleNavClick}>
              <Avatar className="h-12 w-12 border-2 border-purple-500 ring-2 ring-purple-200 dark:ring-purple-900 flex-shrink-0">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">4.8</span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white">Pro</Badge>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Mobile Navigation */}
        <ScrollArea className="h-[calc(100vh-200px)] px-3 py-4">
          <nav className="space-y-1">
            {categoryOrder.map(category => {
              const items = groupedItems[category];
              if (!items || items.length === 0) return null;

              return (
                <div key={category} className="mb-6">
                  <h3 className="px-3 mb-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    {items.map((item) => {
                      const isActive = location.pathname === item.path;
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={handleNavClick}
                          className={`
                            group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                            ${isActive 
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10'
                            }
                          `}
                        >
                          <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
                          <span className="flex-1 truncate">{item.name}</span>
                          {item.badge && (
                            <Badge 
                              variant={isActive ? "secondary" : "default"}
                              className={`text-xs font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'}`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Mobile Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/10">
          {authenticated ? (
            <div className="space-y-2">
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 pb-2">
                <p className="font-medium">{filteredItems.length} menu items</p>
              </div>
              <Button
                variant="outline"
                className="w-full justify-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:hover:bg-red-900/20 border-2 font-semibold"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/login" onClick={handleNavClick}>
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/signup" onClick={handleNavClick}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        transition-all duration-300 ease-in-out
        lg:ml-72 ${isCollapsed ? 'lg:ml-20' : ''}
        pt-16 lg:pt-0 min-h-screen
        ${isOpen ? 'pointer-events-none lg:pointer-events-auto' : ''}
      `}>
        <div className={isOpen ? 'lg:filter-none' : ''}>
          {children}
        </div>
      </main>
    </div>
  );
}
