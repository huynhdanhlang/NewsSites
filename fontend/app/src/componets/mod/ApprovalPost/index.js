import React from "react";
import { Grid,Container } from "@material-ui/core";
import Post from "./Posts/index";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/saga/posts";

import { postsState$, userState$ } from "../../../redux/selector/index";
// import { modalEditState$ } from "../../../redux/selector/index";

export default function PostsList() {
  const dispatch = useDispatch();
  // const { user: currentUser } = useSelector(userState$);

  const posts = useSelector(postsState$);

  console.log(["PostsList - posts"], posts);

  React.useEffect(() => {
    dispatch(actions.getPostsAll.getPostsARequest());
  }, [dispatch]);

  return (
    <Container maxWidth={false} className="container">

    <Grid container spacing={2} alignItems="stretch">
      {posts.map((post, index) => (
        <Grid key={post._id} item xs={12} sm={4}>
          <Post index={index} post={post} />
        </Grid>
      ))}
    </Grid>
    </Container>
  );
}
