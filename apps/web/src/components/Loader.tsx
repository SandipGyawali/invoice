import { cn } from '@invoice/ui/lib/utils';
import { SyncLoader } from 'react-spinners';

function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex w-screen h-screen mx-auto items-center justify-between',
        className
      )}
    >
      <SyncLoader className="mx-auto" color="#b7e854" />
    </div>
  );
}

export default Loader;
