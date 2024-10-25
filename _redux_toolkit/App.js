// App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterState';
import 'App.css';

const App = () => {
	const { count } = useSelector(state => state.counter);
	const dispatch = useDispatch();
	return (
		<div className="App">
			<div>Count: { count }</div>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button>
		</div>
	);
}

export default App;