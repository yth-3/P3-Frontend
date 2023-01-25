import usePagination, { DOTS } from './usePagination';

type props = {
  onPageChange: Function;
  totalCount: number;
  currentPage: number;
  pageSize: number;
};

export default function Pagination({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
}: props) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: 1,
    pageSize,
  });

  if (
    currentPage === 0 ||
    paginationRange === null ||
    paginationRange!.length < 2
  ) {
    return null;
  }

  function onNext() {
    onPageChange(currentPage + 1);
  }

  function onPrevious() {
    onPageChange(currentPage - 1);
  }

  let lastPage;
  if (paginationRange !== undefined) {
    lastPage = paginationRange[paginationRange?.length - 1];
  } else {
    lastPage = 0;
  }

  return (
    <ul className='flex gap-10'>
      <li key='first'>
        <button disabled={currentPage === 1} onClick={onPrevious}>
          prev
        </button>
      </li>
      {paginationRange?.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li key={'Page number: ' + pageNumber}>&#8230;</li>;
        }

        return (
          <li key={'Page number: ' + pageNumber}>
            <button onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li key='last'>
        <button disabled={currentPage === lastPage} onClick={onNext}>
          next
        </button>
      </li>
    </ul>
  );
}
