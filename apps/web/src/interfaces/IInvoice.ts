export interface LineItem {
  id: string;
  date: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  total: number;
}

export interface CompanyDetails {
  companyName: string;
  companyRegNo: string;
  vatRegNo: string;
  representativeName: string;
  representativeRole: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  bic: string;
  iban: string;
  accountNumber: string;
  sortCode: string;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  invoiceDate: string;
  lineItems: LineItem[];
  vatRate: number;
  vatBasis: number;
  vatAmount: number;
  totalAmount: number;
  totalPayable: number;
}

export interface InvoiceData {
  provider: CompanyDetails;
  customer: CompanyDetails;
  invoice: InvoiceDetails;
}
