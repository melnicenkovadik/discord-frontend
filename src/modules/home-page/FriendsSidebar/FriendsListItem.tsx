import { useNavigate, useParams } from 'react-router-dom';
import { useActions } from 'app/hooks/actions';
import { ChatTypes, IUser } from 'types/models';

interface IFriendsListItem {
  friend: IUser & { isOnline: boolean };
}

export const FriendsListItem = ({ friend: { id, isOnline, mail, username } }: IFriendsListItem) => {
  const { channel } = useParams();
  const { setChosenChatDetails } = useActions();
  const navigate = useNavigate();

  function handleChoseActiveConversation(): void {
    setChosenChatDetails({
      id: id as string,
      name: username as string,
      mail: mail as string,
      chatType: ChatTypes.DIRECT as ChatTypes,
    });
    navigate(`/channels/${channel}/${id}`, { replace: true });
  }

  return (
    <div key={id}
         onClick={handleChoseActiveConversation}
         className='flex items-center justify-start w-full min-h-[40px] mb-2
                animate__animated animate__fadeInUpBig
                  hover:bg-darkGray rounded-md cursor-pointer px-2'>
      <div className='rounded-full w-[30px] h-[30px] bg-purple relative'>
        {isOnline && (
          <div
            className='rounded-full w-[10px] h-[10px] bg-green-500 absolute bottom-0 right-0 border-2 border-white'></div>
        )}
      </div>
      <span className='text-white ml-2'>{username}</span>
    </div>
  );
};
