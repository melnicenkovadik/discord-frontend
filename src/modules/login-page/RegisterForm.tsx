import { Field, Form, Formik } from 'formik';
import { useToast } from 'app/hooks/use-toast';
import { MouseEvent, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useLazyRegisterQuery } from 'app/store/auth/auth.api';

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обовязкове поле')
    .min(3, 'Мало символів, думай ще =)')
    .max(30, 'Не може бути більше 30 символів'),
  mail: Yup.string().email('Невірний формат емейлу').required('Обовязкове поле'),
  password: Yup.string()
    .required('Обовязкове поле')
    .min(6, 'Мало символів, згадуй далі =)')
    .max(30, 'Це передоз, пароль не може бути більше 60 символів'),
});

interface IRegisterForm {}

export const RegisterForm = ({}: IRegisterForm) => {
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const [
    register,
    { isLoading: isLoadingUser, isError: isRegisterError, data: userData, error: registerError },
  ] = useLazyRegisterQuery();

  useEffect(() => {
    if (userData) {
      showSuccess(`${userData.username} ви успішно зареєструвались`);
      navigate('/auth/login');
    }
    if (isRegisterError) {
      // @ts-ignore
      showError(registerError?.data?.message);
    }
  }, [userData]);

  async function registerUser(mail: string, password: string, username: string) {
    register({ mail, password, username });
  }

  function onSpanClick(event: MouseEvent<HTMLSpanElement>) {
    event.persist();
    navigate('/auth/login');
  }

  return (
    <>
      <div
        className="animate__animated animate__flipInX  p-[32px] w-[480px] flex flex-col
         items-center justify-center gap-[8px]
          shadow-[0 2px 10px 0hsla(0,calc(1, 1*0%),0%,.2)] shadow-xl
          bg-[#37393e] rounded transform-[scale(1) translateY(0px) translateZ(0px)]
          "
      >
        <h1 className="text-white font-bold  text-[24px]">Створити акаунт</h1>
        <Formik
          initialValues={{
            mail: '',
            password: '',
            username: '',
          }}
          validationSchema={SigninSchema}
          onSubmit={values => {
            const { mail, password, username } = values;
            registerUser(mail, password, username);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col items-center justify-center w-[100%]">
              <div className="flex flex-col gap-[8px] w-[100%]">
                <div className="font-[500]">
                  {errors.username && touched.username ? (
                    <div className="text-error">
                      <label htmlFor="username">Нікнейм користувача</label> -
                      <span className="text-[12px] italic">{errors.username}</span>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="username">Нікнейм користувача</label>
                    </div>
                  )}
                </div>

                <Field
                  className="border-none outline-none rounded-sm px-2 h-10  bg-solidGray "
                  name="username"
                  autoComplete="off"
                  type="text"
                />

                <div className="font-[500]">
                  {errors.mail && touched.mail ? (
                    <div className="text-error">
                      <label htmlFor="mail">Електронна пошта</label> -
                      <span className="text-[12px] italic">{errors.mail}</span>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="mail">Електронна пошта</label>
                    </div>
                  )}
                </div>

                <Field
                  className="border-none outline-none rounded-sm px-2 h-10  bg-solidGray "
                  name="mail"
                  type="email"
                />

                <div className="font-[500] ">
                  {errors.password && touched.password ? (
                    <div className="text-error">
                      <label htmlFor="password">Пароль</label> -
                      <span className="text-[12px] italic">{errors.password}</span>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="password">Пароль</label>
                    </div>
                  )}
                </div>
                <Field
                  className="border-none outline-none rounded-sm px-2 h-10 bg-[#1d1e20]"
                  name="password"
                  type="password"
                />

                <div className="text-[12px] m-[4px 0px 20px]">
                  Забув свій пароль? <span className="text-[12px]">(ну тоді іди на**й)</span>
                </div>
                <button
                  className="bg-lightPurple mt-[8px] h-10 rounded-sm hover:bg-opacity-90 transition-colors text-white"
                  type="submit"
                >
                  {isLoadingUser ? 'Зачекайте...' : 'Створити акаунт'}
                </button>

                <div className="text-[12px] m-[4px 0px 20px]">
                  <span
                    className="text-[12px] text-lightBlue hover:underline cursor-pointer "
                    onClick={onSpanClick}
                  >
                    Вже маєш аккаунт?
                  </span>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
