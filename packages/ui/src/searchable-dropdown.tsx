'use client';

import { useId, useState } from 'react';
import { BrainIcon, ChevronDownIcon, LineChartIcon } from 'lucide-react';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { IconCurrencyRupeeNepalese, IconLanguage } from '@tabler/icons-react';

const items = [
  {
    value: 'en',
    label: 'English',
    icon: IconLanguage,
    number: 2451,
  },
  {
    value: 'np',
    label: 'Nepal',
    icon: IconCurrencyRupeeNepalese,
    number: 1832,
  },
];

export default function SearchableDropdown() {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  return (
    <div className="*:not-first:mt-2 w-full lg:max-w-lg">
      <Label htmlFor={id}>Language</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            {value ? (
              <span className="flex min-w-0 items-center gap-2">
                {(() => {
                  const selectedItem = items.find(
                    (item) => item.value === value
                  );
                  if (selectedItem) {
                    const Icon = selectedItem.icon;
                    return <Icon className="text-muted-foreground size-4" />;
                  }
                  return null;
                })()}
                <span className="truncate">
                  {items.find((item) => item.value === value)?.label}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">Select Language</span>
            )}
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search services..." />
            <CommandList>
              <CommandEmpty>No service found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="text-muted-foreground size-4" />
                      {item.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
