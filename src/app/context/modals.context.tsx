import { createContext, ReactNode, useContext, useState } from 'react';

interface IModalsContext {
  modal: boolean;
  toggleModal: () => void;
}
const ModalsContext = createContext({} as IModalsContext);

interface IModalsProvider {
  children: ReactNode;
}

const ModalsProvider = ({ children }: IModalsProvider) => {
  const [modal, setModals] = useState(false);

  const toggleModal = () => {
    setModals(!modal);
  };

  return (
    <ModalsContext.Provider value={{ modal, toggleModal }}>
      <div className="relative">{children}</div>
    </ModalsContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalsContext);
};

export { ModalsProvider };
