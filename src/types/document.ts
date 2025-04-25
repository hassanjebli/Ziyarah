
export type DocumentType = 'passport' | 'visa' | 'contract' | 'other';

export type Document = {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  uploadedAt: string;
  clientId?: string;
  url: string;
};
