
import { Button } from '@/components/ui/button';
import NotificationsList from '@/components/notifications/NotificationsList';
import { Notification } from '@/types/notification';

// Mock notifications data
const notifications: Notification[] = [
  {
    id: '1',
    title: 'Nouveau document reçu',
    message: 'Le passeport de Ahmed Hassan a été téléchargé avec succès.',
    type: 'success',
    status: 'unread',
    createdAt: '2025-04-25T10:00:00Z',
    link: '/documents',
  },
  {
    id: '2',
    title: 'Paiement en attente',
    message: 'Le paiement de Sara Ahmed pour le package Umrah est en attente.',
    type: 'warning',
    status: 'unread',
    createdAt: '2025-04-24T15:30:00Z',
    link: '/payments',
  },
  {
    id: '3',
    title: 'Visa expirant bientôt',
    message: 'Le visa de Karim Benjelloun expire dans 30 jours.',
    type: 'error',
    status: 'read',
    createdAt: '2025-04-23T08:45:00Z',
  },
];

const NotificationsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Gérez vos notifications et alertes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Tout marquer comme lu</Button>
          <Button variant="outline">Effacer tout</Button>
        </div>
      </div>

      <NotificationsList notifications={notifications} />
    </div>
  );
};

export default NotificationsPage;
