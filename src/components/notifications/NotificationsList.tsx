
import { Bell } from 'lucide-react';
import { Notification } from '@/types/notification';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface NotificationsListProps {
  notifications: Notification[];
}

const NotificationsList = ({ notifications }: NotificationsListProps) => {
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollArea className="h-[600px]">
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Bell className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">Aucune notification</h3>
          <p className="text-muted-foreground">
            Vous n'avez pas de notifications pour le moment
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-colors ${
                notification.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      {notification.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {formatDate(notification.createdAt)}
                    </CardDescription>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getNotificationColor(
                      notification.type
                    )}`}
                  >
                    {notification.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                {notification.link && (
                  <a
                    href={notification.link}
                    className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                  >
                    En savoir plus
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default NotificationsList;
