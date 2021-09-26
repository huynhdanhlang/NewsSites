import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";


import { Container, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
// import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../author/BoardAuthor/Styles/style";
// import Register from "../register/Register";
import { Router, Switch, Route, Link } from "react-router-dom";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
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
  // const addMember = React.useCallback(() => {
  //   dispatch(showModal());
  // }, [dispatch]);
  const classes = useStyles();
  return (
    <Container maxWidth={false} className="container">
       
      <Fab
        color="secondary"
       className={classes.fab}
      //  onClick={addMember}
       aria-label="add"
      >
        <Link to={"/register"} className="nav-link">
        <AddIcon />       
        </Link>
        
      </Fab>
      
    </Container>
  );
};

export default BoardAdmin;
