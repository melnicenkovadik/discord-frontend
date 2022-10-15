import { useToast } from '../../../../app/hooks/use-toast';
import { Field, Form, Formik } from 'formik';
import { Typography } from '@material-tailwind/react';
import noFriends from '../../../../app/img/no-friends.svg';
import * as Yup from 'yup';
import { useLazySendFriendInvitationQuery } from 'app/store/friends/friends.api';
import { useEffect } from 'react';

const AddFriendSchema = Yup.object().shape({
  mail: Yup.string().email('Невірний формат емейлу'),
});

export default function AddFriend() {
  const { showSuccess, showError } = useToast();
  const [inviteFriend, { isLoading, isError: isSendInviteError, data, error: inviteError }] =
    useLazySendFriendInvitationQuery();

  // @ts-ignore
  useEffect(() => {
    if (!isLoading && data) {
      showSuccess('Запит дружби відправлено');
    }

    if (inviteError) {
      // @ts-ignore
      showError(inviteError?.data?.message as string);
    }
  }, [data, isSendInviteError, inviteError]);

  const sendInviteHandler = (mail: string) => {
    inviteFriend(mail);
  };

  return (
    <>
      <Formik
        initialValues={{
          mail: '',
        }}
        validationSchema={AddFriendSchema}
        onSubmit={async values => {
          const { mail } = values;
          await sendInviteHandler(mail);
        }}
      >
        {({ errors, touched }) => (
          <>
            <Form>
              <div className="h-[100%] flex-1 flex flex-col bg-[#333c5a]">
                <div className="w-[100%] flex flex-col justify-start items-start">
                  <Typography className="text-white mb-3" variant="h6">
                    Додати в друзі
                  </Typography>
                  <Typography className="text-gray mb-3" variant="small">
                    Ви можете додати друга по Email
                  </Typography>

                  <div className="w-[70%] flex gap-2 border-none">
                    <Field
                      name="mail"
                      className=" w-[70%] border-none text-white outline-none rounded-sm px-2 h-10 bg-[#1d1e20]"
                    />
                    <button
                      type="submit"
                      className="bg-purple font-bold  text-white shadow-none flex w-[30%] flex items-center justify-center  whitespace-nowrap"
                    >
                      Відправити запит
                    </button>
                  </div>

                  <div className="font-[500]">
                    {errors.mail && touched.mail ? (
                      <div className="text-error">
                        <span className="text-[12px] italic">{errors.mail}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>

      <hr className="w-[100%] h-[1px] bg-darkGray border-none  shadow my-20" />
      <div className="flex flex-col items-center justify-center gap-[8px] w-[100%]">
        <img src={noFriends} />
        <Typography className="text-gray mb-3" variant="small">
          Вампус чекає на друзів. Але вам не обов'язково йому уподібнюватися!{' '}
        </Typography>
      </div>
    </>
  );
}
