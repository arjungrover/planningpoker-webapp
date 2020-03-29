import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import AllReducers from "../reducers";

// Creating store and applying middleware for async operations
export const store = createStore(
    AllReducers,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);
