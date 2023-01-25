import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { CommentModel } from '../models/redux-model';
import { deleteComment, fetchComments } from '../store/comments/comment-actions';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchComments());
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
            <Typography color="textSecondary" className={classes.metadata} gutterBottom>
              {'Posted by ' + comment.creator + ' on ' + comment.created_at.toLocaleString()}
              {comment.updated_at ? ' and last updated on ' + comment.updated_at.toLocaleString() : ''}
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
