// components/ui/searchable-select.tsx
'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { cn } from './lib/utils';
import { useDebounce } from './hooks/useDebounce';

export interface Option {
  label: string;
  value: string | number;
}

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  onSearch: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  searchValue: string;
  isDataLoading?: boolean;
}

export const SearchableSelect = ({
  value,
  onChange,
  options,
  onSearch,
  placeholder = 'Select...',
  disabled = false,
  searchValue,
}: SearchableSelectProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(searchValue);
  const [open, setOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 400); // 300ms delay

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          aria-expanded={open}
          className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
        >
          <span className={cn('truncate', !value && 'text-muted-foreground')}>
            {value
              ? options.find((opt) => opt.value === value)?.label
              : placeholder}
          </span>
          <ChevronDownIcon
            size={16}
            className="text-muted-foreground/80 shrink-0"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search..."
            value={searchTerm}
            onValueChange={(val) => setSearchTerm(val)}
          />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value.toString()}
                  onSelect={(val) => {
                    onChange(val === value ? '' : val);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                  {value === opt.value && (
                    <CheckIcon size={16} className="ml-auto" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
