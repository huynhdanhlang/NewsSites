import React, { useState, useEffect } from "react";

import UserService from "../../../services/user.service";
import { Container, Fab } from "@material-ui/core";
import { showModal } from "../../../redux/actions/saga/posts";
import { useDispatch } from "react-redux";
import useStyles from "../../author/BoardAuthor/Styles/style";
import AddUserPost from "./addUser";
import AddIcon from "@material-ui/icons/Add";

export default function AddUser() {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getAllUser().then(
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
    <Container maxWidth={false} className="container">
      <AddUserPost />
      <Fab
        color="secondary"
        className={classes.fab}
        onClick={openCreatePostsModal}
        aria-label="add"
      ><AddIcon /></Fab>
    </Container>
  );
}
