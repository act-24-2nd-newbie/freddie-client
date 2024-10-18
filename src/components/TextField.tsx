import React, { useEffect, useRef, useState } from 'react';
import Send from '../assets/send.svg?react';
import Delete from '../assets/delete.svg?react';
import { Input, InputType } from '../contants/Input.ts';
import { Valid, ValidType } from '../contants/Valid.ts';
import Check from '../assets/check.svg?react';

interface TextFieldProps extends Omit<React.ComponentProps<'input'>, 'onSubmit' | 'onChange'> {
  value?: string;
  valueType?: InputType;
  valid?: string;
  validType?: ValidType;
  hasBorder?: boolean;
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
}

const TextField = ({
  value = '',
  valueType = Input.TEXT,
  valid = '',
  validType = Valid.ERROR,
  hasBorder,
  onSubmit,
  onChange,
  ...props
}: TextFieldProps) => {
  const [text, setText] = useState('');
  const [validText, setValidText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const hasError = validText && validType === Valid.ERROR;
  const hasSuccess = validText && validType === Valid.SUCCESS;

  useEffect(() => {
    if (hasBorder) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    setValidText(valid);
  }, [valid]);

  const validateText = (value: string) => {
    const regex =
      valueType === Input.TEXT
        ? /[^가-힣a-zA-Z0-9 .,?@!‘“ㄱ-ㅎㅏ-ㅣ]/
        : /^(?![a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}).*$/;
    if (value && value.match(regex)) {
      setValidText(`Invalid ${valueType} format`);
      return false;
    }
    setValidText('');
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    validateText(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    setText('');
    setValidText('');
    onChange?.('');
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!text || hasError) return;
    onSubmit?.(text);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <div
        className={`text-field ${hasBorder ? 'h-[60px] rounded border bg-white p-4' : 'h-8'} ${hasError ? `border-error` : 'border-primary'}`}
      >
        <div className="relative flex h-full grow">
          <input
            {...props}
            value={text}
            className={`input-text-field ${hasBorder ? 'border-none' : 'border-b'} ${hasError ? `border-error` : 'focus:border-primary'}`}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            ref={inputRef}
          />
          {!hasBorder && text && (
            <button className="absolute bottom-1 right-0 flex h-6 w-6 items-center" onClick={handleClear}>
              <Delete className="h-5 w-5 opacity-50" />
            </button>
          )}
        </div>
        {valueType === Input.TEXT ? (
          <button className="flex h-6 w-6 items-center justify-center" onClick={handleSubmit}>
            <Send className={`${text && !validText ? 'fill-primary' : 'opacity-30'} h-5 w-5`} />
          </button>
        ) : (
          <button
            className={`${hasSuccess ? '' : 'hover:bg-black/[0.08]'} btn-check`}
            onClick={hasSuccess ? () => {} : handleSubmit}
          >
            {hasSuccess ? <Check /> : 'Check'}
          </button>
        )}
      </div>
      {validText && (
        <div className={`${hasError ? 'text-error' : 'text-primary'} h-[18px] text-[12px] leading-[18px]`}>
          {validText}
        </div>
      )}
    </>
  );
};

export default TextField;
