
export type Package = {
  id: string;
  name: string;
  type: 'Hajj' | 'Umrah' | 'Local';
  duration: number;
  startDate: string;
  endDate: string;
  price: number;
  capacity: number;
  description: string;
  status: 'Available' | 'Full' | 'Completed';
};
