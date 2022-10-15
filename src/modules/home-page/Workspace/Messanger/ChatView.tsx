import { useEffect } from 'react';
import { MessageContainer } from './MessageContainer';
import { MessageInput } from './MessageInput';
import { useAppSelector } from '../../../../app/hooks/redux';

export const ChatView = () => {
  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-start  relative  overflow-hidden">
      <MessageContainer />
      <MessageInput />
    </div>
  );
};
