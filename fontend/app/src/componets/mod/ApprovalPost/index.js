import React from "react";
import { Grid, Container } from "@material-ui/core";
import Post from "./Posts/index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/saga/posts";
import AlertDialog from "./Posts/Preview/index";
import { postsState$, showDialogState$ } from "../../../redux/selector/index";
import { showDialog } from "../../../redux/actions/saga/posts";

export default function PostsList() {
  const dispatch = useDispatch();
  const { isShowDialog } = useSelector(showDialogState$);

  const posts = useSelector(postsState$);

  console.log(["PostsList - posts"], posts);

  React.useEffect(() => {
    dispatch(actions.getPostsAll.getPostsARequest());
  }, [dispatch]);
  const postIndex = JSON.parse(localStorage.getItem("postIndex"));

  return (
    <Container maxWidth={false} className="container">
      <Grid container spacing={2} alignItems="stretch">
        {posts.map((post, index) => (
          <Grid key={post._id} item xs={12} sm={4}>
            <Post index={index} post={post} />
          </Grid>
        ))}
      </Grid>
      {isShowDialog && <AlertDialog preview={posts[postIndex]} />}
    </Container>
  );
}
