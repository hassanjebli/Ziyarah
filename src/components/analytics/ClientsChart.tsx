import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { month: 'Jan', nouveaux: 15, retour: 8 },
  { month: 'Feb', nouveaux: 18, retour: 12 },
  { month: 'Mar', nouveaux: 25, retour: 15 },
  { month: 'Avr', nouveaux: 22, retour: 18 },
  { month: 'Mai', nouveaux: 28, retour: 22 },
  { month: 'Jun', nouveaux: 32, retour: 25 },
];

export const ClientsChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Acquisition des clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="nouveaux" name="Nouveaux clients" fill="#8B5CF6" />
              <Bar dataKey="retour" name="Clients fidèles" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
