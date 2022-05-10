const Mask = () => {
  return (
    <div className='Mask'>
      <style jsx>
        {`
          .Mask {
            position: absolute;
            z-index: 8;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
          }
        `}
      </style>
    </div>
  );
};

export default Mask;
