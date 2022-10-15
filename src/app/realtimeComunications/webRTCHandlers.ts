import { store } from '../store';
import { roomActions } from '../store/room/room.slice';
import Peer from 'simple-peer';
import * as socketConnection from './socketConnection';

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  audio: true,
  video: true,
};

export const getLocalStreamPreview = (onlyAudio: boolean = false, callbackFunc: Function) => {
  const constrains = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constrains)
    .then(stream => {
      store.dispatch(roomActions.setLocalStream(stream));
      callbackFunc(stream);
    })
    .catch(err => {
      console.log('error', err);
      throw err;
    });
};

let peers: any = {};

function getConfigurations() {
  const turnIceServer = null;

  if (turnIceServer) {
    return {
      iceServers: [
        {
          urls: turnIceServer,
          username: 'user',
          credential: 'password',
        },
      ],
    };
  } else {
    return {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };
  }
}

export const prepareNewPeerConnection = ({ connUserSocketId }: any, isInitiator: boolean) => {
  const localStream = store.getState().room.localStream;

  if (isInitiator) {
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfigurations(),
    stream: localStream as never,
  });

  peers[connUserSocketId].on('signal', (data: any) => {
    const signalData = {
      signal: data,
      connUserSocketId,
    };
    socketConnection.signalPeerData(signalData);
  });

  peers[connUserSocketId].on('stream', (remoteStream: any) => {
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = (data: any) => {
  const { signal, connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

export const addNewRemoteStream = (remoteStream: any) => {
  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = [...remoteStreams, remoteStream];
  store.dispatch(roomActions.setRemoteStreams(newRemoteStreams));
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach(([key, peer]: any) => {
    peer.destroy();
    delete peers[key];
  });
};

export const handleRoomParticipantsLeft = (data: any) => {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = remoteStreams.filter(
    (stream: any) => stream.connUserSocketId !== connUserSocketId,
  );
  store.dispatch(roomActions.setRemoteStreams(newRemoteStreams));
};

export const switchOutgoingTracks = (stream: any) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0],
          );
          break;
        }
      }
    }
  }
};
