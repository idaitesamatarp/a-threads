import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

export default function ThreadList({
	threads,
	likeThread,
	dislikeThread,
	neutralThread,
}) {
	return (
		<>
			{threads.map((thread) => (
				<ThreadItem
					key={thread.id}
					{...thread}
					like={likeThread}
					dislike={dislikeThread}
					neutralVote={neutralThread}
				/>
			))}
		</>
	);
}

ThreadList.proptype = {
	threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
	likeThread: PropTypes.func.isRequired,
	dislikeThread: PropTypes.func.isRequired,
	neutralThread: PropTypes.func.isRequired,
};
