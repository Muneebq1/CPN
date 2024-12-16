import * as React from 'react';

import { SVGComponentProps } from '@/@types';

const VerifiedIcon: React.FC<SVGComponentProps> = ({ ...props }) => (
  <svg
    width='11'
    height='11'
    viewBox='0 0 11 11'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M4.21867 10.1011L3.37464 8.61192L1.77541 8.23961L1.93089 6.51769L0.842529 5.21462L1.93089 3.91155L1.77541 2.18963L3.37464 1.81732L4.21867 0.328094L5.72905 1.0029L7.23943 0.328094L8.08347 1.81732L9.6827 2.18963L9.52722 3.91155L10.6156 5.21462L9.52722 6.51769L9.6827 8.23961L8.08347 8.61192L7.23943 10.1011L5.72905 9.42634L4.21867 10.1011ZM5.26261 6.86673L7.77251 4.23731L7.15059 3.56251L5.26261 5.54039L4.30752 4.56308L3.6856 5.21462L5.26261 6.86673Z'
      fill='#3897F0'
    />
  </svg>
);
export default VerifiedIcon;
