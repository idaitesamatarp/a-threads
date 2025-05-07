export default function AuthInfo() {
  return (
    <div
      className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-full my-3 relative'
      role='alert'
    >
      <span className='block text-sm'>
				Please{' '}
        <a className='font-bold text-blue-700' href='/login' role='link'>
					Login
        </a>{' '}
				or{' '}
        <a className='font-bold text-blue-700' href='/register' role='link'>
					Register
        </a>{' '}
				to create, comment, or like a topic.
      </span>
    </div>
  );
}
