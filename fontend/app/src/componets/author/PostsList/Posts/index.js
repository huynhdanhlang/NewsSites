import React from "react";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { updatePosts } from "../../../../redux/actions/posts";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
export default function Post({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onLikeButtonClick = React.useCallback(() => {
    dispatch(
      updatePosts.updatePostsRequest({ ...post, likeCount: post.likeCount + 1 })
    );
  }, [dispatch, post]);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src=""/>}
        title={post.author.fullname}
        subheader={moment(post.updatedAt).format("HH:MM MM DD,YYYY")}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardMedia
        image={post.attachment}
        title={post.title}
        className={classes.media}
      />
      <CardContent>
        <Typography variant="h5" color="textPrimary">
          {post.title}
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          {post.content}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton onClick={onLikeButtonClick}>
          <FavoriteIcon />
          <Typography component="span" color="textSecondary">
            {post.likeCount}
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}
