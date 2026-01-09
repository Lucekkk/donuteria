"use client";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "@/store/counter";

import classes from './counter.module.css';
export default function Counter() {
  const dispatch = useDispatch();
  const value = useSelector(state => state.counter.value);

  const incrementHandler = () => {
     dispatch(counterActions.increment());
  }

   const decrementHandler = () => {
     dispatch(counterActions.decrement());
  }

  return (
    <header>
      <h1>Value: {value}</h1>
      <button className={classes.button} onClick={incrementHandler}>Increment</button>
      <button className={classes.button} onClick={decrementHandler}>Decrement</button>
    </header>
  );
}
