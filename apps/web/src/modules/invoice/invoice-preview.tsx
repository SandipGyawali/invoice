import type { InvoiceData } from '@/interfaces/IInvoice';
import { Button } from '@invoice/ui/button';

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
}

export function InvoicePreview({ invoiceData }: InvoicePreviewProps) {
  return (
    <div className="overflow-y-auto">
      <div className="p-5 print:p-1 max-w-4xl mx-auto">
        <div className="print:hidden mt-2 flex w-full justify-end">
          <Button
            size="sm"
            onClick={() => {
              if (typeof window !== undefined) window.print();
            }}
          >
            Print
          </Button>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8 mt-3">
          <div className="w-full flex justify-between">
            <div className="">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-2">
                {invoiceData.provider.companyName || 'GOODCOMPANY'}
              </h1>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Company reg. no.: {invoiceData.provider.companyRegNo}</div>
                <div>VAT reg. no.: {invoiceData.provider.vatRegNo}</div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="mb-8 border p-2 px-3 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoice</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm">
                    <div className="font-medium">INV DATE</div>
                    <div>
                      {new Date(
                        invoiceData.invoice.invoiceDate
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm">
                    <div className="font-medium">INV NUMBER</div>
                    <div>{invoiceData.invoice.invoiceNumber}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Provider and Customer Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold mb-3">PROVIDER</h3>
            <div className="space-y-1 text-sm">
              <div className="font-medium">
                {invoiceData.provider.companyName}
              </div>
              <div>Company reg. no.: {invoiceData.provider.companyRegNo}</div>
              <div>VAT reg. no.: {invoiceData.provider.vatRegNo}</div>
              <div>
                {invoiceData.provider.representativeName} -{' '}
                {invoiceData.provider.representativeRole}
              </div>
              <div className="mt-2">
                <div>{invoiceData.provider.addressLine1}</div>
                <div>{invoiceData.provider.addressLine2}</div>
                <div>{invoiceData.provider.addressLine3}</div>
                <div>{invoiceData.provider.addressLine4}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">CUSTOMER</h3>
            <div className="space-y-1 text-sm">
              <div className="font-medium">
                {invoiceData.customer.companyName || 'Customer Name'}
              </div>
              {invoiceData.customer.companyRegNo && (
                <div>Company reg. no.: {invoiceData.customer.companyRegNo}</div>
              )}
              {invoiceData.customer.vatRegNo && (
                <div>VAT reg. no.: {invoiceData.customer.vatRegNo}</div>
              )}
              {invoiceData.customer.representativeName && (
                <div>
                  {invoiceData.customer.representativeName} -{' '}
                  {invoiceData.customer.representativeRole}
                </div>
              )}
              <div className="mt-2">
                <div>{invoiceData.customer.addressLine1}</div>
                <div>{invoiceData.customer.addressLine2}</div>
                <div>{invoiceData.customer.addressLine3}</div>
                <div>{invoiceData.customer.addressLine4}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-3">BILLING INFORMATION</h3>
          <div className="text-sm space-y-1">
            <div>BIC: {invoiceData.provider.bic}</div>
            <div>IBAN: {invoiceData.provider.iban}</div>
            <div className="mt-2">
              <div>Account number: {invoiceData.provider.accountNumber}</div>
              <div>Sort code: {invoiceData.provider.sortCode}</div>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-5">
          <h3 className="text-lg print:text-sm print:mb-2 font-semibold text-gray-900 mb-4">
            Product / Services provided
          </h3>
          <div className="border border-gray-200 dark:border-muted-foreground/40 print:border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-100 print:bg-red-500 dark:bg-muted print:border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-foreground uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-foreground uppercase">
                    Description
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-foreground uppercase">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-foreground uppercase">
                    Rate
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-foreground uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-muted-foreground/40">
                {invoiceData.invoice.lineItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.description || 'Service description'}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      £{item.rate.toFixed(2)}/{item.unit}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      £{item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="mt-3">
          <div className="flex flex-col items-end justify-end space-y-2 text-sm">
            <div className="flex gap-2">
              <div className="font-semibold">Total:</div>
              <div>£{invoiceData.invoice.totalAmount.toFixed(2)}</div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">VAT:</div>
              <div>£{invoiceData.invoice.vatAmount.toFixed(2)}</div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">VAT RATE: </div>
              <div>{invoiceData.invoice.vatRate}%</div>
            </div>
            <div className="flex gap-2">
              <div className="font-bold text-md">Total Payable:</div>
              <div className="font-bold text-md">
                £{invoiceData.invoice.totalPayable.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
