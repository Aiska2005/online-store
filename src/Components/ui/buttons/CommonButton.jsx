
const CommonButton = ({className, onClick, children}) => {
  return (
    <button
      onClick={onClick}
      className={`md:py-[12px] md:px-[24px] px-[12px] py-[8px] rounded-[62px] ${className}`} >{children}</button>
  );
};

export default CommonButton;