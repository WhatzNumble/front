interface Props {
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  onTap: () => void;
  onDoubleTap: () => void;
}

const ControllerMask: React.FC<Props> = ({ onSwipeUp, onSwipeDown, onTap, onDoubleTap }) => {

  return (
    <>
      <div className='mask' onClick={onTap}></div>
      <style jsx>
        {`
          .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
            left: 0;
            top: 0;
          }
        `}
      </style>
    </>
  );
};

export default ControllerMask;
