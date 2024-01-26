import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrnetState } from '../../utils/stateSlice';
import SearchTodo from '../SearchTodo/SearchTodo';
import './header.css';
import { AccountSvg, SettingSvg } from '../../utils/svgs';

const Header = () => {
	const dispatch = useDispatch();
	const handelAllBtn = () => {
		dispatch(setCurrnetState('all'));

		Notification.requestPermission();
		new Notification('Hello', {
			body: 'Notification Body',
			icon: 'https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?    auto=compress&cs=tinysrgb&dpr=1&w=500',
			dir: 'ltr',
		});
	};
	const handelActiveBtn = () => {
		dispatch(setCurrnetState('active'));
	};

	const handelCompleted = () => {
		dispatch(setCurrnetState('completed'));
	};
	console.log('Render header');

	return (
		<div className="main-header">
			<div className="heading">
				<h1>TO-DO</h1>
				<div className="left-icon icons">
					<SettingSvg />
				</div>
			</div>
			<SearchTodo />
			<div className="btn-container">
				<Link className="btn" to="/todo/add">
					Add
				</Link>
				<button className="btn" onClick={handelAllBtn}>
					All
				</button>
				<button className="btn" onClick={handelActiveBtn}>
					Active
				</button>
				<button className="btn" onClick={handelCompleted}>
					Completed
				</button>
			</div>
		</div>
	);
};

export default Header;
