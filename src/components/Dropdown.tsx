import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';

import { IDropdownMenuItems, MenuProps } from '@/@types/profile';

import { Button } from './ui/button';

const Dropdown: React.FC<MenuProps> = ({
  options,
  selectedValue,
  leftIcon,
  placeholder,
  disable = false,
  className = '',
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionChange = (option: IDropdownMenuItems) => {
    setSelectedOption(option.label);
    option.onClick();
    setIsOpen(false);
    if (onSelect) {
      onSelect(option.label);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative inline-block text-left w-full' ref={dropdownRef}>
      <div>
        <Button
          disabled={disable}
          type='button'
          className={`flex items-center justify-between py-6 px-5 bg-grayBackground md:bg-black border-none rounded-full ${className}`}
          id='options-menu'
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-haspopup='true'
          onClick={toggleMenu}
        >
          {leftIcon}
          {selectedOption || (
            <span className='text-lightGray opacity-50 font-medium'>
              {placeholder}
            </span>
          )}
          <FaAngleDown className='text-lightGray' />
        </Button>
      </div>

      {isOpen && (
        <div
          className='absolute z-50 max-h-56 overflow-auto right-0 w-full mt-2 origin-top-right divide-y bg-grayBackground md:bg-black divide-lightGray rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
        >
          <div className='py-1' role='none'>
            {options?.map((option, index) => (
              <Button
                key={`${index}-${option.label}`}
                onClick={() => handleOptionChange(option)}
                className={`${
                  option.label === selectedOption
                    ? 'text-grayText bg-grayBackground'
                    : 'text-lightGray'
                } flex justify-start items-center font-medium gap-3 w-full px-4 py-2 text-sm leading-5`}
                role='menuitem'
              >
                {option.icon}
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
