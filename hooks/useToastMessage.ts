import { useDispatch } from 'react-redux';
import { uiActions } from 'store/ui';

const useToastMessage = () => {
  const dispatch = useDispatch();
  const pushToast = (message: string) => {
    dispatch(uiActions.pushToast({ message: message }));
  };
  const removeToast = () => {
    dispatch(uiActions.removeToast());
  };
  return { pushToast, removeToast };
};

export default useToastMessage;
