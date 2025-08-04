import { Badge } from '@invoice/ui/badge';
import { cn } from '@invoice/ui/lib/utils';

type BadgeProps = {
  row: any;
};

export function StatusBadge({ row }: BadgeProps) {
  return (
    <Badge
      className={cn(
        row.getValue('status') === 'Inactive' &&
          'bg-destructive text-primary-foreground'
      )}
    >
      {row.getValue('status') == 1 ? 'Active' : 'Inactive'}
    </Badge>
  );
}

export function ProjectStatusBadge({ row }: BadgeProps) {
  const status = row.getValue('pStatus');

  return (
    <Badge
      className={cn(
        status === 'not_started' && 'bg-destructive text-white',
        status === 'in_progress' && 'bg-yellow-500 text-primary-foreground',
        status === 'completed' && 'bg-primary text-primary-foreground'
      )}
    >
      {status == 'in_progress'
        ? 'In Progress'
        : status == 'completed'
        ? 'Completed'
        : 'Not Started'}
    </Badge>
  );
}
