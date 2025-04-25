
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export type Payment = {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  date: string;
  description: string;
};
