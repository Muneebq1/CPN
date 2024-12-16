/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { LuArrowUpLeft } from 'react-icons/lu';
import moment from 'moment';

import { cn } from '@/lib/utils';

const SearchResult = ({
  dropdownRef,
  results,
  isDropdownVisible,
  setSearchText,
}: {
  results: any[];
  isDropdownVisible: boolean;
  dropdownRef: any;
  setSearchText: any;
}) => {
  return (
    <div
      ref={dropdownRef}
      className={cn(
        'absolute max-h-60 overflow-auto w-80 top-20 rounded-xl p-3 bg-black transition-all duration-500',
        {
          'opacity-100 scale-100 visible': isDropdownVisible,
          'opacity-0 scale-95 invisible': !isDropdownVisible,
        },
      )}
    >
      {results?.slice(0, 20)?.map((result, idx) => (
        <div
          key={idx}
          className='flex my-3 justify-between items-center cursor-pointer'
          onClick={() => {
            if (result.type === 'channels') {
              window.location.href = `/video-player?playlist=${result?.url?.split('/').pop()}`;
            } else if (result.type === 'playlist') {
              window.location.href = `/podcast-video-player?playlist=${result?.playlist_id}`;
            }
          }}
        >
          <div className='flex gap-3 items-center'>
            {(result.avatar || result.image || result.thumbnail) && (
              <img
                src={result.avatar || result.image || result.thumbnail}
                className='rounded-full w-9 h-9'
                alt=''
                srcSet=''
              />
            )}
            <div
              onClick={() => {
                if (result?.text) {
                  setSearchText(result?.text);
                }
              }}
            >
              <p>
                {result.username ||
                  result.name ||
                  result?.text ||
                  result?.title}
              </p>
              <p className='text-gray-500 text-xs'>
                {' '}
                {moment.utc(result.time).local().fromNow()}
              </p>
            </div>
          </div>
          <LuArrowUpLeft size={23} />
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
