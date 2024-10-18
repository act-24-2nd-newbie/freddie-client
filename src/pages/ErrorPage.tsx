import Header from '../components/Header.tsx';
import Error from '../assets/error.svg?react';

const ErrorPage = () => {
  return (
    <div>
      <Header />
      <div className="flex h-screen items-center justify-center">
        <Error />
      </div>
    </div>
  );
};

export default ErrorPage;
