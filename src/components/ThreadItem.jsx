import React from 'react';
import parse from 'html-react-parser';
import {
	BiLike,
	BiDislike,
	BiSolidLike,
	BiSolidDislike,
	BiCommentDetail,
} from 'react-icons/bi';
import moment from 'moment';

export default function ThreadItem({
	id,
	user,
	category,
	createdAt,
	body,
	upVotesBy,
	downVotesBy,
	totalComments,
}) {
	return (
		<div
			key={id}
			className='flex w-full p-4 flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-3'
		>
			<div className='flex items-center gap-4 text-slate-800'>
				<img
					src={user.avatar}
					alt={user.name}
					className='relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center'
				/>
				<div className='flex w-full flex-col'>
					<div className='flex items-center justify-between'>
						<h5 className='text-xl font-semibold text-slate-800'>
							{user.name}
						</h5>
						<div
							className='flex items-center 
									rounded-md 
									border border-slate-300 
									py-0.5 px-2.5 
									text-center text-sm text-slate-600
									transition-all shadow-sm'
						>
							{'#' + category}
						</div>
					</div>
					<p className='text-xs uppercase font-bold text-slate-500 mt-0.5'>
						{moment(createdAt).format('LLL')}
					</p>
				</div>
			</div>
			<div className='mt-6'>
				<div className='text-base text-slate-600 font-light leading-normal'>
					{parse(`${body}`)}
				</div>
			</div>
			<div className='flex gap-3 mt-3'>
				<div className='inline-flex gap-1 items-center text-slate-500 cursor-pointer'>
					<BiLike />
					<span className='text-sm'>{upVotesBy.length} Likes</span>
				</div>

				<div className='inline-block h-[25px] min-h-[1em] w-0.5 self-stretch bg-slate-100'></div>

				<div className='inline-flex gap-1 items-center text-slate-500 cursor-pointer'>
					<BiDislike />
					<span className='text-sm'>{downVotesBy.length} Dislikes</span>
				</div>

				<div className='inline-block h-[25px] min-h-[1em] w-0.5 self-stretch bg-slate-100'></div>

				<div className='inline-flex gap-1 items-center text-slate-500 cursor-pointer'>
					<BiCommentDetail />
					<span className='text-sm'>{totalComments} Replies</span>
				</div>
			</div>
		</div>
	);
}
