import Lottie from 'react-lottie';
import loading from './loading.json'

const lottieOptions = {
  animationData: loading,
  loop: true,
  autoplay: true,
};

interface Props {
  width: string;
  height: string

}

const LoadingLottie: React.FC<Props> = ({width, height}) => {
  return (
    <Lottie
      options={lottieOptions}
      isClickToPauseDisabled={false}
      style={{ width: width, height: height }} // svg의 부모 div에 적용
      eventListeners={[
        {
          eventName: 'complete',
          callback: () => console.log('the animation completed'),
        },
      ]}
    />
  );
};

export default LoadingLottie;
