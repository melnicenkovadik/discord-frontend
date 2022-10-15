import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from '../../../../app/hooks/redux';
import {
  getDirectChatHistory,
  sendDirectMessage,
} from '../../../../app/realtimeComunications/socketConnection';
import { useEffect } from 'react';

const AddMessageSchema = Yup.object().shape({
  text: Yup.string().required('Поле не може бути пустим'),
});

export const MessageInput = () => {
  const { user } = useAppSelector(state => state.auth);
  const { chosenChatDetails } = useAppSelector(state => state.chat);
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails?.id,
    });
  }, [chosenChatDetails]);

  return (
    <>
      <div className=" w-[100%] absolute bottom-0 left-0  gap-2">
        <Formik
          initialValues={{
            text: '',
          }}
          validationSchema={AddMessageSchema}
          onSubmit={(values, { setSubmitting, setValues }) => {
            sendDirectMessage({
              receiverUserId: chosenChatDetails?.id,
              content: values.text,
            });
            setValues({ text: '' });
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className="h-[60px]">
              <div className="h-[100%] flex-1 flex flex-col bg-[#333c5a]">
                <div className="w-[100%] flex flex-col justify-start items-start">
                  <Field
                    name="text"
                    className=" w-[100%] border-none text-white outline-none rounded-sm px-2 h-[60px] bg-[#1d1e20]"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
