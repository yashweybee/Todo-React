import React from 'react';
import './todo.css';

const Todo = ({ name, isCompleted, deadline }) => {
	return (
		<div className="single-todo">
			<h1>
				{name}
				{/* {isCompleted ? '✔' : '❌'} */}
			</h1>
			<p>{deadline}</p>
		</div>
	);
};

export default Todo;
