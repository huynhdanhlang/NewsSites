import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import UserService from "../../services/user.service";
import PostAll from "./getPost/index";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/saga/posts";
import { Container } from "@material-ui/core";
import { postsState$ } from "../../redux/selector/index";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        console.log(response);
        setContent(response.data);
      },
      (error) => {
        console.log(error);
        const _content =
          (error.message && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  const dispatch = useDispatch();
  //const { user: currentUser } = useSelector(userState$);

  const posts = useSelector(postsState$);

  console.log(["PostsList - All posts"], posts);

  React.useEffect(() => {
    dispatch(actions.getPostsAll.getPostsARequest());
  }, [dispatch]);

  return (
    <Container maxWidth={false} className="container">
      <div style={{ marginTop: 100 }}></div>
      <Grid container spacing={2} alignItems="stretch">
        {posts.map(
          (post) =>
            post.isChecked && (
              <Grid key={post._id} item xs={12} sm={4}>
                <PostAll post={post} />
              </Grid>
            )
        )}
      </Grid>
    </Container>
  );
};

export default Home;
