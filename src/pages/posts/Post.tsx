import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchSelectedPost, deletePost } from '../../store/posts/post-actions';
import postSlice from '../../store/posts/postSlice';
import { Button } from '@material-ui/core';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Comments from '../../components/Comments';

export const postActions = postSlice.actions;

const Post: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { post_id } = useParams();
    const post = useAppSelector(state => state.posts.selected_post);
    const current_user = useAppSelector(state => state.users.current_user);
    const isCreator = post.user_id === current_user.id;

    useEffect(() => {
        dispatch(fetchSelectedPost(parseInt(post_id as string)));
    }, [dispatch, post_id]);

    const handleDelete = () => {
        dispatch(deletePost(parseInt(post_id as string)));
        navigate("/");
    };

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {isCreator && (
                <div>
                    <Button variant="contained" color="primary" component={Link} to={`/posts/${post.id}/update`}>
                        Update
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            )}
            <Card>
                <CardContent>
                    <Typography component="p">{'Viewing thread:'}</Typography>
                    <Typography variant="h5" component="h5">
                        {post.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {`by ${post.creator}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {post.content}
                        <br />
                        {`Created at: ${post.created_at}`}
                    </Typography>
                </CardContent>
            </Card>
            <Comments />
        </div>
    );
}

export default Post;