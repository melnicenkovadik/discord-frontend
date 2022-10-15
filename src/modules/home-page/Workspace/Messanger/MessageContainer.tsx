import { IMessage } from '../../../../types/models';
import { UserDetails } from './UserDetails';
import { useAppSelector } from '../../../../app/hooks/redux';
import { Avatar } from '@material-tailwind/react';
import { ActionsBar } from './ActionsBar';
import { useEffect, useRef } from 'react';

export const MessageContainer = () => {
  const { messages, chosenChatDetails } = useAppSelector(state => state.chat);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // scroll to last message on update messages
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current?.scrollIntoView();
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-col w-[100%] h-[100%] justify-start  ">
        <ActionsBar />
        <div className="w-[100%] h-[calc(100%_-_150px)] flex flex-col justify-start items-start gap-2 overflow-y-scroll mb-100px px-2 ">
          <UserDetails name={chosenChatDetails?.name ?? ''} mail={chosenChatDetails?.mail ?? ''} />
          {messages.map((message, index) => (
            <Message lastMessageRef={lastMessageRef} message={message} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

const Message = ({
  lastMessageRef,
  message,
  index,
}: {
  lastMessageRef: any;
  message: IMessage;
  index: number;
}) => {
  const {
    sameAuthor,
    sameDay,
    content,
    date,
    author: { _id, username },
  } = message;
  const { user } = useAppSelector(state => state.auth);

  return (
    <div
      key={index}
      ref={lastMessageRef}
      className="w-[100%] flex flex-col justify-start items-start gap-2 "
      id="message"
    >
      {user?._id === _id ? (
        <div className="w-[100%] flex flex-row justify-start items-start gap-2">
          <Avatar
            className="rounded-full min-w-[30px] max-w-[30px] w-[30px] min-h-[30px] max-h-[30px] h-[30px] bg-lightPurple"
            src="https://secure.gravatar.com/avatar/a03cc71aa32c638fc6f0ab17465a57fd?s=64&d=mm&r=g"
            alt={username.charAt(0).toUpperCase()}
            variant="circular"
          />
          <div>
            <div className="">
              <span>{username} &nbsp;</span>
              <span className="text-gray">{`${new Date(date).getDate()}/${new Date(
                date,
              ).getMonth()}/${new Date(date).getMonth()} `}</span>
            </div>
            <div className=" max-w-[90%] bg-lightPurple rounded-xl p-2  break-all	break-words	">
              {content}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100%] flex flex-row justify-end items-start gap-2">
          <div>
            <div className="flex flex-row justify-end items-start ">
              <span className="text-gray">{`${new Date(date).getDate()}/${new Date(
                date,
              ).getMonth()}/${new Date(date).getMonth()} `}</span>
              <span>&nbsp;{username} </span>
            </div>
            <div className="ml-auto max-w-[90%] bg-[#3e364f] rounded-xl p-2 break-all	break-words	 ">
              {content}
            </div>
          </div>
          <Avatar
            className="rounded-full min-w-[30px] max-w-[30px] w-[30px] min-h-[30px] max-h-[30px] h-[30px] bg-lightPurple"
            src="https://secure.gravatar.com/avatar/a03cc71aa32c638fc6f0ab17465a57fd?s=64&d=mm&r=g"
            alt={username.charAt(0).toUpperCase()}
            variant="circular"
          />
        </div>
      )}
    </div>
  );
};
