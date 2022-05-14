import Link from 'next/link';
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getCookieValue } from 'utils/cookie';
import config from 'utils/config';
import { useDispatch } from 'react-redux';
import useToastMessage from 'hooks/useToastMessage';
import { LoginUser, userActions } from 'store/user';

const TAB_SELECTED = '_selected';

interface Props {
  height?: number;
  transparent?: boolean;
}

function TabBar({ height = 56, transparent = false }: Props) {
  const { pushToast } = useToastMessage();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: AppState) => state.user);
  const LINK_INFOS = [
    { path: '/', name: '홈', icon: '/icon/common/home' },
    { path: '/my-video', name: '마이 비디오', icon: '/icon/common/myvideo' },
    { path: '/like', name: '관심 영상', icon: '/icon/common/bookmark' },
    isLoggedIn
      ? { path: '/profile', name: '프로필', icon: '/icon/common/profile' }
      : { path: '/login', name: '로그인', icon: '/icon/common/profile' },
  ];

  const getSuffix = (path: string) => {
    const { pathname } = router;
    if (path === '/') {
      return pathname === path ? TAB_SELECTED : '';
    }
    let str = pathname.split('/').join('');
    let str2 = path.split('/').join('');
    return str.includes(str2) ? TAB_SELECTED : '';
  };

  const loadUserData = useCallback(() => {
    const token = getCookieValue(config.cookieAuthHeaderKey);
    if (token) {
      console.log(token);
      axios
        .get('/profile', {
          headers: {
            [config.authHeaderKey]: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            const userData: LoginUser = {
              email: res.data.email,
              id: res.data.id,
              nickName: res.data.nickName,
              avatar: res.data.thumbnailUrl,
            };
            axios.defaults.headers.common[config.authHeaderKey] = token;
            dispatch(userActions.login({ token: token, loginUser: userData, socialType: 'kakao' }));
          }
        })
        .catch((err) => {
          console.log('login error');
          console.log(err);
          dispatch(userActions.logout());
          pushToast('로그인 실패');
        });
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn && getCookieValue(config.cookieAuthHeaderKey)) {
      loadUserData();
    }
  }, [isLoggedIn, loadUserData]);

  return (
    <nav className='TabBar'>
      <ul className='nav-box'>
        {LINK_INFOS.map((info) => (
          <li key={info.path}>
            <Link href={info.path}>
              <a>
                <Image
                  src={info.icon + getSuffix(info.path) + '.svg'}
                  width={32}
                  height={32}
                  alt={`${info.path} icon`}
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .TabBar {
          width: 100%;
          z-index: 9;
          position: fixed;
          bottom: 0;
          ${transparent
            ? `
            background-color: rgba(0,0,0,0);
          `
            : `
            background-color: black;
          `}
          width: 100%;
        }

        .nav-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 37px;
          height: ${height}px;
        }
      `}</style>
    </nav>
  );
}

export default TabBar;
