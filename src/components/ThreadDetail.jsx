import { useRef } from 'react';
import parse from 'html-react-parser';
import {
  BiLike,
  BiDislike,
  BiSolidLike,
  BiSolidDislike,
  BiCommentDetail,
} from 'react-icons/bi';
import { ShowMore } from '@re-dev/react-truncate';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import ThreadProfile from './ThreadProfile';
import { userShape } from './ThreadItem';
import ThreadComment from './ThreadComment';
import {
  toggleDownVoteComment,
  toggleNeutralVoteComment,
  toggleUpVoteComment,
} from '../states/votes/action';
import { useDispatch, useSelector } from 'react-redux';
import AuthInfo from './AuthInfo';
import CommentInput from './CommentInput';

export default function ThreadDetail({
  id,
  title,
  body,
  category,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  comments,
  authUserId,
  like,
  dislike,
  neutralVote,
}) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isThreadLiked = upVotesBy.includes(authUserId);
  const isThreadDisliked = downVotesBy.includes(authUserId);
  const ref = useRef(null);

  const onHandleLike = () => {
    if (!authUserId)
      return toast.error('Please login first to like a thread. ');
    like(id);
  };

  const onHandleDislike = () => {
    if (!authUserId)
      return toast.error('Please login first to dislike a thread. ');
    dislike(id);
  };

  const onHandleNeutral = (voteType) => {
    if (!authUserId)
      return toast.error(
        'Please login first to unlike or undislike a thread. '
      );
    neutralVote(id, voteType);
  };

  const onLikeComment = (threadId, commentId) => {
    dispatch(toggleUpVoteComment(threadId, commentId));
  };

  const onDislikeComment = (threadId, commentId) => {
    dispatch(toggleDownVoteComment(threadId, commentId));
  };

  const onNeutralComment = (threadId, commentId, voteType) => {
    dispatch(toggleNeutralVoteComment(threadId, commentId, voteType));
  };

  const toggleLines = (e) => {
    ref.current?.toggleLines(e);
  };

  return (
    <div
      key={id}
      className='flex
			w-full h-full
			overflow-auto
			p-4
			flex-col
			rounded-lg
			bg-white shadow-sm border border-slate-200 my-3'
    >
      <ThreadProfile user={owner} category={category} createdAt={createdAt} />

      <div className='mt-6'>
        <h5 className='mb-2 text-slate-900 text-xl font-semibold'>{title}</h5>

        <div className='text-base text-slate-600 font-light leading-normal'>
          <ShowMore
            lines={3}
            ref={ref}
            more={
              <>
                {'...'}
                <span
                  className='text-sm text-blue-500 font-semibold cursor-pointer ml-1'
                  onClick={toggleLines}
                >
									read more
                </span>
              </>
            }
            less={
              <>
                <span
                  className='text-sm text-blue-500 font-semibold cursor-pointer ml-1'
                  onClick={toggleLines}
                >
									read less
                </span>
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

        <div className='inline-flex gap-1 items-center text-slate-500 cursor-pointer'>
          <BiCommentDetail />
          <span className='text-sm'>{totalComments} Replies</span>
        </div>
      </div>

      <hr
        className='my-5 h-px
				border-t-0
				bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent
				opacity-25 dark:via-neutral-400'
      />

      <h6 className='mb-2 text-slate-800 text-xl font-semibold'>Comments</h6>

      <hr className='mb-3' />

      {!auth ? <AuthInfo /> : <CommentInput {...auth} />}

      <hr className='my-3' />

      <div
        className={`overflow-auto ${
          comments.length === 0 ? 'h-auto' : 'h-[300px]'
        }`}
      >
        {comments.map((comment) => (
          <ThreadComment
            key={comment.id}
            {...comment}
            authUserId={authUserId}
            likeComment={onLikeComment}
            dislikeComment={onDislikeComment}
            neutralComment={onNeutralComment}
          />
        ))}
      </div>
    </div>
  );
}

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  totalComments: PropTypes.number.isRequired,
  authUserId: PropTypes.string,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};
