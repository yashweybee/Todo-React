import React from 'react';
import { useParams } from 'react-router';

const EditTodo = () => {
	const { id } = useParams();
	return <div>{id}</div>;
};

export default EditTodo;
