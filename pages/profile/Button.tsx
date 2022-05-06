interface Props {
  onClick: () => void;
  buttonColor?: string;
  buttonTheme?: 'light' | 'dark';
  text: string;
  textColor?: string;
  width: string;
}
const Button: React.FC<Props> = ({ onClick, width, text, buttonColor, textColor = '#000' }) => {
  const backgroundColor = buttonColor ? buttonColor : '#D8FF69';
  return (
    <button className='Button' onClick={onClick}>
      {text}
      <style jsx>
        {`
          .Button {
            width: ${width};
            height: 48px;
            background: ${backgroundColor};
            border-radius: 28px;
            color: ${textColor};
          }
        `}
      </style>
    </button>
  );
};

export default Button;
