interface ISocialLoginButton {
  label: string;
  hrefLink: string;
}

const LoginButton: React.FC<ISocialLoginButton> = ({ label, hrefLink }) => {
  return (
    <a href={hrefLink}>
      <style jsx>
        {`
          .SocialLoginButton {
            width: 311px;
            height: 48px;
            background: #565656;
            border-radius: 28px;
            color: #fff;
          }
          .KaKaoLogin {
            border-radius: 12px;
            background-color: #fee500;
            color: #000000;
            height: fit-content;
            padding: 1rem;
          }
        `}
      </style>
      <button className='SocialLoginButton'>{label}</button>
    </a>
  );
};

export default LoginButton;
