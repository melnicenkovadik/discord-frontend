
import { useParams } from 'react-router-dom';
import { FriendsView } from './FriendsView';
import { ChatView } from './ChatView/ChatView';

export const Messenger = () => {
  const { channel, chat } = useParams();

  return (
    <div className='flex flex-col shadow w-[100%]'>
      {channel === '@me' && !chat ? <FriendsView />: <ChatView />  }
    </div>
  );
};
