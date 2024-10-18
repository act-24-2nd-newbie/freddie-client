import { Outlet } from 'react-router-dom';
import Toast from './components/Toast.tsx';

function App() {
  return (
    <>
      <Outlet />
      <Toast />
    </>
  );
}

export default App;
