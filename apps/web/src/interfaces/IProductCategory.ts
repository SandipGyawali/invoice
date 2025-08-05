export interface IProductCategory {
  id: number;
  tenantId: string | null | undefined;
  catName: string | null | undefined;
  status: '0' | '1' | null | undefined;
  statusFTR: string | null | undefined;
}
