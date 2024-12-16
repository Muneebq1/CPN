import React, { useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { LuSearch } from 'react-icons/lu';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import {
  clearRecentSearches,
  clearSearchResults,
  fetchRecentSearches,
  searchQuery,
} from '@/redux/slices/searchSlice';

import Container from '../Container';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import SearchResult from './SearchResult';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const debouncedQuery = useDebounce(searchText, 200);
  const { results, recentSearches } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(fetchRecentSearches());
    return () => {
      dispatch(clearSearchResults());
      dispatch(clearRecentSearches());
    };
  }, [dispatch]);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(searchQuery(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    if (results?.length > 0 || recentSearches?.length > 0) {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [results]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClear = () => {
    setSearchText('');
    setIsSearchVisible(false);
    setIsDropdownVisible(false);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
    if (!isSearchVisible) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div>
      <Container
        height='h-12'
        className='bg-transparent  items-center md:px-2 md:py-0 py-0 overflow-hidden relative hidden md:flex'
      >
        <div
          className={cn(
            'flex items-center w-full gap-2 transition-opacity duration-500 opacity-0',
            { 'opacity-100 ': isSearchVisible },
          )}
        >
          <div className='hover:text-gray-300 flex items-center transition-opacity cursor-pointer duration-500'>
            <LuSearch size={30} className='w-5 md:w-full' />
          </div>
          <div className='w-full relative ml-1'>
            <Input
              ref={inputRef}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className='bg-transparent border-none text-white text-sm md:text-xl font-semibold p-0'
              placeholder={strings.search}
              onClick={() => setIsDropdownVisible(true)}
            />
          </div>
          <Button
            onClick={() => setSearchText('')}
            size='icon'
            variant='link'
            icon={
              <FiX
                className={cn('text-quickSilver size-4 opacity-0', {
                  'opacity-100': searchText,
                })}
              />
            }
            aria-label='Clear search'
          />
          <Button
            onClick={handleClear}
            size='icon'
            aria-label='Cancel search'
            className='ml-2 text-sm md:text-lg font-normal text-white'
          >
            {strings.cancel}
          </Button>
        </div>
        <div
          onClick={toggleSearchVisibility}
          className={cn(
            'hover:text-gray-300 flex  items-center transition-opacity duration-500 ml-2 cursor-pointer opacity-100',
            {
              'opacity-0': isSearchVisible,
            },
          )}
        >
          <LuSearch size={30} className='w-6 md:w-full' />
        </div>
      </Container>
      <SearchResult
        results={results?.length ? results : recentSearches}
        dropdownRef={dropdownRef}
        isDropdownVisible={isDropdownVisible}
        setSearchText={setSearchText}
      />
    </div>
  );
};

export default SearchBar;
