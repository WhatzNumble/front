import Image from 'next/image';
import Button from 'components/Button';

interface ISocialLoginButton {
  text: string;
  logoSrc?: string;
  backgroundColor?: string;
  color?: string;
  hrefLink: string;
}

const LoginButton: React.FC<ISocialLoginButton> = ({
  logoSrc = '/icon/logo/whatz.svg',
  backgroundColor,
  text,
  hrefLink,
}) => {
  const onClickLoginButton = () => {
    location.href = hrefLink;
  };
  return (
    <>
      <Button onClick={onClickLoginButton} textColor='var(--black)'  buttonColor={backgroundColor}>
        <label className='loginButton'>
          <Image src={logoSrc} width={19} height={19} alt='login logo' />
          <p>{text}</p>
        </label>
      </Button>
      <style jsx>
        {`
          .loginButton {
            width: 100%;
            height: 48px;
          }
          label {
            display: flex;
            justify-content: center;
            align-items: center;
            p {
              margin-left: 4px;
              font-size: 16px;
            }
          }
        `}
      </style>
    </>
  );
};

export default LoginButton;
