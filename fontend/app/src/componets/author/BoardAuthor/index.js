import React, { useState, useEffect } from "react";

import UserService from "../../../services/user.service";
import { Container, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Header from "./Header/index";
import PostsList from "./PostsList/index";
import useStyles from "./Styles/style";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../redux/actions/saga/posts";
import CreatePostsModel from "./CreatePostsModel/index";
// import EditPost from "./PostsList/Posts/index";
import { modalState$ } from "../../../redux/selector/index";
import { retrieveParentTopic } from "../../../redux/actions/thunk/parentTopic";

const BoardAuthor = () => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(retrieveParentTopic());
  }, []);

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

  const { isShow } = useSelector(modalState$);

  return (
    // <div className="container">
    //   <header className="jumbotron">
    //     <h3>{content}</h3>
    //   </header>
    // </div>
    <Container maxWidth={false} className="container">
      <Header />
      {isShow ? <CreatePostsModel /> : ""}
      {isShow === false && <PostsList />}
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
