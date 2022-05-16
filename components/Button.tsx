interface Props {
  children?: React.ReactNode;
  onClick: () => void;
  buttonColor?: string;
  backgroundColor?: string;
  border?: string;
  text?: string;
  textColor?: string;
  width?: string;
}

const Button: React.FC<Props> = ({
  onClick,
  width = '100%',
  text = 'Button',
  buttonColor = 'var(--black)',
  border = '1px solid #8F8F8F;',
  textColor = 'var(--white)',
  children,
}) => {
  return (
    <div className='wrapper'>
      <button className='button' onClick={() => onClick()}>
        {children ? children : text}
      </button>
      <style jsx>
        {`
          .wrapper {
            width: ${width};
            max-width: 750px;
            margin: 0 auto;
            margin-bottom: 8px;
          }
          .button {
            height: 48px;
            width: 100%;
            background: ${buttonColor};
            border: ${border};
            border-radius: 30px;
            color: ${textColor};
            font-weight: 500;
            font-size: 16px;
            line-height: 140%;
          }
        `}
      </style>
    </div>
  );
};

export default Button;
