interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <>
      <div className='progressBar'>
        <div className='done' style={{ width: `${progress}%` }}></div>
      </div>
      <style jsx>{`
        .progressBar {
          position: absolute;
          bottom: 1px;
          width: 100%;
          height: 5px;
          background-color: grey;
        }
        .done {
          width: 0px;
          height: 5px;
          background-color: var(--white);;
        }
      `}</style>
    </>
  );
};

export default ProgressBar;
