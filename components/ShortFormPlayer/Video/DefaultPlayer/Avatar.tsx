import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  link: string;
  avatarImage: string;
}

const Avatar: React.FC<Props> = ({ link, avatarImage }) => {
  return (
    <Link href={`/user/${link}`}>
      <a className='container' href={link}>
        <Image className='profileImage' width='44px' height='44px' src={avatarImage} alt={link} />
        <style jsx>
          {`
            .profileImage {
              border-radius: 50% !important;
              width: 44px;
              height: 44px;
            }
          `}
        </style>
      </a>
    </Link>
  );
};

export default Avatar;
