type Props = {
    onClick: Function;
  };
  export default function ReloadButton({ onClick }: Props): JSX.Element {
    return (
      <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <button
          className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-slate-50'
          onClick={(e) => onClick(e)}
        >
          <i className='fa fa-repeat'/>
          { ' Reload' }
        </button>
      </>
    )
  }
  