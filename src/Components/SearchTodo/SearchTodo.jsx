import React, { useState } from 'react';
import './searchTodo.css';

const SearchTodo = () => {
	const [searchText, setSearchText] = useState('');
	const handeSubmit = (e) => {
		e.preventDefault();
		console.log(searchText);
	};

	return (
		<div className="search-container">
			<form className="search-form" onSubmit={handeSubmit}>
				<input
					className="inp-box"
					placeholder="Search.."
					type="text"
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default SearchTodo;
