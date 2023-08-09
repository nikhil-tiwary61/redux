import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

const history = [];
const init = "init";
const inc = "increment";
const dec = "decrement";
const incByAmt = "incrementByAmount";

//store
const store = createStore(
  reducer,
  applyMiddleware(logger.default, thunk.default)
);

//reducer
function reducer(state = { amount: 1 }, action) {
  //immutability
  switch (action.type) {
    case init:
      return { amount: action.payload };
      break;
    case inc:
      return { amount: state.amount + 1 };
      break;
    case dec:
      return { amount: state.amount - 1 };
      break;
    case incByAmt:
      return { amount: state.amount + action.payload };
      break;
    default:
      return state;
  }
}

//global state
// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });

//Async API call
// async function getUser() {
//   const { data } = await axios.get("http://localhost:3000/accounts/1");
//   console.log(data);
// }
// getUser();

//Action creators
async function getUser(dispatch, getUser) {
  const { data } = await axios.get("http://localhost:3000/accounts/1");
  dispatch(initUser(data.amount));
}
function initUser(value) {
  return { type: init, payload: value };
}
function increment() {
  return { type: inc };
}
function decrement() {
  return { type: dec };
}
function incrementByAmount(amt) {
  return { type: incByAmt, payload: amt };
}

setTimeout(() => {
  store.dispatch(getUser);
}, 2000);
