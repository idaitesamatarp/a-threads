import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

export default function ThreadList({ threads }) {
	return (
		<>
			{threads.map((thread) => (
				<ThreadItem key={thread.id} {...thread} />
			))}
		</>
	);
}

ThreadList.proptype = {
	threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};
