export interface IProject {
  id: number;
  tenantId: string | null;
  name: string;
  clientId: number | null;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  pStatus: 'in_progress' | 'completed' | 'not_started' | null;
  status: '0' | '1' | null;
  statusFTR: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
