import Image from 'next/image';

interface Props {
  height?: number;
  path?: string[]
}

function Header({ height, path }: Props) {
  return (
    <header className='Header'>
      <Image src='/icon/admin/admin_logo.svg' width={180} height={40.2} alt='admin logo' />
      <div className='path'>
        {path && path.map(str => <>
            {str}<span>{'>'}</span>
        </>)}
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

        .path {
          color: rgb(207, 207, 207);
          font-size: 16px;
          font-weight: bold;
          margin-right: 20px;
          span {
            margin: 0 25px;
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
