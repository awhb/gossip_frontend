import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import postSlice from '../store/posts/postSlice';
import { TextField, FormControlLabel, Switch } from '@material-ui/core';
import { PostModel } from '../models/redux-model';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const postActions = postSlice.actions;


const ToggleSearchBar: React.FC = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [searchByCategory, setSearchByCategory] = useState(false);
  const allPosts = useAppSelector(state => state.posts.all_posts);
  let filteredPosts: PostModel[];
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const searchTerms = searchValue.toLowerCase().split(',');
    const filtered_posts = allPosts.filter(post => searchByCategory
      ? post.categories.some(category => searchTerms.includes(category))
      : post.title.toLowerCase().includes(searchValue.toLowerCase()));
    dispatch(postActions.setFilteredPosts(filtered_posts));
  };

  const handleSearchByCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchByCategory(e.target.checked);
  };

  return (
    <FormControl className={classes.formControl}>
      <TextField
        id="search"
        label="Search"
        value={searchValue}
        onChange={handleSearch}
      />
      <FormControlLabel
        control={<Switch checked={searchByCategory} onChange={handleSearchByCategory}
          name="searchBy"
          color="primary"
        />
        }
        label={!searchByCategory ? 'Search by Title' : 'Search by Category'}
      />
    </FormControl>
  );
};

export default ToggleSearchBar;

