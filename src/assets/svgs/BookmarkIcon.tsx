import * as React from 'react';

import { SVGComponentProps } from '@/@types';

const BookmarkIcon: React.FC<SVGComponentProps> = ({ ...props }) => (
  <svg
    width='24'
    height='25'
    viewBox='0 0 24 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M18.6459 21.4987L11.8048 16.6122L4.96362 21.4987V5.86184C4.96362 5.34344 5.16955 4.84628 5.53611 4.47972C5.90268 4.11316 6.39984 3.90723 6.91823 3.90723H16.6913C17.2097 3.90723 17.7068 4.11316 18.0734 4.47972C18.44 4.84628 18.6459 5.34344 18.6459 5.86184V21.4987Z'
      stroke={props.fill || 'white'}
      strokeWidth='1.46596'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default BookmarkIcon;
