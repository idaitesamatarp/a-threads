import React, { useRef } from 'react';
import parse from 'html-react-parser';
import {
	BiLike,
	BiDislike,
	BiSolidLike,
	BiSolidDislike,
	BiCommentDetail,
} from 'react-icons/bi';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { ShowMore } from '@re-dev/react-truncate';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

export default function ThreadItem({
	id,
	user,
	authUserId,
	category,
	createdAt,
	title,
	body,
	upVotesBy,
	downVotesBy,
	totalComments,
	like,
	dislike,
	neutralVote,
}) {
	const navigate = useNavigate();
	const isThreadLiked = upVotesBy.includes(authUserId);
	const isThreadDisliked = downVotesBy.includes(authUserId);

	const onHandleLike = () => {
		if (!authUserId)
			return toast.error('Please login first to like a thread !');
		like(id);
	};

	const onHandleDislike = () => {
		if (!authUserId)
			return toast.error('Please login first to dislike a thread !');
		dislike(id);
	};

	const onHandleNeutral = (voteType) => {
		if (!authUserId)
			return toast.error(
				'Please login first to unlike or undislike a thread !'
			);
		neutralVote(id, voteType);
	};

	const navigateToDetail = () => {
		navigate(`/threads/${id}`);
	};
	return (
		<div
			key={id}
			className='flex 
			w-full h-auto 
			overflow-auto 
			p-4 
			flex-col 
			rounded-lg 
			bg-white shadow-sm border border-slate-200 my-3'
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
				<h5
					className='mb-2 
				text-blue-500 text-xl font-semibold 
					cursor-pointer'
					onClick={navigateToDetail}
				>
					{title}
				</h5>

				<div className='text-base text-slate-600 font-light leading-normal'>
					<ShowMore
						lines={3}
						more={
							<>
								<span>... </span>
								<Link
									to={`/threads/${id}`}
									className='text-sm text-blue-500 font-semibold'
								>
									read more
								</Link>
							</>
						}
					>
						{parse(`${body}`)}
					</ShowMore>
				</div>
			</div>
			<div className='flex gap-3 mt-3 mb-3'>
				<div
					className='inline-flex gap-1 items-center text-slate-500 cursor-pointer'
					onClick={() => {
						isThreadLiked ? onHandleNeutral('Like') : onHandleLike();
					}}
				>
					{isThreadLiked ? (
						<BiSolidLike className='text-red-600' />
					) : (
						<BiLike />
					)}
					<span className='text-sm'>{upVotesBy.length} Likes</span>
				</div>

				<div className='inline-block h-[25px] min-h-[1em] w-0.5 self-stretch bg-slate-100'></div>

				<div
					className='inline-flex gap-1 items-center text-slate-500 cursor-pointer'
					onClick={() => {
						isThreadDisliked ? onHandleNeutral('Dislike') : onHandleDislike();
					}}
				>
					{isThreadDisliked ? <BiSolidDislike /> : <BiDislike />}
					<span className='text-sm'>{downVotesBy.length} Dislikes</span>
				</div>

				<div className='inline-block h-[25px] min-h-[1em] w-0.5 self-stretch bg-slate-100'></div>

				<div
					className='inline-flex gap-1 items-center text-slate-500 cursor-pointer'
					onClick={navigateToDetail}
				>
					<BiCommentDetail />
					<span className='text-sm'>{totalComments} Replies</span>
				</div>
			</div>
		</div>
	);
}

const userShape = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
	id: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	upVotesBy: PropTypes.array.isRequired,
	downVotesBy: PropTypes.array.isRequired,
	totalComments: PropTypes.number.isRequired,
	user: PropTypes.shape(userShape).isRequired,
	authUserId: PropTypes.string.isRequired,
};

ThreadItem.proptype = {
	...threadItemShape,
	like: PropTypes.func.isRequired,
	dislike: PropTypes.func.isRequired,
	neutralVote: PropTypes.func.isRequired,
};

export { threadItemShape };
