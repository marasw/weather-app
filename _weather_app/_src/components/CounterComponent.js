import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrementAction, incrementAction } from "../actions";

// const CounterComponent = () => {
//     return (
//         <div>
//             <h1>Counter - Redux Saga Flow Example</h1>
//             <button>Increment + 1</button>
//             <button>Decrement - 1</button>
//             <div>Count: 0</div>
//         </div>
//     );
// };

// const CounterComponent = ({ dispatch }) => {
//     const dispatch = useDispatch();
//     return (
//         <div>
//             <h1>Counter - Redux Saga Flow Example</h1>
//             <button onClick={() => dispatch(incrementAction(1))}>+</button>
//             <button onClick={() => dispatch(decrementAction(1))}>-</button>
//             <div>Count: 0</div>
//         </div>
//     );
// };

const CounterComponent = ({dispatch}) => {
    const counter = useSelector((state) => state.counterReducers);
    const dispatch = useDispatch();
    return (
        <div>
            <h1>Counter - Redux Saga Flow Example</h1>
            <button onClick={() => dispatch(incrementAction(1))}>+</button>
            <button onClick={() => dispatch(decrementAction(1))}>-</button>
            <div>Count: {counter.value}</div>
        </div>
    );
};
 
export default CounterComponent;
