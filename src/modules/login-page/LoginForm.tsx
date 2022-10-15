import { Field, Form, Formik } from 'formik';
import { useToast } from 'app/hooks/use-toast';
import { MouseEvent, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useLazyLoginQuery } from 'app/store/auth/auth.api';
import { useActions } from 'app/hooks/actions';

const SignupSchema = Yup.object().shape({
  mail: Yup.string().email('Невірний формат емейлу').required('Обовязкове поле'),
  password: Yup.string()
    .required('Обовязкове поле')
    .min(6, 'Мало символів, згадуй далі =)')
    .max(60, 'Це передоз, пароль не може бути більше 60 символів'),
});

interface ILoginForm {}

export const LoginForm = ({}: ILoginForm) => {
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const [
    login,
    { isLoading: isLoadingUser, isError: isLoginError, data: userData, error: loginError },
  ] = useLazyLoginQuery();
  const { setAuthUser } = useActions();

  useEffect(() => {
    if (userData) {
      showSuccess(`${userData.username} ви успішно залогінились`);
      setAuthUser(userData);
      navigate('/');
    }
    if (isLoginError) {
      // @ts-ignore
      showError(loginError?.data?.message as string);
    }
  }, [userData]);

  function loginUser(mail: string, password: string) {
    login({ mail, password });
  }

  function onSpanClick(event: MouseEvent<HTMLSpanElement>) {
    event.persist();
    navigate('/auth/register');
  }

  return (
    <div
      className="animate__animated animate__flipInX  p-[32px] w-[480px] flex flex-col
         items-center justify-center gap-[8px]
          shadow-[0 2px 10px 0hsla(0,calc(1, 1*0%),0%,.2)] shadow-xl
          bg-[#37393e] rounded transform-[scale(1) translateY(0px) translateZ(0px)]
          "
    >
      <h1 className="text-white font-bold  text-[24px]">З поверненням!</h1>
      <div>
        <p className="text-[16px] ">Ми дійсно раді бачити тебе знову!</p>
      </div>
      <Formik
        initialValues={{
          mail: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          const { mail, password } = values;
          loginUser(mail, password);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col items-center justify-center w-[100%]">
            <div className="flex flex-col gap-[8px] w-[100%]">
              <div className="font-[500]">
                {errors.mail && touched.mail ? (
                  <div className="text-error">
                    <label htmlFor="mail">Адреса електронної пошти або номер телефону</label> -
                    <span className="text-[12px] italic">{errors.mail}</span>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="mail">Адреса електронної пошти або номер телефону</label>
                  </div>
                )}
              </div>

              <Field
                className="border-none outline-none rounded-sm px-2 h-10  bg-solidGray "
                name="mail"
                type="email"
              />

              <div className="font-[500]">
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
                className="bg-lightPurple mt-[8px] h-10 rounded-sm hover:bg-opacity-90 transition-colors text-white "
                type="submit"
              >
                {isLoadingUser && <div>Завантаження...</div>}
                {!isLoadingUser && 'Увійти'}
              </button>
              <div className="text-[12px] m-[4px 0px 20px]">
                Потрібен аккаунт?&nbsp;
                <span
                  className="text-[12px] text-lightBlue hover:underline cursor-pointer "
                  onClick={onSpanClick}
                >
                  Зареєструватися
                </span>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
