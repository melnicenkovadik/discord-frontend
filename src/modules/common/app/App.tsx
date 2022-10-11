import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../../login-page';
import HomePage from '../../home-page';
// todo check cookie
import { useCookies } from 'react-cookie';
import { useAppSelector } from '../../../app/hooks/redux';

function App() {
  const { user } = useAppSelector(state => state.auth);
  const [cookies] = useCookies(['access_token']);

  console.log('cookies',cookies);
  return (
    <Routes>
      {Boolean(user) ? (
        <>
          <Route path='/' element={<HomePage />} />
          <Route path='/channels/:channel' element={<HomePage />} />
          <Route path='/channels/:channel/:chat' element={<HomePage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </>
      ) : (
        <>
          <Route path='/auth' element={<LoginPage />}>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<LoginPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/auth/login' replace />} />
        </>
      )}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
