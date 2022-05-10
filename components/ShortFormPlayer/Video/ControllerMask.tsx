import { useState, useRef } from "react";

interface Props {
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  onTap: () => void;
  onDoubleTap: () => void;
}

const ControllerMask: React.FC<Props> = ({ onSwipeUp, onSwipeDown, onTap, onDoubleTap }) => {
  const maskRef = useRef<HTMLDivElement | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 60;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientY);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;
    if (isUpSwipe) onSwipeUp();
    else if (isDownSwipe) onSwipeDown();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.detail);
    switch (e.detail) {
      case 1:
        console.log("click");
        onTap();
        break;
      case 2:
        console.log("double click");
        onDoubleTap();
        break;
      default:
        return;
    }
  };
  return (
    <>
      <div
        className='Mask'
        ref={maskRef}
        onClick={handleClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className='VideoBottom'>
          <div className='title'>Title Short Video</div>
        </div>
        <div className='VideoRightButton'></div>
      </div>
      <style jsx>
        {`
          .Mask {
            position: absolute;
            width: 100%;
            height: calc(100% - 50px);
            z-index: 2;
            left: 0;
            top: 0;
            .VideoBottom {
              position: relative;
              color: white;
              bottom: 0px;
            }
          }
        `}
      </style>
    </>
  );
};

export default ControllerMask;
