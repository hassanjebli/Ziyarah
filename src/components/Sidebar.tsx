import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, Users, Package, FileText, CreditCard, 
  Settings, LogOut, Bell, BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      roles: ['admin', 'staff', 'readonly'],
    },
    {
      name: 'Clients',
      href: '/clients',
      icon: Users,
      roles: ['admin', 'staff', 'readonly'],
    },
    {
      name: 'Packages',
      href: '/packages',
      icon: Package,
      roles: ['admin', 'staff', 'readonly'],
    },
    {
      name: 'Documents',
      href: '/documents',
      icon: FileText,
      roles: ['admin', 'staff', 'readonly'],
    },
    {
      name: 'Payments',
      href: '/payments',
      icon: CreditCard,
      roles: ['admin', 'staff', 'readonly'],
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: Bell,
      roles: ['admin', 'staff'],
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart,
      roles: ['admin', 'readonly'],
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      roles: ['admin'],
    },
  ];

  return (
    <aside
      className={cn(
        'bg-ptams-blue text-white h-screen flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className={cn('flex items-center', collapsed && 'justify-center w-full')}>
          {!collapsed && (
            <span className="text-lg font-bold whitespace-nowrap">PTAMS</span>
          )}
          {collapsed && <span className="font-bold">P</span>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-white/10"
        >
          {collapsed ? '→' : '←'}
        </Button>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            if (user && item.roles.includes(user.role)) {
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-2 py-2 rounded-md text-sm font-medium',
                    location.pathname === item.href
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:bg-white/10 hover:text-white',
                    collapsed && 'justify-center'
                  )}
                >
                  <item.icon className={cn('h-5 w-5', collapsed ? 'mx-auto' : 'mr-3')} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            }
            return null;
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className={cn('flex items-center', collapsed && 'justify-center')}>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-white/60">{user?.role}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-white hover:bg-white/10"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
