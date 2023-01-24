import CommentItem from './CommentItem';
import { CommentModel } from '../models/redux-model';

import React from 'react';

type Props = {
    styled: boolean;
};

const BasicCommentList: React.FC<Props> = ({ styled }: Props) => {
    const comments: CommentModel[] = [];

    return (
        <ul>
            {comments.map((comment) => (
                <CommentItem comment={comment} styled={styled} key="" />
            ))}
        </ul>
    );
};

export default BasicCommentList;
