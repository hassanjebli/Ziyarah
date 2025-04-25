import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="px-6 py-4 border-b bg-card">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Bienvenue, {user?.name}</h1>
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
