import { toast } from 'react-toast';

export const useToast = () => {
  const showMorning = (text: string) => toast(text);

  const showSuccess = (text: string) => toast.success(text);

  const showError = (text: string) => toast.error(text);

  const showInfo = (text: string) => toast.info(text);

  const showWarn = (text: string) => toast.warn(text);

  const showCustom = (text: string, styles: never) => toast(text, styles);

  return {
    showMorning,
    showSuccess,
    showError,
    showInfo,
    showWarn,
    showCustom,
  };
};
