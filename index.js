import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

const history = [];
const inc = "increment";
const dec = "decrement";
const incByAmt = "incrementByAmount";

//store
const store = createStore(reducer, applyMiddleware(logger.default));

//reducer
function reducer(state = { amount: 1 }, action) {
  //immutability
  if (action.type === inc) {
    return { amount: state.amount + 1 };
  }
  if (action.type === dec) {
    return { amount: state.amount - 1 };
  }
  if (action.type === incByAmt) {
    return { amount: state.amount + action.payload };
  }

  return state;
}

//global state
// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });

//Action creators
function increment() {
  return { type: inc };
}
function decrement() {
  return { type: dec };
}
function incrementByAmount(amt) {
  return { type: incByAmt, payload: amt };
}

setInterval(() => {
  store.dispatch(incrementByAmount(4));
}, 2000);
