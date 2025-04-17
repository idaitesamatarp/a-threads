import React from 'react';
import FilterSelect from './FilterSelect';
import FilterSearch from './FilterSearch';

export default function Filter() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-12 gap-2'>
			<div className='col-span-2'>
				<FilterSelect />
			</div>
			<div className='col-span-10'>
				<FilterSearch />
			</div>
		</div>
	);
}
