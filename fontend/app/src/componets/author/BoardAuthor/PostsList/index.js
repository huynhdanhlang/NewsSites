import React from "react";
import { Grid } from "@material-ui/core";
import Post from "./Posts/index";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions/saga/posts";

import { postsState$, userState$ } from "../../../../redux/selector/index";
import { modalEditState$ } from "../../../../redux/selector/index";
import EditPost from "./Posts/EditPost/index";

export default function PostsList() {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector(userState$);

  const posts = useSelector(postsState$);

  console.log(["PostsList - posts"], posts);

  React.useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest(currentUser.id));
  }, [dispatch, currentUser]);
  const { isShowEdit } = useSelector(modalEditState$);
  const postIndex = JSON.parse(localStorage.getItem("postIndex"));

  return (
    <Grid container spacing={2} alignItems="stretch">
      {posts.map((post, index) => (
        <Grid key={post._id} item xs={12} sm={4}>
          <Post index={index} post={post} />
        </Grid>
      ))}
      {isShowEdit && <EditPost post={posts[postIndex]} />}
    </Grid>
  );
}
