import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { month: 'Jan', revenue: 120000 },
  { month: 'Feb', revenue: 145000 },
  { month: 'Mar', revenue: 168000 },
  { month: 'Avr', revenue: 178000 },
  { month: 'Mai', revenue: 198000 },
  { month: 'Jun', revenue: 210000 },
];

export const RevenueChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenus mensuels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'MAD',
                  }).format(value)
                }
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
