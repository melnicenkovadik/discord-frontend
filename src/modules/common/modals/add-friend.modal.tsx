import React from 'react';
import { useModalContext } from '../../../app/context/modals.context';

const Modal = () => {
  const { toggleModal, modal } = useModalContext();

  return (
    <div
      className={`absolute w-[100%] h-[100%] top-0 left-0 
      z-3 bg-black bg-opacity-30 flex justify-center items-center
     show-modal transition duration-400 ${
        modal ? 'flex' : 'hidden'
      }`}
    >
      <div className='animate__animated  animate__fadeInUp  min-w-[400px]
      min-h-[300px] bg-[#333c5a]
       bg-white rounded-xl overflow-hidden shadow-lg w-80 h-40'>
        <div className='flex justify-between items-center p-4 bg-lightPurple'>
          <h3 className='text-black'>Modal Heading</h3>
          <button className='text-black' onClick={toggleModal}>
            x
          </button>
        </div>
        <p className='p-4 text-black '>Some content...</p>
      </div>
    </div>
  );
};

export default Modal;
