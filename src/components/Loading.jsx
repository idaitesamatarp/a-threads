import LoadingBar from 'react-redux-loading-bar';

export default function Loading() {
	return (
		<div className='sticky top-0'>
			<LoadingBar className='bg-slate-900 h-1 absolute' />
		</div>
	);
}
