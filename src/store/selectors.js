import { createSelector } from 'reselect';

const moviesSelector = (state) => state.movies;
const userLikesSelector = (state) => state.userLikes;
const userDislikesSelector = (state) => state.userDislikes;

export const categoriesSelector = (state) => {
    let categories = [];
    state.movies.forEach(movie => {if (!categories.includes(movie.category)){categories.push(movie.category)}});
    categories.sort();
    return categories;
}

export const userMoviesSelector = createSelector(
    moviesSelector,
    userLikesSelector,
    userDislikesSelector,
    (movies, likes, dislikes) => movies.map(
        movie => (
            {
                ...movie, 
                userLike: likes.includes(movie.id), 
                userDislike: dislikes.includes(movie.id)
            }
        )
    )
);