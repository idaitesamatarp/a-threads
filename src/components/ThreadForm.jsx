import React from 'react';

export default function ThreadForm({ auth }) {
	return (
		<div className='flex items-start gap-4 my-5'>
			<img
				src={auth.avatar}
				alt={auth.name}
				className='relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center'
			/>
			<div className='flex w-full flex-col'>
				<textarea
					rows='8'
					className='peer h-full min-h-[100px] w-full !resize-none 
        rounded-[7px] 
        border border-blue-gray-200 bg-transparent 
        px-3 py-2.5 
        font-sans text-sm font-normal text-blue-gray-700 
        outline outline-0 
        transition-all 
        placeholder-shown:border placeholder-shown:border-blue-gray-200 
        focus:border-2 focus:border-gray-900 focus:outline-0 
        disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50'
					placeholder='Is there anything you want to share today?'
				></textarea>
				<div className='flex w-full justify-end py-1.5'>
					<div className='flex gap-2'>
						<button
							className='select-none rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
							type='button'
						>
							Post Thread
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
