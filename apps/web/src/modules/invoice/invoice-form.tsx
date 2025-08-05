'use client';

import { Button } from '@invoice/ui/button';
import { Input } from '@invoice/ui/input';
import { Label } from '@invoice/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@invoice/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@invoice/ui/select';
import { Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import type { InvoiceData, LineItem } from '@/interfaces/IInvoice';
import { useState } from 'react';
import { SidebarTrigger } from '@invoice/ui/sidebar';

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  updateProvider: (provider: Partial<InvoiceData['provider']>) => void;
  updateCustomer: (customer: Partial<InvoiceData['customer']>) => void;
  updateInvoice: (invoice: Partial<InvoiceData['invoice']>) => void;
  updateLineItem: (id: string, updates: Partial<LineItem>) => void;
  addLineItem: () => void;
  removeLineItem: (id: string) => void;
}

export function InvoiceForm({
  invoiceData,
  updateProvider,
  updateCustomer,
  updateInvoice,
  updateLineItem,
  addLineItem,
  removeLineItem,
}: InvoiceFormProps) {
  const [showProviderForm, setShowProviderForm] = useState(true);
  const [showCustomerForm, setShowCustomerForm] = useState(true);

  return (
    <div className="overflow-y-auto">
      <div className="flex items-center gap-2 mt-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">i</span>
            </div>
            <span className="text-sm text-blue-700">
              Note: Editing existing invoice
              $ca6e4586-7001-4f33-9bb0-7f81ef8f228d
            </span>
          </div>
        </div>

        {/* Provider Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">PROVIDER</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowProviderForm(!showProviderForm)}
              >
                {showProviderForm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {showProviderForm ? 'HIDE FORM' : 'SHOW FORM'}
              </Button>
            </div>
          </CardHeader>
          {showProviderForm && (
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Company details</Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label htmlFor="provider-company" className="text-xs">
                      Company name
                    </Label>
                    <Input
                      id="provider-company"
                      value={invoiceData.provider.companyName}
                      onChange={(e) =>
                        updateProvider({ companyName: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider-reg" className="text-xs">
                      Company reg. no.:
                    </Label>
                    <Input
                      id="provider-reg"
                      value={invoiceData.provider.companyRegNo}
                      onChange={(e) =>
                        updateProvider({ companyRegNo: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider-vat" className="text-xs">
                      VAT reg. no.:
                    </Label>
                    <Input
                      id="provider-vat"
                      value={invoiceData.provider.vatRegNo}
                      onChange={(e) =>
                        updateProvider({ vatRegNo: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">
                  Representative details
                </Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label htmlFor="provider-rep-name" className="text-xs">
                      Name
                    </Label>
                    <Input
                      id="provider-rep-name"
                      value={invoiceData.provider.representativeName}
                      onChange={(e) =>
                        updateProvider({ representativeName: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider-rep-role" className="text-xs">
                      Role
                    </Label>
                    <Input
                      id="provider-rep-role"
                      value={invoiceData.provider.representativeRole}
                      onChange={(e) =>
                        updateProvider({ representativeRole: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium">Company address</Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label htmlFor="provider-addr1" className="text-xs">
                      Address Line 1
                    </Label>
                    <Input
                      id="provider-addr1"
                      value={invoiceData.provider.addressLine1}
                      onChange={(e) =>
                        updateProvider({ addressLine1: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider-addr2" className="text-xs">
                      Address Line 2
                    </Label>
                    <Input
                      id="provider-addr2"
                      value={invoiceData.provider.addressLine2}
                      onChange={(e) =>
                        updateProvider({ addressLine2: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider-addr3" className="text-xs">
                      Address Line 3
                    </Label>
                    <Input
                      id="provider-addr3"
                      value={invoiceData.provider.addressLine3}
                      onChange={(e) =>
                        updateProvider({ addressLine3: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider-addr4" className="text-xs">
                      Address Line 4
                    </Label>
                    <Input
                      id="provider-addr4"
                      value={invoiceData.provider.addressLine4}
                      onChange={(e) =>
                        updateProvider({ addressLine4: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium">Billing info</Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label htmlFor="provider-bic" className="text-xs">
                      BIC:
                    </Label>
                    <Input
                      id="provider-bic"
                      value={invoiceData.provider.bic}
                      onChange={(e) => updateProvider({ bic: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider-iban" className="text-xs">
                      IBAN:
                    </Label>
                    <Input
                      id="provider-iban"
                      value={invoiceData.provider.iban}
                      onChange={(e) => updateProvider({ iban: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider-account" className="text-xs">
                      Account number:
                    </Label>
                    <Input
                      id="provider-account"
                      value={invoiceData.provider.accountNumber}
                      onChange={(e) =>
                        updateProvider({ accountNumber: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider-sort" className="text-xs">
                      Sort code:
                    </Label>
                    <Input
                      id="provider-sort"
                      value={invoiceData.provider.sortCode}
                      onChange={(e) =>
                        updateProvider({ sortCode: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Customer Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">CUSTOMER</CardTitle>
              <div className="flex items-center space-x-2">
                {/* <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700"
                >
                  PREFILL
                </Button> */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCustomerForm(!showCustomerForm)}
                >
                  {showCustomerForm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  {showCustomerForm ? 'HIDE FORM' : 'SHOW FORM'}
                </Button>
              </div>
            </div>
          </CardHeader>
          {showCustomerForm && (
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs font-medium">Company details</Label>
                <div className="space-y-3 mt-2">
                  <Input
                    placeholder="Company name"
                    value={invoiceData.customer.companyName}
                    onChange={(e) =>
                      updateCustomer({ companyName: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Company reg. no.:"
                    value={invoiceData.customer.companyRegNo}
                    onChange={(e) =>
                      updateCustomer({ companyRegNo: e.target.value })
                    }
                  />
                  <Input
                    placeholder="VAT reg. no.:"
                    value={invoiceData.customer.vatRegNo}
                    onChange={(e) =>
                      updateCustomer({ vatRegNo: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium">
                  Representative details
                </Label>
                <div className="space-y-3 mt-2">
                  <Input
                    placeholder="Name"
                    value={invoiceData.customer.representativeName}
                    onChange={(e) =>
                      updateCustomer({ representativeName: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Role"
                    value={invoiceData.customer.representativeRole}
                    onChange={(e) =>
                      updateCustomer({ representativeRole: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium">Company address</Label>
                <div className="space-y-3 mt-2">
                  <Input
                    placeholder="Address Line 1"
                    value={invoiceData.customer.addressLine1}
                    onChange={(e) =>
                      updateCustomer({ addressLine1: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Address Line 2"
                    value={invoiceData.customer.addressLine2}
                    onChange={(e) =>
                      updateCustomer({ addressLine2: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Address Line 3"
                    value={invoiceData.customer.addressLine3}
                    onChange={(e) =>
                      updateCustomer({ addressLine3: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Address Line 4"
                    value={invoiceData.customer.addressLine4}
                    onChange={(e) =>
                      updateCustomer({ addressLine4: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium">Billing info</Label>
                <div className="space-y-3 mt-2">
                  <Input
                    placeholder="BIC:"
                    value={invoiceData.customer.bic}
                    onChange={(e) => updateCustomer({ bic: e.target.value })}
                  />
                  <Input
                    placeholder="IBAN:"
                    value={invoiceData.customer.iban}
                    onChange={(e) => updateCustomer({ iban: e.target.value })}
                  />
                  <Input
                    placeholder="Account number:"
                    value={invoiceData.customer.accountNumber}
                    onChange={(e) =>
                      updateCustomer({ accountNumber: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Sort code:"
                    value={invoiceData.customer.sortCode}
                    onChange={(e) =>
                      updateCustomer({ sortCode: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Invoice Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              INVOICE DETAILS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoice-date" className="text-xs">
                  Date
                </Label>
                <Input
                  id="invoice-date"
                  type="date"
                  value={invoiceData.invoice.invoiceDate}
                  onChange={(e) =>
                    updateInvoice({ invoiceDate: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="invoice-number" className="text-xs">
                  Invoice Number
                </Label>
                <Input
                  id="invoice-number"
                  value={invoiceData.invoice.invoiceNumber}
                  onChange={(e) =>
                    updateInvoice({ invoiceNumber: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-xs font-medium">Line Items</Label>
                <Button onClick={addLineItem} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {invoiceData.invoice.lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 items-end"
                  >
                    <div className="col-span-2">
                      <Label className="text-xs">Date</Label>
                      <Input
                        type="date"
                        value={item.date}
                        onChange={(e) =>
                          updateLineItem(item.id, { date: e.target.value })
                        }
                        className="text-xs"
                      />
                    </div>
                    <div className="col-span-4">
                      <Label className="text-xs">Description</Label>
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) =>
                          updateLineItem(item.id, {
                            description: e.target.value,
                          })
                        }
                        className="text-xs"
                      />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-xs">Qty</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateLineItem(item.id, {
                            quantity: Number(e.target.value),
                          })
                        }
                        className="text-xs"
                      />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-xs">Unit</Label>
                      <Select
                        value={item.unit}
                        onValueChange={(value) =>
                          updateLineItem(item.id, { unit: value })
                        }
                      >
                        <SelectTrigger className="text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">days</SelectItem>
                          <SelectItem value="hours">hours</SelectItem>
                          <SelectItem value="items">items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs">Rate</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) =>
                          updateLineItem(item.id, {
                            rate: Number(e.target.value),
                          })
                        }
                        className="text-xs"
                      />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-xs">Total</Label>
                      <Input
                        value={item.total.toFixed(2)}
                        readOnly
                        className="text-xs bg-gray-50"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        onClick={() => removeLineItem(item.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
