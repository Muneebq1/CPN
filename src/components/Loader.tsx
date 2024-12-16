import React from 'react';
import { BeatLoader } from 'react-spinners';

interface ILoader {
  color?: string;
  loading?: boolean;
  size?: number;
}

const Loader: React.FC<ILoader> = ({ color = '#fff', loading, size = 8 }) => {
  return (
    <div className='flex items-center'>
      <BeatLoader
        color={color}
        loading={loading}
        size={size}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default Loader;
