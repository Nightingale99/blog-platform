import { cn } from '@/lib/utils.ts';
import { Input } from './input';

interface InputWithLabelProps {
  className?: string;
  label: string;
  id: string;
  type: string;
  placeholder: string;
}

export function InputWithLabel({
  className,
  label,
  id,
  type,
  placeholder,
}: InputWithLabelProps) {
  return (
    <label className={cn('flex flex-col', className)} htmlFor={id}>
      <span className="label-text ml-0.5 mb-0.5">{label}</span>
      <Input id={id} type={type} placeholder={placeholder} required />
    </label>
  );
}
