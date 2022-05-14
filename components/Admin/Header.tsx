import Image from 'next/image';
import { useRouter } from 'next/router';
import config from 'utils/config';
import Button from './Button';

interface Props {
  height?: number;
  path?: string[]
}

function Header({ height, path }: Props) {
  const {apiBaseURL} = config; 
  const router = useRouter();

  const onLogout = async ()=>{
    await fetch(`${apiBaseURL}/member/logout`, {
      method: 'POST'
    });
    router.push('/admin');
  }

  return (
    <header className='Header'>
      <Image src='/icon/admin/admin_logo.svg' width={180} height={40.2} alt='admin logo' />
      <div className='info'>
        <div className='path'>
          {path && path.map(str => <>
              {str}<span>{'>'}</span>
          </>)}
        </div>
        <Button text='Logout' type='red' onClick={onLogout}/>
      </div>
      <style jsx>{`
        .Header {
          height: ${height}px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          background-color: black;
        }
        
        .info {
          display: flex;
          align-items: center;
        }

        .path {
          color: rgb(207, 207, 207);
          font-size: 16px;
          font-weight: bold;
          margin-right: 20px;
          span {
            margin: 0 15px;
            &:last-child {
              display: none;
            }
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
