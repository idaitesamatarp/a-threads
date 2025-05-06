import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getThreadDetail,
  toggleDownVoteThreadDetail,
  toggleNeutralVoteThreadDetail,
  toggleUpVoteThreadDetail,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import { RiArrowLeftSLine } from 'react-icons/ri';

export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const threadDetail = useSelector((state) => state.threadDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return null;
  }

  const data = {
    ...threadDetail,
    authUserId: auth?.id || null,
    totalComments: threadDetail.comments.length,
  };

  const onLikeThread = (threadId) => {
    dispatch(toggleUpVoteThreadDetail(threadId));
  };

  const onDislikeThread = (threadId) => {
    dispatch(toggleDownVoteThreadDetail(threadId));
  };

  const onNeutralThread = (threadId, voteType) => {
    dispatch(toggleNeutralVoteThreadDetail(threadId, voteType));
  };

  return (
    <section>
      {threadDetail && (
        <ThreadDetail
          {...data}
          like={onLikeThread}
          dislike={onDislikeThread}
          neutralVote={onNeutralThread}
        />
      )}
      <button
        className='flex items-center
				rounded-md
				border border-slate-300
				py-2 px-4
				text-center text-sm text-slate-600
				transition-all shadow-sm
				hover:shadow-lg hover:text-white hover:bg-slate-800 hover:border-slate-800
				focus:text-white focus:bg-slate-800 focus:border-slate-800
				active:border-slate-800 active:text-white active:bg-slate-800
				disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
        type='button'
        onClick={() => navigate('/')}
      >
        <RiArrowLeftSLine className='mr-2' />
				Homepage
      </button>
    </section>
  );
}
