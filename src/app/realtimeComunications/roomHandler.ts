import { roomActions } from 'app/store/room/room.slice';
import { store } from '../store';
import { createNewRoom, joinRoomHandler, leaveRoomHandler } from './socketConnection';
import * as webRTCHandlers from './webRTCHandlers';

export const createNewRoomHandler = () => {
  const successCallback = () => {
    store.dispatch(roomActions.setOpenRoom({ isUserInRoom: true, isUserRoomCreator: true }));
    const onlyAudio = store.getState().room.audioOnly;
    store.dispatch(roomActions.setUserJoinedWithOnlyAudio(onlyAudio));
    createNewRoom();
  };

  const onlyAudio = store.getState().room.audioOnly;
  webRTCHandlers.getLocalStreamPreview(onlyAudio, successCallback);
};

export const newRoomCreated = (data: any) => {
  const { roomDetails } = data;
  store.dispatch(roomActions.setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data: any) => {
  const { activeRooms } = data;
  const friends = store.getState().friends.friends;

  // @ts-ignore
  const userId = store.getState().auth.user._id;

  const rooms: any = [];
  activeRooms.forEach((room: any) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      rooms.push({ ...room, creatorUsername: 'Me' });
    } else {
      friends.forEach((friend: any) => {
        if (friend.id === room.roomCreator.userId) {
          rooms.push({
            ...room,
            creatorUsername: friend.username,
          });
        }
      });
    }
  });

  store.dispatch(roomActions.setActiveRooms(rooms));
};

export const joinRoom = (roomId: string) => {
  const successCallback = () => {
    store.dispatch(roomActions.setRoomDetails({ roomId }));
    store.dispatch(roomActions.setOpenRoom({ isUserInRoom: true, isUserRoomCreator: false }));
    const onlyAudio = store.getState().room.audioOnly;
    store.dispatch(roomActions.setUserJoinedWithOnlyAudio(onlyAudio));
    joinRoomHandler({ roomId });
  };

  const onlyAudio = store.getState().room.audioOnly;
  webRTCHandlers.getLocalStreamPreview(onlyAudio, successCallback);
};

export const leaveRoom = () => {
  // @ts-ignore
  const roomId = store?.getState()?.room.roomDetails.roomId;
  const localStream = store.getState().room.localStream;
  if (localStream) {
    // @ts-ignore
    localStream?.getTracks().forEach((track: any) => {
      track.stop();
    });
    store.dispatch(roomActions.setLocalStream(null));
  }
  const screenSharingStream = store.getState().room.screenSharingStream;

  if (screenSharingStream) {
    // @ts-ignore
    localStream?.getTracks().forEach((track: any) => {
      track.stop();
    });
    store.dispatch(roomActions.setScreenSharingStream(null));
  }
  store.dispatch(roomActions.setLocalStream([]));
  webRTCHandlers.closeAllConnections();

  leaveRoomHandler({ roomId });
  store.dispatch(roomActions.setOpenRoom({ isUserInRoom: false, isUserRoomCreator: false }));
  store.dispatch(roomActions.setRoomDetails(null));
};
