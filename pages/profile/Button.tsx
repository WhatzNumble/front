interface Props {
  onClick: () => void;
  buttonColor?: string;
  theme?: 'light' | 'dark';
  text: string;
  textColor?: string;
  width?: string;
}

const Button: React.FC<Props> = ({
  onClick,
  theme = 'light',
  width,
  text,
  buttonColor,
  textColor = '#000',
}) => {
  const backgroundColor = buttonColor ? buttonColor : theme === 'light' ? '#D8FF69' : '#000';
  return (
    <div className='wrapper'>
      <button className='button' onClick={onClick}>
        {text}
      </button>
      <style jsx>
        {`
          .wrapper {
            margin: 4px 0;
          }
          .button {
            width: ${width || 'auto'};
            height: 48px;
            background: ${backgroundColor};
            border-radius: 30px;
            color: ${theme === 'dark' ? '#fff' : textColor};
            font-weight: 500;
            font-size: 16px;
            line-height: 140%;
            ${theme === 'dark' && 'border: 1px solid #8F8F8F;'}
          }
        `}
      </style>
    </div>
  );
};

export default Button;
