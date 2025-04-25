
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center max-w-md p-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-ptams-terracotta mb-4">Accès refusé</h1>
        <p className="text-lg mb-6">
          Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
          <Button asChild>
            <Link to="/dashboard">Retour au tableau de bord</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
