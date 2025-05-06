import { useEffect } from 'react';
import Filter from '../components/Filter';
import ThreadList from '../components/ThreadList';
import AuthInfo from '../components/AuthInfo';
import { useDispatch, useSelector } from 'react-redux';
import { populateUsersAndThreads } from '../states/shared/action';
import ThreadForm from '../components/ThreadForm';
import { createThread } from '../states/threads/action';
import {
  toggleDownVoteThread,
  toggleNeutralVoteThread,
  toggleUpVoteThread,
} from '../states/votes/action';

export default function HomePage() {
  const auth = useSelector((state) => state.auth);
  const threads = useSelector((state) => state.threads);
  const searchTerm = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(populateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = ({ title, body, category }) => {
    dispatch(createThread({ title, body, category }));
  };

  const onLikeThread = (threadId) => {
    dispatch(toggleUpVoteThread(threadId));
  };

  const onDislikeThread = (threadId) => {
    dispatch(toggleDownVoteThread(threadId));
  };

  const onNeutralThread = (threadId, voteType) => {
    dispatch(toggleNeutralVoteThread(threadId, voteType));
  };

  const threadList = threads
    .map((thread) => {
      return {
        ...thread,
        authUserId: auth?.id || null,
      };
    })
    .filter((thread) =>
      thread.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <section>
      <Filter threads={threads} />
      {!auth ? (
        <AuthInfo />
      ) : (
        <ThreadForm auth={auth} addThread={onAddThread} />
      )}
      <ThreadList
        threads={threadList}
        likeThread={onLikeThread}
        dislikeThread={onDislikeThread}
        neutralThread={onNeutralThread}
      />
    </section>
  );
}
