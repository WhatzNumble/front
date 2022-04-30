import { AppState } from 'store';
import Router from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

type userType = 'user' | 'guest';

const useUserTypeRedirect = (href: string, redirectUserType: userType) => {
  const { isLoggedIn } = useSelector((state: AppState) => state.user);
  useEffect(() => {
    const isUser = redirectUserType === 'user';
    console.log(isLoggedIn, isUser);
    if (isUser === isLoggedIn) Router.push(href);
  }, [redirectUserType, href, isLoggedIn]);
};

export default useUserTypeRedirect;
