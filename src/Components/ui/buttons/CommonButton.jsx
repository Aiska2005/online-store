
const CommonButton = ({className, onClick, children}) => {
  return (
    <button
      onClick={onClick}
      className={`py-[12px] px-[24px]  rounded-[62px] ${className}`} >{children}</button>
  );
};

export default CommonButton;