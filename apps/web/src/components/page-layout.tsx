import { cn } from '@invoice/ui/lib/utils';

export function PageContainer({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl p-4 md:p-8', className)}>
      {children}
    </div>
  );
}

export function PageHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(className)}>{children}</div>;
}

export function PageTitle({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        'flex items-center gap-3 truncate font-bold text-foreground text-xl leading-none tracking-tight',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function PageContent({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mt-4 md:grow lg:mt-6', className)}>{children}</div>
  );
}
