import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaderboards } from '../states/leaderboards/action';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { RiArrowLeftSLine } from 'react-icons/ri';

export default function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboards());
  }, [dispatch]);

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
  };

  const columns = [
    {
      name: 'Rank',
      center: 'true',
      width: '200px',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Name',
      width: '300px',
      cell: (row) => {
        return (
          <div className='flex items-center gap-4'>
            <img
              src={row.user.avatar}
              alt='avatar'
              className='inline-block relative object-cover object-center !rounded-full w-12 h-12'
            />
            <div>
              <h6 className='text-slate-800 font-semibold'>{row.user.name}</h6>
              <p className='text-slate-600 text-sm'>{row.user.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      name: 'Score',
      center: 'true',
      selector: (row) => row.score,
    },
  ];

  return (
    <div
      className='flex
			w-full h-auto
			overflow-auto
			p-4
			flex-col
			rounded-lg
			bg-white shadow-sm border border-slate-200 my-3'
    >
      <h5 className='flex justify-center mx-auto text-slate-900 text-xl font-semibold'>
				Leaderboards
      </h5>

      <hr
        className='my-5 h-px
				border-t-0
				bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent
				opacity-25 dark:via-neutral-400'
      />

      <DataTable
        columns={columns}
        data={leaderboards?.data?.leaderboards || []}
        pagination
        striped
        fixedHeader
        responsive
        customStyles={customStyles}
      />

      <Link
        to={'/'}
        className='flex self-start items-center
				rounded-md
				border border-slate-300
				py-2 px-4
				text-center text-sm text-slate-600
				transition-all shadow-sm
				hover:shadow-lg hover:text-white hover:bg-slate-800 hover:border-slate-800
				focus:text-white focus:bg-slate-800 focus:border-slate-800
				active:border-slate-800 active:text-white active:bg-slate-800
				disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
      >
        <RiArrowLeftSLine className='mr-2' />
				Homepage
      </Link>
    </div>
  );
}
