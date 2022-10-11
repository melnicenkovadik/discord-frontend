
import Sidebar from './sidebar';
import FriendsSidebar from '../FriendsSidebar';
import { Messenger } from '../Messager/Messenger';
import { useActions } from '../../../app/hooks/actions';
import { useEffect } from 'react';
import { useToast } from '../../../app/hooks/use-toast';
import { useAppSelector } from '../../../app/hooks/redux';
import { connectWithSocketServer } from '../../../app/helpers';

export function Layout() {
  const { showInfo } = useToast()


  return (
    <div className='w-[100%] bg-gradient-to-r from-[#333c5a] to-transparent h-[100vh] bg-[#333c5a] flex'>
      <Sidebar />
      <FriendsSidebar />
      <Messenger />
    </div>
  );
}

