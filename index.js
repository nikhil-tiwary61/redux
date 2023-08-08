import { createStore } from "redux";

//store
const store = createStore(reducer);

const history = [];

//reducer
function reducer(state = { amount: 1 }, action) {
  //immutability
  if (action.type === "increment") {
    return { amount: state.amount + 1 };
  }

  return state;
}

//global state
store.subscribe(() => {
  history.push(store.getState());
  console.log(history);
});

setInterval(() => {
  store.dispatch({ type: "increment" });
}, 2000);
