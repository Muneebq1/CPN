import { cn } from 'src/lib/utils';

interface ITypography {
  children: React.ReactNode;
  className?: string;
  variant?:
    | 'title'
    | 'heading'
    | 'subheading'
    | 'normal'
    | 'lg'
    | 'sm'
    | 'p'
    | 'xs';
}

export const Typography = ({
  variant = 'p',
  className,
  children,
}: ITypography) => (
  <p
    className={cn(
      'text-primaryBlack',
      {
        'text-2xl md:text-4xl font-bold !leading-tight': variant === 'title',
        'text-xl font-medium leading-9': variant === 'heading',
        'text-base md:text-lg font-semibold': variant === 'subheading',
        'text-lg font-semibold': variant === 'lg',
        'text-base font-semibold': variant === 'normal',
        'text-sm': variant === 'sm',
        'text-xs': variant === 'xs',
        'text-sm md:text-base font-normal leading-[27px]': variant === 'p',
      },
      className,
    )}
  >
    {children}
  </p>
);
