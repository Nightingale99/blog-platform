import { cn } from '@/lib/utils.ts';
import { Input } from './input';
import { FieldError } from 'react-hook-form';

interface InputWithLabelProps {
  className?: string;
  label: string;
  id: string;
  type: string;
  placeholder: string;
  register: object;
  errors: FieldError | undefined;
}

export function InputWithLabel({
  className,
  label,
  id,
  type,
  placeholder,
  register,
  errors,
}: InputWithLabelProps) {
  return (
    <label className={cn('flex flex-col', className)} htmlFor={id}>
      <span className="ml-0.5 mb-0.5">{label}</span>
      <Input
        id={id}
        className={cn('focus:', errors?.message ? 'border-destructive' : '')}
        type={type}
        placeholder={placeholder}
        register={register}
        required
      />
      {errors && (
        <span className="label-text-alt text-destructive text-[14px]">
          {errors.message}
        </span>
      )}
    </label>
  );
}
