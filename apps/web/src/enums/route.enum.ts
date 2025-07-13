export interface ROUTES_INTERFACE {
  admin: string;
  tenants: {
    list: string;
    add: string;
    update: string;
  };
  addClient: string;
  clients: string;
  addProduct: string;
}

const ADMIN = '/admin'; // admin modules
const TENANTS = '/admin/tenants'; // tenants module

export const ROUTES: ROUTES_INTERFACE = {
  admin: ADMIN,
  tenants: {
    list: `${ADMIN}/tenants`,
    add: `${TENANTS}/new`,
    update: `${TENANTS}/update`,
  },
  addClient: '/clients/add',
  clients: '/clients',
  addProduct: '/products/add',
};
