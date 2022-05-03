import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { useRouter } from 'next/router';
import Image from 'next/image';

const TAB_SELECTED = '_selected';

interface Props {
  height?: number;
  transparent?: boolean
}

function TabBar({ height = 56, transparent = false }: Props) {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: AppState) => state.user);
  const LINK_INFOS = [
    { path: '/', name: '홈', icon: '/home' },
    { path: '/my-video', name: '마이 비디오', icon: '/myvideo' },
    { path: '/like', name: '관심 영상', icon: '/bookmark' },
    isLoggedIn ? { path: '/profile', name: '프로필', icon: '/profile' } : { path: '/login', name: '로그인', icon: '/profile' },
  ];

  const getSuffix = (path: string)=>{
    const {pathname} = router;
    if(path === '/'){
      return pathname === path ? TAB_SELECTED : '';
    }
    let str = pathname.split('/').join('');
    let str2 = path.split('/').join('');
    return str.includes(str2) ? TAB_SELECTED : '';
  } 

  return (
    <nav className='TabBar'>
      <ul className='nav-box'>
        {LINK_INFOS.map((info) => (
          <li key={info.path}>
            <Link href={info.path}>
              <a>
                <Image src={info.icon + getSuffix(info.path) + '.svg'} width={32} height={32}/>
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
          ${transparent ? `
            background-color: rgba(0,0,0,0.4);
          ` : `
            background-color: black;
          `}
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
