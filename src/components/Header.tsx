import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg?react';
import moment from 'moment';

const Header = () => {
  const navigate = useNavigate();
  const now = moment().format('MM/DD (ddd)');
  const isLogin = !!sessionStorage.getItem('userName');

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleButtonClick = () => {
    if (isLogin) {
      sessionStorage.removeItem('memberId');
      sessionStorage.removeItem('userName');
      navigate('/');
    } else {
      navigate('/signup');
    }
  };

  return (
    <header className="h-12 min-h-12 bg-header text-white">
      <div className="mx-auto flex h-full w-[1280px] items-center justify-between px-4">
        <div className="flex h-full items-center gap-3 hover:cursor-pointer" onClick={handleLogoClick}>
          <Logo />
          <p className="text-[24px] font-bold leading-7">My Todo</p>
        </div>
        <div className="flex h-full items-center gap-4">
          <p className="font-bold">{now}</p>
          <button className="h-8 rounded border border-white px-3" onClick={handleButtonClick}>
            {isLogin ? 'Logout' : 'Sign up'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
