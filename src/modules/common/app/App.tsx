import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../../login-page';
import HomePage from '../../home-page';
import { useAppSelector } from '../../../app/hooks/redux';
import SettingsPage from '../../settings-page';
import { useEffect } from 'react';
import { connectWithSocketServer } from '../../../app/realtimeComunications/socketConnection';

function App() {
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      connectWithSocketServer(JSON.parse(localStorage.getItem('user') || '{}'));
    }
  }, [user]);

  return (
    <Routes>
      {Boolean(user) ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/channels/:channel" element={<HomePage />} />
          <Route path="/channels/:channel/:chat" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/auth" element={<LoginPage />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
