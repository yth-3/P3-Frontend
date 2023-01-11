type Props = {
  onClose: Function;
  children: JSX.Element | JSX.Element[] | string | string[];
};
export default function InlineModal({ children, onClose }: Props) {
  return (
    <div
      id="modal-container"
      className='fixed top-0 left-0 w-full h-full'
      onClick={() => onClose()}
    >
      <div
        id="modal-content"
        className='fixed w-fit h-fit bg-white p-8 rounded shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
