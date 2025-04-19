import React, { useEffect } from 'react';
import Filter from '../components/Filter';
import ThreadList from '../components/ThreadList';
import AuthInfo from '../components/AuthInfo';
import { useDispatch, useSelector } from 'react-redux';
import { populateUsersAndThreads } from '../states/shared/action';
import ThreadForm from '../components/ThreadForm';
import { createThread } from '../states/threads/action';

export default function HomePage() {
	const auth = useSelector((state) => state.auth);
	const threads = useSelector((state) => state.threads);
	const searchTerm = useSelector((state) => state.filter);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(populateUsersAndThreads());
	}, []);

	const onAddThread = ({ title, body, category }) => {
		dispatch(createThread({ title, body, category }));
	};

	const threadList = threads.filter((thread) => {
		return thread.category.toLowerCase().includes(searchTerm.toLowerCase());
	});
	console.log('list:', threadList);

	return (
		<section>
			<Filter threads={threads} />
			{!auth ? (
				<AuthInfo />
			) : (
				<ThreadForm auth={auth} addThread={onAddThread} />
			)}
			<ThreadList threads={threadList} />
		</section>
	);
}
