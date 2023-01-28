
import Posts from '../../components/Posts';
import React, { useEffect } from 'react';
import ToggleSearchBar from '../../components/ToggleSearchBar';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';


const Home: React.FC = () => {
    const allPosts = useAppSelector(state => state.posts.all_posts);
    const dispatch = useAppDispatch();

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