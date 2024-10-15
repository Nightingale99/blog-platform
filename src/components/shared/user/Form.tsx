import { cn } from '@/lib/utils.ts';

interface FormProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  onSubmit: () => unknown;
}

export function Form({ className, title, children, onSubmit }: FormProps) {
  return (
    <div className={cn('py-12 px-8 bg-foreground rounded-md', className)}>
      <h3 className="text-center text-xl mb-5">{title}</h3>
      <form onSubmit={onSubmit} className="flex flex-col text-[14px]">
        {children}
      </form>
    </div>
  );
}
