import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

import Loader from '../Loader';

const buttonVariants = cva(
  'h-12 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-xl',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white font-bold',
        outline:
          'border border-input bg-white border-primary text-primary font-bold border-2',
        secondary: 'bg-secondary text-black',
        link: 'text-primary underline-offset-4 underline',
        ghost: 'border-greyWhite rounded-[5px] bg-simplyViolet border',
      },
      size: {
        default: 'w-full px-4 py-2',
        sm: 'w-32 rounded-md px-3',
        lg: 'w-1/2 min-w-32 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  textWithIconClassName?: string;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading = false,
      icon,
      iconPosition = 'right',
      className,
      variant,
      size,
      textWithIconClassName,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const hasIcon = !!icon;
    const hasChildren = !!props.children;
    const shouldRenderInnerDiv = hasIcon && hasChildren;
    const loaderColor = ['default', 'secondary', undefined].includes(
      variant as string,
    )
      ? '#fff'
      : '#2B8ABC';

    const Content = () => {
      if (loading) return <Loader color={loaderColor} size={5} />;
      return (
        <>
          {props.children}
          {icon}
        </>
      );
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {shouldRenderInnerDiv ? (
          <div
            className={cn(
              'w-full flex items-center  justify-center gap-2',
              {
                'flex-row-reverse': iconPosition === 'left',
              },
              textWithIconClassName,
            )}
          >
            {Content()}
          </div>
        ) : (
          Content()
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
