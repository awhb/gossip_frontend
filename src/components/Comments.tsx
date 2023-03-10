import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { CommentModel } from '../models/redux-model';
import { deleteComment, fetchComments } from '../store/comments/comment-actions';
import { fetchSelectedPost } from '../store/posts/post-actions';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  commentBody: {
    fontSize: 16,
    whiteSpace: 'pre-wrap',
    paddingBottom: '1em',
  },
  commentCard: {
    marginBottom: '1em',
  },
  metadata: {
    fontSize: 14,
  },
});



const Comments: React.FC = () => {
  const classes = useStyles();
  const comments: CommentModel[] = useAppSelector(state => state.comments.all_comments);
  const dispatch = useAppDispatch();
  const current_user = useAppSelector(state => state.users.current_user);
  const current_post = useAppSelector(state => state.posts.selected_post);
  const navigate = useNavigate();
  const { post_id } = useParams();

  useEffect(() => {
    dispatch(fetchSelectedPost(parseInt(post_id as string)));
  }, [dispatch]);

  useEffect(() => {
    if (current_post.id !== 0) {
      dispatch(fetchComments(current_post.id));
    }
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteComment(id));
    navigate("/");
  };

  return (
    <div>
      <Link to={`/comments/new`}>Create Comment</Link>
      {comments.map(comment => (
        <Card className={classes.commentCard} key={comment.id}>
          <CardContent>
            <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
              {comment.content}
            </Typography>
            {comment.user_id === current_user.id &&
              <div>
                <Button variant="contained" color="primary" component={Link} to={`/comments/${comment.id}/update`}>
                  Update
                </Button>
                <Button variant="contained" color="secondary" onClick={()=> handleDelete(comment.id)}>
                  Delete
                </Button>
              </div>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Comments;
