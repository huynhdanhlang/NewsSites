import React from "react";
import { Grid } from "@material-ui/core";
import Post from "./Posts/index";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/saga/posts";

import { postsState$, userState$ } from "../../../redux/selector/index";

export default function PostsList() {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector(userState$);

  const posts = useSelector(postsState$);

  console.log(["PostsList - posts"], posts);

  React.useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest(currentUser.id));
  }, [dispatch, currentUser]);

  return (
    <Grid container spacing={2} alignItems="stretch">
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={3}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
}
