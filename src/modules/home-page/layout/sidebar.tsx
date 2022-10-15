import { MouseEvent } from 'react';
import {
  createNewRoomHandler,
  joinRoom,
  leaveRoom,
} from '../../../app/realtimeComunications/roomHandler';
import { GrAdd } from '@react-icons/all-files/gr/GrAdd';
import { useAppSelector } from '../../../app/hooks/redux';
import { Tooltip } from '@material-tailwind/react';

const Sidebar = () => {
  const { activeRooms, isUserInRoom } = useAppSelector(state => state.room);

  function createNewRoom(event: MouseEvent<HTMLButtonElement>) {
    createNewRoomHandler();
  }

  return (
    <div className="flex flex-col w-68 h-screen bg-gray-800 pt-2 px-3 ">
      <div className="flex flex-col justify-between flex-1 pt-2 py-2">
        <div className="flex flex-col items-center justify-end pb-6">
          <button
            className={`flex items-center justify-center w-12 h-12 mb-2
                        text-gray-500 transition-colors duration-150 bg-white
                         hover:text-gray-700 hover:bg-gray-100 focus:outline-none
                          transition-transform transform hover:scale-110
                           animate__animated   animate__fadeInLeft
                        rounded-lg  hover:bg-gray-100`}
          ></button>
          <div className="h-1 rounded-xl w-[100%] bg-black mb-2 opacity-20" />
          <button
            disabled={isUserInRoom}
            className={`flex items-center justify-center w-12 h-12 mb-2
                        text-gray-500 transition-colors duration-150 bg-gray
                         hover:text-gray-700 hover:bg-gray focus:outline-none
                          transition-transform transform hover:scale-110
                           animate__animated animate__flipInX 
                          rounded-full   hover:bg-gray-100`}
            onClick={createNewRoom}
          >
            <GrAdd />
          </button>
          {activeRooms.map((room: any) => {
            return (
              <ActiveRoomsButton
                key={room.id}
                creatorUsername={room.creatorUsername}
                roomId={room.roomId}
                amountOfParticipants={room.participants?.length}
                isUserInRoom={isUserInRoom}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface IActiveRoomsButton {
  creatorUsername: string;
  roomId: string;
  amountOfParticipants: number;
  isUserInRoom: boolean;
}

const ActiveRoomsButton = ({
  creatorUsername,
  roomId,
  amountOfParticipants,
  isUserInRoom,
}: IActiveRoomsButton) => {
  const activeRoomButtonDisabled = amountOfParticipants > 3;
  const roomTitle = (
    <div className="flex flex-col items-start justify-start">
      Створив(ла) : {creatorUsername}
      <div className="flex flex-row items-center justify-center">
        Учасників : {amountOfParticipants}
      </div>
    </div>
  );

  function handleJoinActiveRoom(event: MouseEvent<HTMLButtonElement>) {
    if (isUserInRoom) {
      leaveRoom();
    } else {
      if (amountOfParticipants < 4) {
        joinRoom(roomId);
      }
    }
  }

  return (
    <div key={roomId} className="flex flex-col ">
      <Tooltip content={roomTitle}>
        <button
          className={`flex items-center justify-center w-12 h-12 mb-2
          ${isUserInRoom ? 'border-2 border-green animate__animated animate__pulse ' : ''}
                        text-gray-500 transition-colors duration-150  bg-gray opacity-80
                        scale-110 transition-shadow shadow-lg hover:text-gray-700 hover:bg-gray-100 focus:outline-none 
                        transition-transform transform hover:scale-110
                        hover:opacity-100 hover:transform hover:scale-75
                        focus:outline-none transition-transform transform
                        hover:animate__animated  hover:animate__headShake
                        cursor-pointer
                          shadow-2xl hover:scale-110
                           animate__animated  animate__flipInX
                      rounded-full hover:rounded-lg `}
          onClick={handleJoinActiveRoom}
        >
          <span
            className={`${
              isUserInRoom
                ? 'transition duration-[100ms] animate__animated animate__heartBeat '
                : ''
            }`}
          >
            {creatorUsername.charAt(0)}
          </span>
        </button>
      </Tooltip>
    </div>
  );
};

export default Sidebar;
