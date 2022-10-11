import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks/redux';
import { IOnlineUser, IUser } from '../../../types/models';
import { useActions } from '../../../app/hooks/actions';
import { FriendsListItem } from './FriendsListItem';

const FriendsSidebar = () => {
  const navigate = useNavigate();

  const { friends, onlineUsers, pendingFriendsInvitations } = useAppSelector(state => state.friends);

  const friendsWithOnlineStatus = friends.map(friend => {
    const isOnline = onlineUsers.some(onlineUser => onlineUser.userId === friend.id);
    return { ...friend, isOnline };
  });


  function goToFriendsView(): void {
    navigate(`/channels/@me`, { replace: true });
  }

  return (
    <div className='max-w-[300px] h-[100vh] bg-[#333c5a] flex flex-col px-3
    items-start justify-start w-full h-full
        bg-[#333c5a] text-white text-sm font-medium text-opacity-80 text-[#fff]
         shadow-2xl px-3 py-2 gap-2
        '>
      <div className='w-full h-[50px] flex items-center justify-between gap-2'>
        <div className='w-[100%]  h-[40px] bg-[#2f364f] rounded-lg flex items-center justify-center'>
          <input
            type='text'
            placeholder='Знайти чи почати бесіду'
            className='px-3 w-[100%] h-[40px] bg-transparent text-white text-sm font-medium text-opacity-80 text-[#fff] outline-none'
          />
        </div>
      </div>

      <button
        className='flex items-center justify-start w-full min-h-[40px] mb-2
           hover:bg-darkGray rounded-md cursor-pointer px-2'
        onClick={goToFriendsView}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <span className='ml-2'>Friends</span>
      </button>

      <div className='flex flex-col w-full   py-2 gap-2
       overflow-y-auto overflow-x-hidden
      '>
        {friendsWithOnlineStatus && friendsWithOnlineStatus?.length > 0 ? friendsWithOnlineStatus.map((friend) => (
          <FriendsListItem key={friend.id} friend={friend} />
        )) : (
          <div className='flex items-center justify-center w-full min-h-[40px] mb-2
           hover:bg-darkGray rounded-md cursor-pointer px-2'>
            <span className='text-white'>No friends</span>
          </div>
        )}
      </div>
    </div>
  );
};


export default FriendsSidebar;