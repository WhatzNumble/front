import Image from 'next/image';

interface ISocialLoginButton {
  text: string;
  logoSrc?: string;
  backgroundColor?: string;
  color?: string;
  hrefLink: string;
}

const LoginButton: React.FC<ISocialLoginButton> = ({
  logoSrc = '/icon/logo/whatz.svg',
  backgroundColor = 'var(--primary)',
  text,
  hrefLink,
}) => {
  return (
    <a href={hrefLink}>
      <button className='loginButton'>
        <label>
          <Image src={logoSrc} width={19} height={19} alt='login logo' />
          <p>{text}</p>
        </label>
      </button>
      <style jsx>
        {`
          .loginButton {
            width: 311px;
            height: 48px;
            background: ${backgroundColor};
            border-radius: 28px;
            color: var(--black);
            label {
              display: flex;
              justify-content: center;
              p{
                margin-left: 10px;
              }
            }
          }
        `}
      </style>
    </a>
  );
};

export default LoginButton;
