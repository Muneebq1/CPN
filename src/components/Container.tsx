import React from 'react';

import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({
  width = 'w-full',
  height = 'h-full',
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl px-2 md:px-4 md:py-5 py-3',
        width,
        height,
        className,
      )}
      {...rest}
    ></div>
  );
};

export default Container;
