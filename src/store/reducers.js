import { 
    SET_MOVIES,
    ADD_LIKE, 
    ADD_DISLIKE, 
    REMOVE_LIKE, 
    REMOVE_DISLIKE, 
    DELETE_MOVIE,
    USER_LIKE,
    USER_DISLIKE,
    USER_REMOVE_LIKE,
    USER_REMOVE_DISLIKE
} from './actions';

export const moviesReducer = (state = null, action) => {
    switch(action.type){
        case SET_MOVIES:
            return action.payload;
        case ADD_LIKE: 
            return state.map(item => {
                if (item.id === action.id){
                    return {...item, likes: item.likes + 1}
                }
                else {
                    return item;
                }
            });
        case ADD_DISLIKE: 
            return state.map(item => {
                if (item.id === action.id){
                    return {...item, dislikes: item.dislikes + 1}
                }
                else {
                    return item;
                }
            });  
        case REMOVE_LIKE: 
            return state.map(item => {
                if (item.id === action.id){
                    return {...item, likes: item.likes - 1}
                }
                else {
                    return item;
                }
            });
        case REMOVE_DISLIKE: 
            return state.map(item => {
                if (item.id === action.id){
                    return {...item, dislikes: item.dislikes - 1}
                }
                else {
                    return item;
                }
            });                    
        case DELETE_MOVIE: 
            return state.filter(item => item.id !== action.id);
        default: return state;
    }
}

export const userLikesReducer = (state = null, action) => {
    switch(action.type){
        case USER_LIKE:
            return [...state, action.id];
        case USER_DISLIKE, USER_REMOVE_LIKE:
            return state.filter(item => item !== action.id)
        default: return state;
    }
}

export const userDislikesReducer = (state = null, action) => {
    switch(action.type){
        case USER_DISLIKE:
            return [...state, action.id];
        case USER_LIKE, USER_REMOVE_DISLIKE:
            return state.filter(item => item !== action.id)        
        default: return state;
    }
}