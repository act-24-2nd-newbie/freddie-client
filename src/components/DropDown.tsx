import React, { useEffect, useRef, useState } from 'react';

import useClickOutside from '../hooks/useClickOutside.ts';

interface DropDownProps {
  options: Option[];
  selected: Option;
  onChange: (value: Option) => void;
}

const DropDown = ({ options, selected, onChange }: DropDownProps) => {
  const [option, setOption] = useState(selected);
  const [isShow, setIsShow] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const { clickOutsideListener } = useClickOutside();

  useEffect(() => {
    return clickOutsideListener(dropDownRef, () => {
      setIsShow(false);
    });
  }, []);

  const handleClick = () => {
    setIsShow(prev => !prev);
  };

  const handleOrderClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedOption = options.find(option => option.label === e.currentTarget.innerText)!;
    setOption(selectedOption);
    onChange?.(selectedOption);
  };

  return (
    <div className={`drop-down ${isShow ? 'rounded-t' : 'rounded'}`} ref={dropDownRef} onClick={handleClick}>
      <button className={`btn-drop-down ${isShow ? 'bg-arrow-up' : 'bg-arrow-down'}`}>{option.label}</button>
      <ul className={`ul-drop-down ${isShow ? '' : 'hidden'}`}>
        {options.map(({ label, value }) => (
          <li
            key={value}
            className={`li-drop-down ${option.value === value ? 'bg-primary/[0.1] text-primary' : ''}`}
            onClick={handleOrderClick}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
