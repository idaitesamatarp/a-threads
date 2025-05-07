import { Link } from 'react-router-dom';

export default function AuthInfo() {
  return (
    <div
      className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-full my-3 relative'
      role='alert'
    >
      <span className='block text-sm'>
				Please{' '}
        <Link to='/login' className='font-bold text-blue-700' role='link'>
					Login
        </Link>{' '}
				or{' '}
        <Link to='/register' className='font-bold text-blue-700' role='link'>
					Register
        </Link>{' '}
				to create, comment, or like a topic.
      </span>
    </div>
  );
}
