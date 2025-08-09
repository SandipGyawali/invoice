export interface IProductCategory {
  id: number;
  tenantId: string | null;
  catName: string | null;
  status: '0' | '1' | null;
  statusFTR: string | null;
}
