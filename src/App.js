import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { movies$ } from './MockData/movies';
import { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { setMovies, deleteMovie, userLike, userDislike } from './store/actions';
import FormControl from '@material-ui/core/FormControl';
import { userMoviesSelector, categoriesSelector } from './store/selectors';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Tile from './components/tile';
import Pagination from '@material-ui/lab/Pagination';
import { PAGINATION_SIZES } from './utils/constants';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorScreen from './components/error-screen';

const useStyles = makeStyles((theme) => ({
  formControlSmall: {
    margin: theme.spacing(1),
    minWidth: 130,
    maxWidth: 130,
    float: 'right',
    display: 'inline-block',
    margin: '0 10px',
  },
  formControlLarge: {
    margin: theme.spacing(1),
    minWidth: 180,
    maxWidth: 450,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

function App() {
  const classes = useStyles();

  const [filters, setFilters] = useState([]);
  const [pagination, setPagination] = useState((PAGINATION_SIZES.length ? PAGINATION_SIZES[0] : 0))
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();

  const movies = useSelector(
    state => userMoviesSelector(state).filter(movie => (filters.length ? filters.includes(movie.category) : true))
    , shallowEqual
  );
  const categories = useSelector(categoriesSelector, shallowEqual);

  useEffect(async () => {
    setLoading(true);
    try{
      await movies$.then((result) => {
        dispatch(setMovies(result));
      });
      setLoading(false);
    }
    catch(error){
      console.error('loading data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setFilters(filters.filter(item => categories.includes(item)))
  }, [categories])

  let onMouseDown = (event) => {
    event.stopPropagation();
  }
  
  let handleRemoveFilter = (chip) => () => {    
    setFilters(filters.filter(item => item !== chip));
  }

  let handlePaginationChange = (event) => {
    setPagination(event.target.value)
    setPage(1);
  }

  let handleCategoryChange = (event) => {
    setFilters(event.target.value);
    setPage(1);
  }

  let handlePageChange = (event, value) => {
    setPage(Math.min(value, Math.ceil(movies.length/pagination)));
  }
  
  return (
    <div>
      <div className="app-movies">
        <div className="app-movies-header">
          <div className="app-title">{`Movies`}</div>
          <FormControl className={classes.formControlLarge}>
            <InputLabel
              id='category-label'
            >
                {'Displayed categories:'}
            </InputLabel>             
            <Select 
              labelId='category-label'
              id='category-value'
              multiple
              value={filters}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip 
                      key={value} 
                      label={value} 
                      onDelete={handleRemoveFilter(value)}
                      onMouseDown={onMouseDown}
                      className={classes.chip} 
                    />
                  ))}
                </div>
              )}            
              onChange={handleCategoryChange}
            >
              {
                categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="app-movies-content">
          {
            loading
              ? <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
                  <CircularProgress size={150} thickness={3} />
                </div>
              : (movies.length > 0
                ? movies
                  .slice((page - 1)*pagination, page*pagination)
                  .map(
                    movie => 
                      <Tile 
                        key={movie.id} 
                        like={() => {dispatch(userLike(movie.userLike, movie.userDislike, movie.id))}}
                        dislike={() => {dispatch(userDislike(movie.userLike, movie.userDislike, movie.id))}}
                        delete={() => {dispatch(deleteMovie(movie.id))}}
                        {...movie}
                      />
                  )
                : <ErrorScreen message="No movies found in database" />)
          }
        </div>
        <div className="app-movies-footer">
          <div className="pagination-block">
            <Pagination 
              count={Math.ceil(movies.length / pagination)} 
              page={page} 
              onChange={handlePageChange}
              color="primary" 
            />
            <div className="pagination-total-elements">
              {`${movies.length} movie${movies.length > 1 ? 's' : ''} found.`}
            </div>
          </div>
          <FormControl className={classes.formControlSmall}>
            <InputLabel
              id='pagination-label'
            >
                {'Movies by page:'}
            </InputLabel>
            <Select
              labelId='pagination-label'
              id='pagination-value'
              value={pagination}
              onChange={handlePaginationChange}
            >
              {PAGINATION_SIZES.map(size => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select> 
          </FormControl>        
        </div>
      </div>
      <div className="app-responsive-error">
        <ErrorScreen 
          message="This window size is not supported"
        />
      </div>      
    </div>
  );
}

export default App;
