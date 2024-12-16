import React from 'react';

import { Button } from '@/components/ui/button';
import { strings } from '@/locales';

interface ModalProps {
  message: string;
  onOk: () => void;
  onCancel: () => void;
}

const SessionModal: React.FC<ModalProps> = ({ message, onOk, onCancel }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center'>
      <div className='bg-grayBackground md:bg-black p-6 rounded-lg max-w-sm md:max-w-md w-full'>
        <h2 className='text-xl md:text-2xl'>
          {strings.ManageSession.sessionLogout}
        </h2>
        <p className='text-lg text-white my-1'>{message}</p>
        <div className='mt-5 flex justify-between gap-3'>
          <Button
            onClick={onCancel}
            className='bg-grayBackground rounded-full text-base md:text-lg font-medium h-12 w-full'
          >
            {strings.cancel}
          </Button>
          <Button
            onClick={onOk}
            className='bg-subscriptionRed rounded-full text-base md:text-lg font-medium h-12 w-full'
          >
            {strings.logout}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
