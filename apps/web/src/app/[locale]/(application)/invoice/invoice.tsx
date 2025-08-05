'use client';

import { useState } from 'react';
import { InvoiceForm } from '@/modules/invoice/invoice-form';
import { InvoicePreview } from '@/modules/invoice/invoice-preview';
import type { InvoiceData, LineItem } from '@/interfaces/IInvoice';

export default function InvoiceManagement() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    provider: {
      companyName: 'GoodCompany Ltd',
      companyRegNo: '098765432',
      vatRegNo: 'GB98765432',
      representativeName: 'Firstname Lastname',
      representativeRole: 'Director',
      addressLine1: '9000 Tall Building',
      addressLine2: '100 Wide Street',
      addressLine3: 'W1W London',
      addressLine4: 'United Kingdom',
      bic: 'ABCDGB21',
      iban: 'GB39 ABCD 0011 0011 0011 00',
      accountNumber: '01234567',
      sortCode: '01-00-01',
    },
    customer: {
      companyName: '',
      companyRegNo: '',
      vatRegNo: '',
      representativeName: '',
      representativeRole: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      addressLine4: '',
      bic: '',
      iban: '',
      accountNumber: '',
      sortCode: '',
    },
    invoice: {
      invoiceNumber: 'INV-0',
      invoiceDate: new Date().toISOString().split('T')[0],
      lineItems: [
        {
          id: '1',
          date: new Date().toISOString().split('T')[0],
          description: '',
          quantity: 1,
          unit: 'days',
          rate: 0,
          total: 0,
        },
      ],
      vatRate: 20,
      vatBasis: 0,
      vatAmount: 0,
      totalAmount: 0,
      totalPayable: 0,
    },
  });

  const updateInvoiceData = (updates: Partial<InvoiceData>) => {
    setInvoiceData((prev) => ({ ...prev, ...updates }));
  };

  const updateProvider = (provider: Partial<InvoiceData['provider']>) => {
    setInvoiceData((prev) => ({
      ...prev,
      provider: { ...prev.provider, ...provider },
    }));
  };

  const updateCustomer = (customer: Partial<InvoiceData['customer']>) => {
    setInvoiceData((prev) => ({
      ...prev,
      customer: { ...prev.customer, ...customer },
    }));
  };

  const updateInvoice = (invoice: Partial<InvoiceData['invoice']>) => {
    setInvoiceData((prev) => ({
      ...prev,
      invoice: { ...prev.invoice, ...invoice },
    }));
  };

  const updateLineItem = (id: string, updates: Partial<LineItem>) => {
    const updatedLineItems = invoiceData.invoice.lineItems.map((item) =>
      item.id === id
        ? {
            ...item,
            ...updates,
            total:
              (updates.quantity || item.quantity) * (updates.rate || item.rate),
          }
        : item
    );

    const vatBasis = updatedLineItems.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const vatAmount = vatBasis * (invoiceData.invoice.vatRate / 100);
    const totalPayable = vatBasis + vatAmount;

    updateInvoice({
      lineItems: updatedLineItems,
      vatBasis,
      vatAmount,
      totalAmount: vatBasis,
      totalPayable,
    });
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      description: '',
      quantity: 1,
      unit: 'days',
      rate: 0,
      total: 0,
    };
    updateInvoice({
      lineItems: [...invoiceData.invoice.lineItems, newItem],
    });
  };

  const removeLineItem = (id: string) => {
    const updatedLineItems = invoiceData.invoice.lineItems.filter(
      (item) => item.id !== id
    );
    const vatBasis = updatedLineItems.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const vatAmount = vatBasis * (invoiceData.invoice.vatRate / 100);
    const totalPayable = vatBasis + vatAmount;

    updateInvoice({
      lineItems: updatedLineItems,
      vatBasis,
      vatAmount,
      totalAmount: vatBasis,
      totalPayable,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <div className="print:hidden w-full lg:w-1/2 border-b lg:border-r">
          <InvoiceForm
            invoiceData={invoiceData}
            updateProvider={updateProvider}
            updateCustomer={updateCustomer}
            updateInvoice={updateInvoice}
            updateLineItem={updateLineItem}
            addLineItem={addLineItem}
            removeLineItem={removeLineItem}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <InvoicePreview invoiceData={invoiceData} />
        </div>
      </div>
    </div>
  );
}
