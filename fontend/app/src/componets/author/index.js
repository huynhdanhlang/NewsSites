import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Grid from "@material-ui/core/Grid";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CategoryIcon from "@material-ui/icons/Category";
import BoardAuthor from "./BoardAuthor";
import TopicAuthor from "./TopicAuthor";
import { Link, Switch, Route, Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { history } from "../../helpers/history";
import { showAuthorTutorial } from "../../redux/actions/saga/posts";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
  stickToBottom: {
    alignItems: "center",
  },
});

const SimpleBottomNavigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const onClick = React.useCallback(() => {
    dispatch(showAuthorTutorial());
  }, [dispatch]);
  
  return (
    <Router history={history}>
      <Grid container justifyContent="center">
        <BottomNavigation
          className={classes.stickToBottom}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            onClick={onClick}
            label="Chủ đề"
            icon={<CategoryIcon />}
            component={Link}
            to={"/author/topic"}
          />
          <BottomNavigationAction
            label="Tin tức"
            icon={<PostAddIcon />}
            component={Link}
            to={"/author/posts"}
          />
        </BottomNavigation>
        <Switch>
          <Route path="/author/topic" component={TopicAuthor} />
          <Route exact path="/author/posts" component={BoardAuthor} />
        </Switch>
      </Grid>
    </Router>
  );
};
export default SimpleBottomNavigation;
