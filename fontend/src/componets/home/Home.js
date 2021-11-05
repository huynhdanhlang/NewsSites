import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import UserService from "../../services/user.service";
import PostAll from "./getPost/index";
import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/saga/posts";
import { Container } from "@material-ui/core";
import { postsState$ } from "../../redux/selector/index";
import usePagination from "../Pagination/index";

const Home = () => {
  // const [content, setContent] = useState("");

  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       console.log(response);
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       console.log(error);
  //       const _content =
  //         (error.message && error.response.data) ||
  //         error.message ||
  //         error.toString();
  //       setContent(_content);
  //     }
  //   );
  // }, []);
  const dispatch = useDispatch();
  //const { user: currentUser } = useSelector(userState$);

  let posts = useSelector(postsState$);

  posts = posts.filter((post) => post.isChecked === true);

  React.useEffect(() => {
    dispatch(actions.getPostsAll.getPostsARequest());
  }, []);

  const [page, setPage] = React.useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(posts.length / PER_PAGE);
  const _DATA = usePagination(posts, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Container maxWidth={false} className="container">
      &nbsp;
      <Pagination
        className
        color="primary"
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
      &nbsp;
      <Grid container spacing={2} alignItems="stretch">
        {posts.map(
          (post, index) =>
            post.isChecked && (
              <Grid key={post._id} item xs={12} sm={4}>
                <PostAll index={index} post={post} />
              </Grid>
            )
        )}
      </Grid>
      &nbsp;
      <Pagination
        className
        color="primary"
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
      &nbsp;
    </Container>
  );
};

export default Home;
