import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import initialData from './initialData';
import { moviesReducer, userLikesReducer, userDislikesReducer } from './reducers';

const reducers = combineReducers({
    movies: moviesReducer,
    userLikes: userLikesReducer,
    userDislikes: userDislikesReducer,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export default createStore(
    (state, action) => reducers(state, action),
    initialData,
    composedEnhancer
)