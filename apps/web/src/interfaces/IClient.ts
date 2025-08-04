export interface IClient {
  id: number;
  tenantId: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string;
  gender: string | null;
  dob: string | null;
  address: string | null;
  updatedAt: Date | null;
}
