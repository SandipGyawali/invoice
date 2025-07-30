'use client';
// import { routing } from '@/i18n/routing';
// import { Globe } from 'lucide-react';
// import { useLocale } from 'next-intl';
// import LocaleSwitcherSelect from './locale-switcher-select';

// export default function LocaleSwitcher() {
//   const locale = useLocale();

//   return (
//     <div className="flex items-center gap-2">
//       <Globe className="h-4 w-4 text-muted-foreground" />
//       <LocaleSwitcherSelect defaultValue={locale} label="Select a locale">
//         {routing.locales.map((cur) => (
//           <option key={cur} value={cur}>
//             {cur}
//           </option>
//         ))}
//       </LocaleSwitcherSelect>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@invoice/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@invoice/ui/command';
import { Label } from '@invoice/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@invoice/ui/popover';
import { IconCurrencyRupeeNepalese, IconLanguage } from '@tabler/icons-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams, useSearchParams } from 'next/navigation';
import { Locale } from 'next-intl';

const items = [
  {
    value: 'en',
    label: 'English',
    icon: IconLanguage,
    number: 2451,
  },
  {
    value: 'ne',
    label: 'Nepali',
    icon: IconCurrencyRupeeNepalese,
    number: 1832,
  },
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const qryParams = useParams();

  useEffect(() => {
    setValue((qryParams.locale as string) ?? 'en');
  }, [qryParams]);

  function onSelectChange(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale as Locale }
    );
  }

  return (
    <div className="*:not-first:mt-2 flex flex-col w-full lg:max-w-lg">
      <Label>Language</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-[200px] justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
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
                      onSelectChange(currentValue);
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
