export const SET_MOVIES = 'SET_MOVIES';
export const ADD_LIKE = 'ADD_LIKE';
export const ADD_DISLIKE = 'ADD_DISLIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const REMOVE_DISLIKE = 'REMOVE_DISLIKE';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const USER_LIKE = 'USER_LIKE';
export const USER_DISLIKE = 'USER_DISLIKE';
export const USER_REMOVE_LIKE = 'USER_REMOVE_LIKE';
export const USER_REMOVE_DISLIKE = 'USER_REMOVE_DISLIKE';

export const setMovies = (payload) => ({
    type: SET_MOVIES,
    payload: payload,
})

export const addLike = (id) => ({
    type: ADD_LIKE,
    id
})

export const addDislike = (id) => ({
    type: ADD_DISLIKE,
    id
})

export const removeLike = (id) => ({
    type: REMOVE_LIKE,
    id
})

export const removeDislike = (id) => ({
    type: REMOVE_DISLIKE,
    id
})

export const deleteMovie = (id) => ({
    type: DELETE_MOVIE,
    id
})

export const likeMovie = (id) => ({
    type: USER_LIKE,
    id
})

export const dislikeMovie = (id) => ({
    type: USER_DISLIKE,
    id
})

export const userRemoveLike = (id) => ({
    type: USER_REMOVE_LIKE,
    id
})

export const userRemoveDislike = (id) => ({
    type: USER_REMOVE_DISLIKE,
    id
})

export const userLike = (like, dislike, id) => {
    return dispatch => {
        if (dislike){
            dispatch(removeDislike(id));
            dispatch(userRemoveDislike(id));
        }
        if(!like){
            dispatch(addLike(id));
            dispatch(likeMovie(id));
        }
        else{
            dispatch(removeLike(id));
            dispatch(userRemoveLike(id))
        }
    }
}

export const userDislike = (like, dislike, id) => {
    return dispatch => {
        if (like){
            dispatch(removeLike(id));
            dispatch(userRemoveLike(id));
        }
        if(!dislike){
            dispatch(addDislike(id));
            dispatch(dislikeMovie(id));
        }
        else{
            dispatch(removeDislike(id));
            dispatch(userRemoveDislike(id))
        }
    } 
} 