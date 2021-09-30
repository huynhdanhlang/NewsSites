import React from "react";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { updatePosts } from "../../../redux/actions/saga/posts";

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

import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";

export default function PostAll({ post }) {
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
      const span = document.createElement("span");
      const h2 = post.content;
      span.innerHTML = h2;
      const h2Get = span.querySelector("h2").textContent;

      const spanElement = document.createElement("span");
      spanElement.innerText = h2Get;
      const h2Element = document.createElement("h2");
      h2Element.append(spanElement);
      h2Element.querySelector(
        "span"
      ).style.cssText = `color: rgb(22, 22, 22); font-family: "Noto Serif", serif;
      font-style: normal; font-variant-ligatures: normal; 
      font-variant-caps: normal; font-weight: 400; 
      letter-spacing: normal; orphans: 2; text-align: left;
      text-indent: 0px; text-transform: none; white-space: normal;
      widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;
      background-color: rgb(255, 255, 255); text-decoration-thickness: initial; 
      text-decoration-style: initial; text-decoration-color: initial;
      float: none; display: inline !important; font-size: 17px;`;
      console.log(h2Element.outerHTML);
      seth2State(h2Element.outerHTML);
    } catch (error) {}
  }, []);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src="" />}
        title={post.author.fullname}
        subheader={moment(post.updatedAt).format("YYYY-MM-DD HH:mm")}
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
