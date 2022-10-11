import { Layout } from 'modules/home-page/layout';
import { ModalsProvider } from 'app/context/modals.context';
import { useEffect } from 'react';
import { connectWithSocketServer } from '../../app/helpers';
import { useToast } from '../../app/hooks/use-toast';
import { useAppSelector } from '../../app/hooks/redux';

export const HomePage = () => {
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    connectWithSocketServer(JSON.parse(localStorage.getItem('user') || '{}'));
  }, [user]);

  return (
    <ModalsProvider>
      <Layout />
    </ModalsProvider>
  );
};

