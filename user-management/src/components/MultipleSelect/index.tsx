'use client';

import { useState } from 'react';
import Image from 'next/image';

// Components
import { Input } from '../Input';

// Hooks
import { useClickOutside } from '@/hooks/useClickOutside';

interface IOptions {
  id: string;
  name: string;
  image?: string;
}

interface MultipleSelectProps {
  id: string;
  label: string;
  options: IOptions[];
  selectedOptions?: IOptions[];
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export const MultipleSelect = ({
  id,
  label,
  options,
  selectedOptions = [],
  onSelect,
  onRemove,
  disabled = false
}: MultipleSelectProps) => {
  const [openOptions, setOpenOptions] = useState(false);
  const showOptions = () => {
    setOpenOptions(true);
  };

  const hideOptions = () => {
    setOpenOptions(false);
  };

  const dropdownRef = useClickOutside(() => {
    hideOptions();
  });

  return (
    <>
      <label className="block mb-1.5 text-sm text-gray-400" htmlFor={id}>
        {label}
      </label>
      <div
        className="mt-2 w-full border border-gray-500 rounded-lg focus:outline-2 focus:outline-blue-500 focus:border-none"
        ref={dropdownRef}
      >
        {selectedOptions.length > 0 && (
          <div className="bg-transparent w-full p-2">
            <div className="w-full py-2">
              {selectedOptions.map(({ id, name }: IOptions) => (
                <span
                  key={id}
                  className={`border rounded-full bg-blue-400 p-2 mx-0.5 text-sm text-center text-white ${
                    disabled && 'cursor-not-allowed'
                  }`}
                  data-testid={`select-${id}`}
                >
                  {name}
                  {!disabled && (
                    <span className="ml-2 pl-2 border-l-2 cursor-pointer" onClick={() => onRemove(id!)}>
                      X
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {disabled ? (
          selectedOptions.length < 1 && (
            <p className="p-2.5 text-sm font-md opacity-50 shadow-inner cursor-not-allowed">
              No Techstack has been selected
            </p>
          )
        ) : (
          <div
            className="relative w-full focus:outline-2 focus:outline-blue-500 focus:border-none"
            onClick={showOptions}
          >
            <Input placeholder="Select tech" variant="outline" id={id} />
            {openOptions && (
              <div className="w-full p-2" data-testid="options">
                {options.map(({ id, name, image }: IOptions) => (
                  <div
                    key={id}
                    onClick={() => onSelect(id!)}
                    className="flex items-center gap-2 px-2 my-2 hover:bg-blue-500 hover:rounded cursor-pointer"
                    data-testid={`option-${id}`}
                  >
                    {image && (
                      <Image
                        width={24}
                        height={24}
                        className="w-[24px] h-[24px] object-cover rounded-full"
                        src={image}
                        alt={name}
                      />
                    )}
                    <span className="text-black font-md">{name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
