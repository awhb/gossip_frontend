import { CommentModel } from '../models/redux-model';

import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

type Props = {
    comment: CommentModel;
    styled: boolean;
};

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

const CommentItem: React.FC<Props> = ({ comment, styled }) => {
    const classes = useStyles();

    if (styled) {
        return (
            <Card className={classes.commentCard}>
                <CardContent>
                    <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                        {comment.content}
                    </Typography>
                    <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                        {'Posted by ' + comment.creator + ' on ' + comment.created_at.toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    // unstyled
    return (
        <li className={classes.commentBody}>
            {comment.content}
            <br />
            <em>{'Posted by ' + comment.creator + ' on ' + comment.created_at.toLocaleString()}</em>
        </li>
    );
};

export default CommentItem;
