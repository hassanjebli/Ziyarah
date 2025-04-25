
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Package } from 'lucide-react';
import { RevenueChart } from '@/components/analytics/RevenueChart';
import { BookingsChart } from '@/components/analytics/BookingsChart';
import { ClientsChart } from '@/components/analytics/ClientsChart';

const AnalyticsPage = () => {
  // Mock stats data
  const stats = {
    revenue: {
      value: '1,245,500 MAD',
      change: '+12.5%',
      increasing: true
    },
    clients: {
      value: '156',
      change: '+8.2%',
      increasing: true
    },
    bookings: {
      value: '89',
      change: '-2.4%',
      increasing: false
    },
    satisfaction: {
      value: '94.8%',
      change: '+1.2%',
      increasing: true
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytiques</h2>
        <p className="text-muted-foreground">
          Visualisez les performances et tendances de votre entreprise
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
            {stats.revenue.increasing ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.revenue.value}</div>
            <p className="text-xs text-muted-foreground">
              {stats.revenue.change} depuis le mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clients.value}</div>
            <p className="text-xs text-muted-foreground">
              {stats.clients.change} depuis le mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bookings.value}</div>
            <p className="text-xs text-muted-foreground">
              {stats.bookings.change} depuis le mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            {stats.satisfaction.increasing ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.satisfaction.value}</div>
            <p className="text-xs text-muted-foreground">
              {stats.satisfaction.change} depuis le mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <RevenueChart />
        <BookingsChart />
        <ClientsChart />
      </div>
    </div>
  );
};

export default AnalyticsPage;
