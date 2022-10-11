import { IconButton, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react';
import AddFriend from '../layout/AddFriend';
import { useActions } from '../../../app/hooks/actions';
import { useToast } from '../../../app/hooks/use-toast';
import { useAppSelector } from '../../../app/hooks/redux';
import { useEffect } from 'react';
import {
  useLazyAcceptFriendInvitationQuery,
  useLazyRejectFriendInvitationQuery,
} from '../../../app/store/friends/friends.api';
import { IOnlineUser, IUser } from '../../../types/models';

const FriendsTabs = () => {
  return (
    <div className='w-[100%] bg-transparent flex justify-start items-center'>
      <div className='w-[10%] gap-[5px] h-[50px] flex justify-center items-center text-white bg-transparent'>
        <svg x='0' y='0' className='icon-2xnN2Y' aria-hidden='true' role='img' width='24' height='24'
             viewBox='0 0 24 24'>
          <g fill='none' fillRule='evenodd'>
            <path fill='currentColor' fillRule='nonzero'
                  d='M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z'
                  transform='translate(2 4)'></path>
            <path
              d='M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z'></path>
          </g>
        </svg>
        <span className='ml-2'> Друзі </span>
        <div className='w-[2px] ml-2 h-[50%] bg-white'></div>
      </div>
      <TabsHeader
        className='w-[100%] bg-transparent flex justify-between items-center'
      >
        {data.map(({ label, value }) => (
          <Tab
            className='
            h-[35px] flex-1 justify-center items-center text-gray flex gap-[50px]
            px-[20px]
            shadow-xl
             '
            key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </div>

  );
};

export const FriendsView = () => {
  const { logout } = useActions();
  const { showSuccess } = useToast();

  const logoutHandler = () => {
    logout();
    showSuccess('Ви успішно вийшли з системи');
  };

  return (
    <>
      <Tabs value='online' className='w-[100%] h-[100%] flex flex-col justify-start items-center'>
        <div className='w-[100%] flex justify-start items-start  h-[50px] bg-[#2f364f] px-2'>
          <FriendsTabs />
          <button
            onClick={logoutHandler}
          >
            <span className='ml-2'> Вийти </span>
          </button>
        </div>
        <div
          className='p-[20px] flex flex-col w-[100%] justify-start items-start animate__animated animate__fadeInRightBig '>
          <TabsBody>
            {data.map(({ value }) => (
              <TabPanel key={value} value={value}>
                {
                  value === 'add' ? (
                    <AddFriend />
                  ) : (
                    <FriendsBody value={value} />
                  )
                }
              </TabPanel>
            ))}
          </TabsBody>
        </div>
      </Tabs>;
    </>
  );
};

function FriendsBody(props: any) {
  return (
    <div className='h-[100%] flex-1 flex flex-col bg-[#333c5a]'>
      {data.map(({ label, value }) => {

        if (value === props.value) {
          return (
            <div key={value}>
              <Typography color='white' value={value}>
                {label}
              </Typography>
              <hr className='w-[100%] h-[1px] bg-darkGray border-none  shadow my-5' />
              <UsersList type={props.value} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}


const data = [
  {
    label: 'Всі',
    value: 'all',
  },
  {
    label: 'Онлайн',
    value: 'online',
  },
  {
    label: 'Очікування',
    value: 'waiting',
  },

  {
    label: 'Заблоковані',
    value: 'blocked',
  },

  {
    label: (
      <div
        className='flex whitespace-nowrap flex-row rounded-lg flex items-center justify-center cursor-pointer '>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </div>
        <div>Додати друга</div>

      </div>),
    value: 'add',
  },
];


export default function UsersList({ type }: { type: string }) {
  const { showSuccess, showError } = useToast();
  const { friends, onlineUsers, pendingFriendsInvitations } = useAppSelector(state => state.friends);
  const [
    acceptInvitation,
    { isLoading: acceptLoad, isError: isAcceptError, data: acceptData, error: acceptError },
  ] = useLazyAcceptFriendInvitationQuery();
  const [
    rejectInvitation,
    { isLoading: rejectLoad, isError: isrejectError, data: rejectData, error: rejectError },
  ] = useLazyRejectFriendInvitationQuery();

  const friendsWithOnlineStatus = friends.map(friend => {
    const isOnline = onlineUsers.some(onlineUser => onlineUser.userId === friend.id);
    return { ...friend, isOnline };
  });

  const checkOnlineUsers = (friends: IUser[], onlineUsers: IOnlineUser[]) => {
    return friends.filter(friend => {
      return onlineUsers.some(onlineUser => onlineUser.userId === friend.id);
    });
  };

  useEffect(() => {
    if (acceptData) {
      showSuccess('Запит успішно прийнято');
    }

  }, [acceptData]);
  useEffect(() => {
    if (rejectData) {
      showSuccess('Запит успішно відхилено');
    }
  }, [rejectData]);

  useEffect(() => {
    if (isAcceptError) {
      // @ts-ignore
      showError(acceptError?.message);
    }
  }, [isAcceptError]);
  useEffect(() => {
    if (isrejectError) {
      // @ts-ignore
      showError(rejectError?.message);
    }
  }, [isrejectError]);

  const handleAcceptInvite = (id: string) => {
    acceptInvitation(id);
  };
  const handleCancelInvite = (id: string) => {
    rejectInvitation(id);
  };
  return (
    <div className='flex flex-col'>
      <div className='w-[100%] flex flex-col justify-start items-start  gap-1 p-3 px-2'>
        {type === 'waiting' && pendingFriendsInvitations && pendingFriendsInvitations?.length > 0
          ? pendingFriendsInvitations.map((friend: any) => {
            return (
              <div key={friend.senderId._id} className='flex w-[100%] flex-row justify-between items-between
              flex items-center justify-start w-full min-h-[40px] mb-2
               hover:bg-darkGray rounded-md cursor-pointer p-2 '>
                <div className='flex w-[100%] items-center juitems-center'>
                  <div className='rounded-full w-[50px] h-[50px] bg-purple' />
                  <div className='flex flex-col items-start justify-start'>
                    <div className='ml-2'>{friend.senderId.username} </div>
                    <div className='ml-2'>{friend.senderId?.mail}</div>
                  </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-2'>
                  <div onClick={() => handleAcceptInvite(friend._id)}
                       className='flex align-center justify-center p-2 cursor-pointer bg-purple rounded-xl opacity-80    hover:opacity-100'>
                    <i className='fas fa-check' />
                  </div>
                  <div onClick={() => handleCancelInvite(friend._id)}
                       className='flex align-center justify-center p-2 cursor-pointer bg-purple rounded-xl opacity-80 hover:opacity-100 '>
                    <i className='fas fa-ban'></i>
                  </div>
                </div>
              </div>
            );
          })
          : null
        }
        {type === 'all' && friendsWithOnlineStatus && friendsWithOnlineStatus?.length > 0
          ? friendsWithOnlineStatus.map((friend: any) => {
            return (
              <div key={friend.id} className='flex w-[100%] flex-row justify-between items-between
              flex items-center justify-start w-full min-h-[40px] mb-2
               hover:bg-darkGray rounded-md cursor-pointer p-2 '>
                <div className='flex w-[100%] items-center juitems-center'>
                  <div className='rounded-full w-[50px] h-[50px] bg-purple relative'>
                    {friend.isOnline && (
                      <div
                        className='rounded-full w-[10px] h-[10px] bg-green-500 absolute bottom-0 right-0 border-2 border-white'></div>
                    )}
                  </div>
                  <div className='flex flex-col items-start justify-start'>
                    <div className='ml-2'>{friend?.username}</div>
                    <div className='ml-2'>{friend.mail}</div>
                  </div>
                </div>
                <div className='flex flex-row items-center justify-center'>
                  <div>actions</div>
                </div>
              </div>
            );
          })
          : null
        }
        {type === 'online' && checkOnlineUsers(friends, onlineUsers) && checkOnlineUsers(friends, onlineUsers)?.length > 0
          ? checkOnlineUsers(friends, onlineUsers).map((friend: any) => (
            <div key={friend.id} className='flex w-[100%] flex-row justify-between items-between
              flex items-center justify-start w-full min-h-[40px] mb-2
               hover:bg-darkGray rounded-md cursor-pointer p-2 '>
              <div className='flex w-[100%] items-center juitems-center'>
                <div className='rounded-full w-[50px] h-[50px] bg-purple relative'>
                  <div
                    className='rounded-full w-[10px] h-[10px] bg-green-500 absolute bottom-0 right-0 border-2 border-white'></div>
                </div>
                <div className='flex flex-col items-center justify-start'>
                  <div className='ml-2'>{friend.username}</div>
                  <div className='ml-2'>{friend?.status}</div>
                </div>
              </div>
              <div className='flex flex-row items-center justify-center'>
                <div>actions</div>
              </div>
            </div>
          ))
          : null
        }
      </div>
    </div>
  );
}

