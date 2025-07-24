export interface ITax {
  id: number;
  tenantId: string | null;
  name: string;
  rate: string;
  type: 'inclusive' | 'exclusive' | null;
  applicableTo: string[];
  status: '0' | '1' | null;
  statusFTR: string | null;
}
