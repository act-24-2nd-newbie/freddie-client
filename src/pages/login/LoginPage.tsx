import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header.tsx';
import TextField from '../../components/TextField.tsx';
import { getMemberByEmail } from '../../services/MemberService.ts';
import { useToastStore } from '../../stores/ToastStore.ts';

const LoginPage = () => {
  const navigate = useNavigate();

  const { addToast } = useToastStore();

  const handleSubmit = (value: string) => {
    (async () => {
      const result = await getMemberByEmail(value);
      if (result) {
        sessionStorage.setItem('memberId', result.id);
        sessionStorage.setItem('userName', result.userName);
        navigate('/home');
      } else {
        addToast('Not registered user');
      }
    })();
  };

  return (
    <>
      <Header />
      <div className="mx-auto flex w-[1280px] flex-col gap-6 ps-[120px] pt-[60px]">
        <p className="text-[24px] leading-9 text-content">
          Welcome Newbie!!
          <br /> MyTodo makes it easy to stay organized and manage your life.
        </p>
        <p className="text-[48px] font-bold leading-[72px] text-content">What is your email?</p>
        <div className="w-[680px]">
          <TextField placeholder="Input your email" onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
