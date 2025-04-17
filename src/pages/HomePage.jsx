import React, { useEffect } from 'react';
import Filter from '../components/Filter';
import ThreadList from '../components/ThreadList';
import AuthInfo from '../components/AuthInfo';
import { useDispatch, useSelector } from 'react-redux';
import { populateUsersAndThreads } from '../states/shared/action';
import ThreadForm from '../components/ThreadForm';

export default function HomePage() {
	const auth = useSelector((state) => state.auth);
	const threads = useSelector((state) => state.threads);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(populateUsersAndThreads());
	}, []);

	return (
		<section>
			<Filter threads={threads} />
			{!auth ? <AuthInfo /> : <ThreadForm auth={auth} />}
			<ThreadList threads={threads} />
		</section>
	);
}
