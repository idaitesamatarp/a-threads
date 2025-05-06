import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../states/filter/action';

export default function FilterSearch() {
  const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();

  const onSearch = (e) => {
    const { value } = e.target;

    if (value !== '' && value.length < 3) return;

    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className='relative'>
      <input
        id='filterSearch'
        className='w-full
          bg-transparent
          placeholder:text-slate-400 text-slate-700 text-sm
          border border-slate-200
          rounded-full
          pl-5 pr-28 py-2
          transition duration-300 ease
          focus:outline-none
          focus:border-slate-400
          focus:shadow
          hover:border-slate-300
          shadow-sm'
        placeholder='Search a thread by category...'
        value={searchTerm}
        onChange={onSearch}
      />
      <span className='absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-4 h-4 mr-2'
        >
          <path
            fillRule='evenodd'
            d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z'
            clipRule='evenodd'
          />
        </svg>
      </span>
    </div>
  );
}
