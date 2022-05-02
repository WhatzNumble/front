import { useSelector } from 'react-redux';
import { AppState } from 'store';
const useUserState = () => {
  const userState = useSelector((state: AppState) => state.user);
  //TODO ADD MORE HANDLE OPTION LOGIC
  return userState;
};

export default useUserState;
