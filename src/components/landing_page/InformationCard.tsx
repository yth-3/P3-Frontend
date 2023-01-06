
type Props = {
  header: string;
  information: string;
};
export default function InformationCard({ header, information }: Props) {
  return (
    <div className='w-64 bg-slate-100 p-4 rounded-md shadow-md'>
      <h3 className='font-bold'>{header}</h3>
      <div>{information}</div>
    </div>
  )
}
