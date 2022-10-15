import { useActions } from 'app/hooks/actions';
import { useToast } from 'app/hooks/use-toast';
import { useAppSelector } from '../../../../app/hooks/redux';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { IMessage } from '../../../../types/models';

const AddMessagechema = Yup.object().shape({
  text: Yup.string().required('Поле не може бути пустим'),
});


export const ChatView = () => {
  const { logout } = useActions();
  const { showSuccess } = useToast();
  const { chat } = useAppSelector(state => state);
  const [messages, setMessages] = useState<IMessage[] | []>([]);

  // scroll to last message on mount
  useEffect(() => {
    const lastMessage = document.querySelector('#message:last-child');
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  }, [messages]);
  const logoutHandler = () => {
    logout();
    showSuccess('Ви успішно вийшли з системи');
  };

  return (
    <div className='w-[100%] h-[100%] flex flex-col justify-start items-center relative  overflow-y-hidden'>
      <div className='w-[100%] flex justify-start items-start  h-[50px] bg-[#2f364f] px-2'>
        <div className='w-[100%] bg-transparent flex justify-start items-center'>
          <div
            className='w-[100%] bg-transparent flex justify-between items-center'
          >
            <div
              className='
            h-[35px] flex-1 justify-center items-center text-gray flex gap-[50px]
            px-[20px]
            shadow-xl
             '>
              button
            </div>
          </div>
        </div>
        <button
          onClick={logoutHandler}
        >
          <span className='ml-2'> Вийти </span>
        </button>
      </div>
      <div
        className='flex flex-col w-[100%] h-[100%] justify-start items-start animate__animated animate__fadeInUp '>
        <div className='bg-darkGray  w-[100%] p-[20px] '>
          <div className='w-[100%]  flex flex-col justify-start items-start gap-2'>
            <div className='w-[100%]  flex flex-col justify-start items-start'>
              <div className='rounded-full w-[60px] h-[60px] bg-purple relative'>
                {/* TODO add online indicator*/}
                {/*<div*/}
                {/*  className='rounded-full w-[10px] h-[10px] bg-green-500 absolute bottom-0 right-0 border-2 border-white'></div>*/}
              </div>
            </div>
            <div className='w-[100%] h-[100%] flex flex-col justify-start items-start text-2xl'>
              <h2>{chat?.chosenChatDetails?.name ?? ''} <span>({chat?.chosenChatDetails?.mail})</span></h2>
            </div>
            <div className='w-[100%] h-[100%] flex flex-col justify-start items-start'>
              <div className='mb-2'>
                Це початок вашого перепису з <b>@{chat?.chosenChatDetails?.name ?? ''}</b>
              </div>
              <div className='flex flex-row items-center justify-center gap-3'>
                <div
                  className='flex align-center justify-center p-2 cursor-pointer bg-purple rounded-xl opacity-80 flex justify-center items-center gap-2 hover:opacity-100'>
                  Видалити з друзів <i className='fas fa-check' />
                </div>
                <div
                  className='flex align-center justify-center p-2 cursor-pointer bg-purple rounded-xl opacity-80 flex justify-center items-center gap-2 hover:opacity-100 '>
                  Заблокувати <i className='fas fa-ban'></i>
                </div>
              </div>
            </div>
          </div>
          {/* Messages Container */}
        </div>
        <div className='w-[100%] h-[calc(100%_-_22rem)] flex flex-col justify-start items-start gap-2 overflow-y-scroll mb-100px px-2 '>
          {messages.map((message, index) => (
            <div key={index} className='w-[100%] flex flex-col justify-start items-start gap-2 ' id='message'>
              {message.senderId === chat?.chosenChatDetails?.id ? (
                <div className='w-[100%] flex flex-row justify-start items-start gap-2'>
                  <span className='text-gray-500'>{message.content}</span>
                </div>
              ) : (
                <div className='w-[100%] flex flex-row justify-end items-end gap-2'>
                  <span className='text-gray-500 bg-[#3e364f] rounded-xl p-2 ' >{message.content}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className=' w-[100%] absolute bottom-0 left-0  gap-2'>
        <Formik
          initialValues={{
            text: '',
          }}
          validationSchema={AddMessagechema}
          onSubmit={(values, { setSubmitting, setValues }) => {
            console.log('values', values);
            setMessages([...messages,
              {
                id: `${messages.length + 1}`,
                senderId: '1',
                chatId: '1',
                content: values.text,
                createdAt: new Date(),
              } as unknown as IMessage,
            ]);
            setValues({ text: '' });
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
              <Form className='h-[60px]'>
                <div className='h-[100%] flex-1 flex flex-col bg-[#333c5a]'>
                  <div className='w-[100%] flex flex-col justify-start items-start'>
                    <Field
                      name='text'
                      className=' w-[100%] border-none text-white outline-none rounded-sm px-2 h-[60px] bg-[#1d1e20]' />
                  </div>
                </div>
              </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};