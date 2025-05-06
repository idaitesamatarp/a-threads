import moment from 'moment';
import PropTypes from 'prop-types';

function ThreadProfile({ user, category = null, createdAt }) {
  return (
    <div className='flex items-center gap-4 text-slate-800'>
      <img
        src={user.avatar}
        alt={user.name}
        className='relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center'
      />
      <div className='flex w-full flex-col'>
        <div className='flex items-center justify-between'>
          <h5 className='text-xl font-semibold text-slate-800'>{user.name}</h5>
          {category && (
            <div
              className='flex items-center
							rounded-md
							border border-slate-300
							py-0.5 px-2.5
							text-center text-sm text-slate-600
							transition-all shadow-sm'
            >
              {`#${category}`}
            </div>
          )}
        </div>
        <p className='text-xs uppercase font-bold text-slate-500 mt-0.5'>
          {moment(createdAt).format('LLL')}
        </p>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadProfile.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default ThreadProfile;
