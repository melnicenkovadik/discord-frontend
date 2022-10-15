import { Layout } from 'modules/home-page/layout';
import { ModalsProvider } from 'app/context/modals.context';
import { useEffect } from 'react';
import { connectWithSocketServer } from '../../app/realtimeComunications/socketConnection';
import { useToast } from '../../app/hooks/use-toast';
import { useAppSelector } from '../../app/hooks/redux';
import Room from './Room';
import { Messenger } from './Workspace/Messanger';

export const HomePage = () => {
  const { isUserInRoom } = useAppSelector(state => state.room);

  return (
    <ModalsProvider>
      <Layout>
        <Messenger />
      </Layout>
      {isUserInRoom && <Room />}
    </ModalsProvider>
  );
};
