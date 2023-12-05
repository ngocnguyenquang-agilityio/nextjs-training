import { cls } from '@/utils/cls';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'danger';
  disabled?: boolean;
  error?: boolean;
}

const classes = {
  base: 'bg-transparent block w-full border text-black text-sm font-md rounded-lg p-2.5',
  disabled: 'cursor-not-allowed opacity-50 shadow-inner',
  variant: {
    primary:
      'border-gray-500 focus:ring-blue-500 outline-none focus:border-blue-500 placeholder-gray-400 focus:outline-2 focus:outline-blue-500 focus:border-none',
    danger: 'focus:outline-none border-red-600 focus:border-red-600'
  }
};

export const Input = ({ className, variant = 'primary', error = false, disabled = false, ...rest }: InputProps) => {
  return (
    <input
      {...rest}
      disabled={disabled}
      className={cls(`
      ${classes.base} 
      ${error ? classes.variant['danger'] : classes.variant['primary']} 
      ${disabled && classes.disabled} 
      ${className}`)}
    />
  );
};
