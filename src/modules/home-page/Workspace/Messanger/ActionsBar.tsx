import { useActions } from '../../../../app/hooks/actions';
import { useToast } from '../../../../app/hooks/use-toast';

export const ActionsBar = () => {
  const { logout } = useActions();
  const { showSuccess } = useToast();

  const logoutHandler = () => {
    logout();
    showSuccess('Ви успішно вийшли з системи');
  };

  return (
    <>
      <div className="w-[100%] flex justify-start items-start  h-[50px] bg-[#2f364f] px-2 items-start animate__animated animate__flipInX">
        <div className="w-[100%] bg-transparent flex justify-start items-center">
          <div className="w-[100%] bg-transparent flex justify-between items-center">
            <div
              className="
            h-[35px] flex-1 justify-center items-center text-gray flex gap-[50px]
            px-[20px]
            shadow-xl
             "
            >
              button
            </div>
          </div>
        </div>
        <button onClick={logoutHandler}>
          <span className="ml-2"> Вийти </span>
        </button>
      </div>
    </>
  );
};
