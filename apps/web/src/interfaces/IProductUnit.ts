export interface IProductUnit {
  id: number;
  tenantId: string | null;
  name: string;
  namePlural: string | null;
  status: '0' | '1' | null;
  statusFTR: string | null;
}
