import React, { useEffect, useState } from 'react';
import { BsFillCameraVideoOffFill } from 'react-icons/bs';
import { BsFillCameraVideoFill } from '@react-icons/all-files/bs/BsFillCameraVideoFill';
import { CiMicrophoneOff, CiMicrophoneOn } from 'react-icons/ci';
import { TfiClose } from 'react-icons/tfi';
import { GiResize } from '@react-icons/all-files/gi/GiResize';
import { TbResize } from 'react-icons/tb';
import { MdScreenShare } from '@react-icons/all-files/md/MdScreenShare';
import { MdStopScreenShare } from '@react-icons/all-files/md/MdStopScreenShare';
import { leaveRoom } from '../../../app/realtimeComunications/roomHandler';
import { useAppSelector } from '../../../app/hooks/redux';
import { useActions } from '../../../app/hooks/actions';
import { switchOutgoingTracks } from '../../../app/realtimeComunications/webRTCHandlers';

interface IRoomsButtons {
  toggleShareButton: () => void;
  isShareOn: boolean;
  isMicroOn: boolean;
  toggleMicroButton: () => void;
  handleMinimizeRoom: () => void;
  isCameraOn: boolean;
  isRoomMinimized: boolean;
  toggleCameraButton: () => void;
}

function RoomsButtons({
  toggleShareButton,
  isShareOn,
  isMicroOn,
  toggleMicroButton,
  isRoomMinimized,
  isCameraOn,
  handleMinimizeRoom,
  toggleCameraButton,
}: IRoomsButtons) {
  const { isUserJoinedWithOnlyAudio } = useAppSelector(state => state.room);

  const handleCloseRoom = () => {
    leaveRoom();
  };

  return (
    <div className="w-[100%] flex items-center gap-[20px] items-between justify-between">
      <div className="flex items-center gap-[10px]"></div>

      <div className="flex items-center ">
        {!isUserJoinedWithOnlyAudio && (
          <button
            className="hover:bg-purple w-[40px] rounded-2xl flex items-center justify-center"
            onClick={toggleShareButton}
          >
            {isShareOn ? <MdStopScreenShare /> : <MdScreenShare />}
          </button>
        )}
        {!isUserJoinedWithOnlyAudio && (
          <button
            className="hover:bg-purple w-[40px] rounded-2xl flex items-center justify-center"
            onClick={toggleCameraButton}
          >
            {isCameraOn ? <BsFillCameraVideoOffFill /> : <BsFillCameraVideoFill />}
          </button>
        )}
        <button
          className="hover:bg-purple w-[40px] rounded-2xl flex items-center justify-center"
          onClick={toggleMicroButton}
        >
          {isMicroOn ? <CiMicrophoneOff /> : <CiMicrophoneOn />}
        </button>
        <button
          className="hover:bg-purple w-[40px] rounded-2xl flex items-center justify-center"
          onClick={handleCloseRoom}
        >
          <TfiClose />
        </button>
      </div>

      <div className="flex items-center gap-[10px]">
        <button onClick={handleMinimizeRoom}>
          {isRoomMinimized ? <GiResize /> : <TbResize />}
        </button>
      </div>
    </div>
  );
}

function Video({ stream, isLocalStream }: any) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
      };
    }
  }, [stream]);
  return (
    <div className="w-[50%]">
      <video ref={videoRef} autoPlay muted={isLocalStream} />
    </div>
  );
}

function VideoContainer() {
  const { localStream, remoteStreams, screenSharingStream } = useAppSelector(state => state.room);

  return (
    <div className="flex justify-between items-center flex-wrap px-4 py-2 flex-1  border-xl bg-black ">
      <Video stream={screenSharingStream ? screenSharingStream : localStream} isLocalStream />
      {remoteStreams.map((stream: any) => (
        <Video key={stream.id} stream={stream} />
      ))}
    </div>
  );
}

const constraints = {
  audio: false,
  video: true,
};
const Room = () => {
  const { localStream, isScreenSharingActive, screenSharingStream } = useAppSelector(
    state => state.room,
  );
  const { setScreenSharingStream } = useActions();

  const [isRoomMinimized, setIsRoomMinimized] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicroOn, setIsMicroOn] = useState(false);

  const toggleShareButton = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.error('Error: ' + err);
        console.error('Ocured while trying to share screen');
      }
      if (stream) {
        setScreenSharingStream({ stream: stream });
        switchOutgoingTracks(stream);
      }
    } else {
      switchOutgoingTracks(localStream);
      // @ts-ignore
      screenSharingStream.getTracks().forEach((track: any) => {
        track.stop();
      });
      setScreenSharingStream({ stream: null });
    }
  };

  const handleMinimizeRoom = () => {
    setIsRoomMinimized(prevState => !prevState);
  };

  const toggleCameraButton = () => {
    setIsCameraOn(prevState => {
      if (localStream) {
        // @ts-ignore
        localStream.getVideoTracks()[0].enabled = !prevState;
      }
      return !prevState;
    });
  };

  const toggleMicroButton = () => {
    setIsMicroOn(prevState => {
      if (localStream) {
        // @ts-ignore
        localStream.getAudioTracks()[0].enabled = !prevState;
      }
      return !prevState;
    });
  };

  return (
    <div
      className={`zIndex-[300]   bg-[#2f364f] flex flex-col h-[100%] shadow-2xl rounded-2xl
      ${
        isRoomMinimized
          ? 'absolute bottom-0 right-0 w-[500px] h-[500px]'
          : 'absolute bottom-0 right-0 left-0 top-0 w-full h-full'
      }
       `}
    >
      <div className="flex justify-between items-center px-4 py-2 flex-0">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#2f364f] rounded-full mr-2"></div>
          <div className="text-white">Room name</div>
        </div>
      </div>
      {/* RoomView */}
      <VideoContainer />
      {/* RoomActions */}
      <div className="flex py-2 bg-black border-t-[1px] border-gray  px-4 py-2 items-center justify-end flex-0">
        <RoomsButtons
          toggleShareButton={toggleShareButton}
          isShareOn={isScreenSharingActive}
          isMicroOn={isMicroOn}
          toggleMicroButton={toggleMicroButton}
          handleMinimizeRoom={handleMinimizeRoom}
          isCameraOn={isCameraOn}
          isRoomMinimized={isRoomMinimized}
          toggleCameraButton={toggleCameraButton}
        />
      </div>
    </div>
  );
};

export default Room;
