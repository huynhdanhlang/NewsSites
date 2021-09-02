import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import { Container, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Header from "./Header/index";
import PostsList from "./PostsList/index";
import useStyles from "./Styles/style";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions/saga/posts";
import CreatePostsModel from "./CreatePostsModel/index";

const BoardAuthor = () => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getAuthorBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const openCreatePostsModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  const classes = useStyles();

  return (
    // <div className="container">
    //   <header className="jumbotron">
    //     <h3>{content}</h3>
    //   </header>
    // </div>
    <Container maxWidth="lg" className="container">
      <Header />
      <CreatePostsModel />
      <PostsList />
      <Fab
        color="primary"
        className={classes.fab}
        onClick={openCreatePostsModal}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default BoardAuthor;
