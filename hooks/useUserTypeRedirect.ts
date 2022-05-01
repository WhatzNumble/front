import { AppState } from 'store';
import Router from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { uiActions } from 'store/ui';

type userType = 'user' | 'guest';

const useUserTypeRedirect = (href: string, redirectUserType: userType) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: AppState) => state.user);
  useEffect(() => {
    const isUser = redirectUserType === 'user';
    console.log(isLoggedIn, isUser);
    if (isUser === isLoggedIn) {
      Router.push(href);
      dispatch(
        uiActions.pushToast({
          message: isUser ? '잘못된 접근입니다.' : '로그인이 필요한 서비스입니다.',
        })
      );
    }
  }, [dispatch, redirectUserType, href, isLoggedIn]);
};

export default useUserTypeRedirect;
