interface ISocialLoginButton {
  label: string;
  hrefLink: string;
}

const LoginButton: React.FC<ISocialLoginButton> = ({ label, hrefLink }) => {
  return (
    <a href={hrefLink}>
      <button className='SocialLoginButton'>{label}</button>
      <style jsx>
        {`
          .SocialLoginButton {
            width: 311px;
            height: 48px;
            background: #565656;
            border-radius: 28px;
            color: #fff;
          }
        `}
      </style>
    </a>
  );
};

export default LoginButton;
