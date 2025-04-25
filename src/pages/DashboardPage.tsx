
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, Package, CreditCard, FileText,
  TrendingUp, TrendingDown, AlertTriangle
} from 'lucide-react';

const DashboardPage = () => {
  // Mock data - in a real app this would come from an API
  const stats = {
    clients: {
      total: 124,
      trend: '+12% depuis le mois dernier',
      increasing: true,
    },
    bookings: {
      hajj: 42,
      umrah: 86,
      local: 32,
    },
    revenue: {
      mad: '1,245,500',
      sar: '456,200',
      trend: '+8% depuis le mois dernier',
      increasing: true,
    },
    pendingActions: {
      unpaidClients: 12,
      incompleteDocuments: 8,
      expiringVisas: 5,
      expiringPassports: 3,
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <p className="text-muted-foreground">
          Aperçu de l'activité et des indicateurs clés de votre agence
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Clients Stats Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clients.total}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats.clients.increasing ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-destructive" />
              )}
              {stats.clients.trend}
            </p>
          </CardContent>
        </Card>

        {/* Bookings Stats Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div>
                <p className="text-xs text-muted-foreground">Hajj</p>
                <span className="text-2xl font-bold">{stats.bookings.hajj}</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Umrah</p>
                <span className="text-2xl font-bold">{stats.bookings.umrah}</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Local</p>
                <span className="text-2xl font-bold">{stats.bookings.local}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Stats Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-xs text-muted-foreground">MAD</p>
                <span className="text-sm font-semibold">{stats.revenue.mad} dh</span>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-muted-foreground">SAR</p>
                <span className="text-sm font-semibold">{stats.revenue.sar} ﷼</span>
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stats.revenue.increasing ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-destructive" />
                )}
                {stats.revenue.trend}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions en attente</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-xs">Clients impayés</p>
                <span className="text-xs font-bold text-amber-500">
                  {stats.pendingActions.unpaidClients}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-xs">Documents incomplets</p>
                <span className="text-xs font-bold text-amber-500">
                  {stats.pendingActions.incompleteDocuments}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-xs">Visas expirant bientôt</p>
                <span className="text-xs font-bold text-amber-500">
                  {stats.pendingActions.expiringVisas}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-xs">Passeports expirant bientôt</p>
                <span className="text-xs font-bold text-amber-500">
                  {stats.pendingActions.expiringPassports}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Clients Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Clients récents</CardTitle>
            <CardDescription>Les 5 derniers clients ajoutés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Mohammed Alaoui', type: 'Hajj', date: '15/04/2025' },
                { name: 'Fatima Benani', type: 'Umrah', date: '12/04/2025' },
                { name: 'Ahmed Lahbabi', type: 'Umrah', date: '10/04/2025' },
                { name: 'Khadija Moussaoui', type: 'Local', date: '08/04/2025' },
                { name: 'Youssef Kadiri', type: 'Hajj', date: '05/04/2025' },
              ].map((client, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.type}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{client.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Paiements récents</CardTitle>
            <CardDescription>Les 5 derniers paiements reçus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Mohammed Alaoui', amount: '15,000 MAD', date: '15/04/2025' },
                { name: 'Fatima Benani', amount: '8,500 MAD', date: '12/04/2025' },
                { name: 'Ahmed Lahbabi', amount: '6,200 MAD', date: '10/04/2025' },
                { name: 'Khadija Moussaoui', amount: '3,500 MAD', date: '08/04/2025' },
                { name: 'Youssef Kadiri', amount: '12,000 MAD', date: '05/04/2025' },
              ].map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <p className="font-medium">{payment.name}</p>
                    <p className="text-sm text-green-600 font-medium">{payment.amount}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{payment.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
