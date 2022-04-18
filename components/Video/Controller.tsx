interface Props {
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  onTap: () => void;
  onDoubleTap: () => void;
}

const Controller: React.FC<Props> = ({ onSwipeUp, onSwipeDown, onTap, onDoubleTap }) => {
  return <div></div>;
};

export default Controller;
