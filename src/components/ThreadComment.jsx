import { useRef } from 'react';
import ThreadProfile from './ThreadProfile';
import { ShowMore } from '@re-dev/react-truncate';
import parse from 'html-react-parser';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { userShape } from './ThreadItem';

export default function ThreadComment({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUserId,
  likeComment,
  dislikeComment,
  neutralComment,
}) {
  const isCommentLiked = upVotesBy.includes(authUserId);
  const isCommentDisliked = downVotesBy.includes(authUserId);
  const ref = useRef(null);

  const toggleLines = (e) => {
    ref.current?.toggleLines(e);
  };

  const onHandleLikeComment = () => {
    if (!authUserId)
      return toast.error('Please login first to like a comment.');
    likeComment(id);
  };

  const onHandleDislikeComment = () => {
    if (!authUserId)
      return toast.error('Please login first to dislike a comment.');
    dislikeComment(id);
  };

  const onHandleNeutralComment = (voteType) => {
    if (!authUserId)
      return toast.error(
        'Please login first to unlike or undislike a comment.'
      );
    neutralComment(id, voteType);
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
      shadow-sm my-3'
    >
      <ThreadProfile user={owner} createdAt={createdAt} />

      <div className='mt-6 text-base text-slate-600 font-light leading-normal'>
        <ShowMore
          lines={3}
          ref={ref}
          more={
            <>
              <span
                className='text-sm text-blue-500 font-semibold cursor-pointer ml-1'
                onClick={toggleLines}
              >
								read more...
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
          {parse(`${content}`)}
        </ShowMore>
      </div>

      <div className='flex gap-3 mt-3 mb-3'>
        <div
          className='inline-flex gap-1 items-center text-slate-500 cursor-pointer'
          onClick={() => {
            isCommentLiked
              ? onHandleNeutralComment('Like')
              : onHandleLikeComment();
          }}
        >
          {isCommentLiked ? (
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
            isCommentDisliked
              ? onHandleNeutralComment('Dislike')
              : onHandleDislikeComment();
          }}
        >
          {isCommentDisliked ? <BiSolidDislike /> : <BiDislike />}
          <span className='text-sm'>{downVotesBy.length} Dislikes</span>
        </div>
      </div>
    </div>
  );
}

const commentProp = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
};

ThreadComment.propTypes = {
  ...commentProp,
  authUserId: PropTypes.string,
  likeComment: PropTypes.func.isRequired,
  dislikeComment: PropTypes.func.isRequired,
  neutralComment: PropTypes.func.isRequired,
};
