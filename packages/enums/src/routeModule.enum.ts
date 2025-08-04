export const ApplicationModules = {
  user: 'user',
  role: 'role',
  settings: 'settings',
  report: 'report',
  tax: 'tax',
  product: 'product',
  productCategory: 'product-category',
  project: 'project',
  unit: 'unit',
  client: 'client',
  invoice: 'invoice',
  quotation: 'quotation',
  dashboard: 'dashboard',
} as const;

export const ModuleOperations = {
  create: 'create',
  update: 'update',
  delete: 'delete',
  view: 'view',
  list: 'list',
} as const;

export type ApplicationModule = keyof typeof ApplicationModules;
export type ModuleOperation = keyof typeof ModuleOperations;
