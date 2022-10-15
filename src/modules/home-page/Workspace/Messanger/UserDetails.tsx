import { useAppSelector } from '../../../../app/hooks/redux';

interface IUserDetails {
  name: string;
  mail: string;
}

export const UserDetails = ({ mail, name }: IUserDetails) => {
  return (
    <div className="w-[100%]  flex flex-col justify-start items-start gap-2">
      <div className="w-[100%]  flex flex-col justify-start items-start">
        <div className="rounded-full w-[60px] h-[60px] bg-purple relative">
          {/* TODO add online indicator*/}
          {/*<div*/}
          {/*  className='rounded-full w-[10px] h-[10px] bg-green-500 absolute bottom-0 right-0 border-2 border-white'></div>*/}
        </div>
      </div>
      <div className="w-[100%] h-[100%] flex flex-col justify-start items-start text-2xl">
        <h2>
          {name ?? ''} <span>({mail})</span>
        </h2>
      </div>
      <div className="w-[100%] h-[100%] flex flex-col justify-start items-start">
        <div className="mb-2">
          Це початок вашого перепису з <b>@{name ?? ''}</b>
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="flex align-center justify-center p-2 cursor-pointer bg-purple rounded-xl opacity-80 flex justify-center items-center gap-2 hover:opacity-100">
            Видалити з друзів <i className="fas fa-check" />
          </div>
          <div className="flex align-center justify-center p-2 cursor-pointer bg-purple rounded-xl opacity-80 flex justify-center items-center gap-2 hover:opacity-100 ">
            Заблокувати <i className="fas fa-ban"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
