'use client';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@invoice/ui/lib/utils';
import { useTheme } from 'next-themes';

interface Option {
  id: string;
  name: string;
  status: 'on' | 'off';
  value?: number;
  unit?: string;
  icon: React.ReactNode;
  theme: string;
}

interface Scene {
  id: string;
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
}

interface Card06Props {
  themeName?: string;
  temperature?: number;
  options?: Option[];
  scenes?: Scene[];
}

export default function ToggleThemeCard({
  themeName = 'Theme Options.',
  options = [
    {
      id: '1',
      name: 'Light Theme',
      status: 'on',
      value: 80,
      icon: <Sun className="w-4 h-4" />,
      theme: 'light',
    },
    {
      id: '2',
      name: 'Dark Theme',
      status: 'off',
      value: 22,
      icon: <Moon className="w-4 h-4" />,
      theme: 'dark',
    },
  ],
}: Card06Props) {
  const { setTheme, theme, themes } = useTheme();
  console.log(theme);
  console.log(themes);

  return (
    <div className="w-full max-w-lg">
      <div
        className={cn(
          'relative overflow-hidden',
          'rounded-3xl',
          'transition-all duration-300',
          'border border-zinc-200 dark:border-zinc-800'
        )}
      >
        {/* Header */}
        <div className="p-5 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {themeName}
              </h3>
            </div>
          </div>

          {/* Devices */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  'p-4 rounded-2xl',
                  'bg-zinc-50 dark:bg-zinc-800/50',
                  'border border-zinc-200 dark:border-zinc-700',
                  'group',
                  'transition-all duration-200',
                  theme === option.theme &&
                    'bg-primary-50/50 dark:bg-primary-900/20',
                  theme === option.theme &&
                    'border-primary-200 dark:border-primary-600 border-2'
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div
                      className={cn(
                        'p-2 rounded-lg w-fit',
                        'bg-white dark:bg-zinc-800',
                        'border border-zinc-200 dark:border-zinc-700',
                        theme === option.theme && 'text-primary-500'
                      )}
                    >
                      {option.icon}
                    </div>
                    <h4 className="text-sm mt-4 font-medium text-zinc-900 dark:text-zinc-100">
                      {option.name}
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      setTheme(option.theme);
                    }}
                    type="button"
                    className={cn(
                      'relative w-11 h-6 rounded-full',
                      'transition-colors duration-200',
                      theme === option.theme
                        ? 'bg-primary-500'
                        : 'bg-zinc-200 dark:bg-zinc-700'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute w-5 h-5 rounded-full',
                        'bg-white',
                        'shadow-xs',
                        'transition-transform duration-200',
                        'top-0.5 left-0.5',
                        theme === option.theme && 'translate-x-5'
                      )}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
