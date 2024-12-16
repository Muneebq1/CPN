// ToggleSwitch.tsx
import React from 'react';

import { ToggleSwitchProps } from '@/@types';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <div className='relative cursor-pointer'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='hidden'
      />
      <div
        className={`w-12 h-6 m-2 rounded-full flex justify-between items-center ${checked ? 'bg-subscriptionRed' : 'bg-grayBackground'}`}
        onClick={onChange}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
