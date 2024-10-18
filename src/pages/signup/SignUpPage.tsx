import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMember, getMemberByEmail } from '../../services/MemberService.ts';

import Header from '../../components/Header.tsx';
import TextField from '../../components/TextField.tsx';
import { Valid, ValidType } from '../../contants/Valid.ts';
import { Input } from '../../contants/Input.ts';
import { useToastStore } from '../../stores/ToastStore.ts';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [valid, setValid] = useState('');
  const [validType, setValidType] = useState<ValidType>(Valid.ERROR);

  const disabled = !email || !userName || validType === Valid.ERROR;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setValid('');
    setValidType(Valid.ERROR);
  };

  const handleCheckClick = async (value: string) => {
    const result = await getMemberByEmail(value);
    setValid(result ? 'This email already exists' : 'This email is available');
    setValidType(result ? Valid.ERROR : Valid.SUCCESS);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleCancelClick = () => {
    navigate('/');
  };

  const handleConfirmClick = () => {
    createMember({ email, userName });
    addToast('Registered successfully');
    navigate('/');
  };

  return (
    <div>
      <Header />
      <div className="mx-auto flex w-[1280px] flex-col gap-8 pl-[440px] pt-[60px]">
        <p className="text-[48px] font-bold leading-[72px] text-content">Sign up</p>
        <div className="flex w-[400px] flex-col gap-2 text-[12px] leading-5">
          <div>
            <p>E-mail</p>
            <TextField
              value={email}
              valueType={Input.EMAIL}
              valid={valid}
              validType={validType}
              placeholder="E-mail"
              onChange={handleEmailChange}
              onSubmit={handleCheckClick}
            />
          </div>
          <div className="flex grow flex-col">
            <p>User Name</p>
            <input
              value={userName}
              className="h-8 border-b outline-none focus:border-primary focus:placeholder:opacity-0"
              placeholder="User Name"
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="gap flex w-[400px] justify-end gap-2">
          <button className="btn-cancel" onClick={handleCancelClick}>
            Cancel
          </button>
          <button disabled={disabled} className="btn-confirm" onClick={handleConfirmClick}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
