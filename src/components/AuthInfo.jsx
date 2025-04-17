import React from 'react';

export default function AuthInfo() {
	return (
		<div
			className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-full my-3 relative'
			role='alert'
		>
			<span className='block text-sm'>
				Please{' '}
				<a className='font-bold text-blue-700' href='/login'>
					Login
				</a>{' '}
				or{' '}
				<a className='font-bold text-blue-700' href='/register'>
					Register
				</a>{' '}
				to create, comment, or like a topic.
			</span>
			<span className='absolute inset-y-0 end-0 flex items-center pe-3'>
				<svg
					className='fill-current h-6 w-6 text-yellow-500'
					role='button'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
				>
					<title>Close</title>
					<path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
				</svg>
			</span>
		</div>
	);
}
