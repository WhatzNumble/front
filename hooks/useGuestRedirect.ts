import { AppState } from 'store';
import Router from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const useGuestRedirect = () => {
  const { isLoggedIn } = useSelector((state: AppState) => state.user);
  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) Router.push('/');
  }, [isLoggedIn]);
};

export default useGuestRedirect;

