
import Posts from '../../components/Posts';
import React, { useEffect } from 'react';
import ToggleSearchBar from '../../components/ToggleSearchBar';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import postSlice from '../../store/posts/postSlice';

export const postActions = postSlice.actions;

const allPosts = useAppSelector(state => state.posts.all_posts);
const dispatch = useAppDispatch();

useEffect(() => {
    dispatch(postActions.setFilteredPosts(allPosts));
}, [allPosts, dispatch]);

const Home: React.FC = () => {
    return (
        <>
            <h3>
                {"Welcome to Gossip On Rails!"}
            </h3>
            <br />
            
            <ToggleSearchBar />
            <Posts />
        </>
    );
};

export default Home;
