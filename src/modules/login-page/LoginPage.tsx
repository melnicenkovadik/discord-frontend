import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useLocation } from 'react-router-dom';

export const LoginPage = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex w-[100%] text-gray h-[100vh] justify-center items-center bg-login-background bg-no-repeat bg-cover">
      {pathname.includes('login') ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};
