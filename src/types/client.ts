
export type TripType = 'Hajj' | 'Umrah' | 'Local';
export type PaymentStatus = 'paid' | 'pending' | 'partial' | 'refunded';
export type VisaStatus = 'approved' | 'pending' | 'rejected' | 'not_required';

export interface Client {
  id: string;
  name: string;
  passport: string;
  cin: string;
  phone: string;
  email: string;
  tripType: TripType;
  paymentStatus: PaymentStatus;
  visaStatus: VisaStatus;
}
