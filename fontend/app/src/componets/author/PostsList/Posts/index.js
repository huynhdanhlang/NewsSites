import React from "react";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { updatePosts } from "../../../../redux/actions/saga/posts";

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

  const [h2state, seth2State] = React.useState(null);

  React.useEffect(() => {
    try {
      const h2Element = document.createElement("span");
      const h2 = post.content;
      h2Element.innerHTML = h2;
      const h2Get = h2Element.querySelector("h2");
      console.log(h2Get.outerHTML);
      seth2State(h2Get.outerHTML);
    } catch (error) {}
  }, []);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src="" />}
        title={post.author.fullname}
        subheader={moment(post.updatedAt).format("YYYY-MM-DD HH:mm")}
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
        {console.log(post.content.length)}
        <Typography
          style={{ wordWrap: "break-word" }}
          variant="body2"
          component="p"
          color="textSecondary"
          dangerouslySetInnerHTML={{
            __html: `${h2state}`,
          }}
        ></Typography>
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
