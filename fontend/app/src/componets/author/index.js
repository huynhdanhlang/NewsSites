import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Grid from "@material-ui/core/Grid";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CategoryIcon from "@material-ui/icons/Category";
import BoardAuthor from "./BoardAuthor";
import TopicAuthor from "./TopicAuthor";
import { useDispatch } from "react-redux";

import { Link, withRouter, Switch, Route, Router } from "react-router-dom";


import { history } from "../../helpers/history";

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
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.click();
  }, []);

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
            ref={inputRef}
            onClick={() => console.log("")}
            label="Tin tức"
            icon={<PostAddIcon />}
            component={Link}
            to={"/author/posts"}
          />
          <BottomNavigationAction
            label="Chủ đề"
            icon={<CategoryIcon />}
            component={Link}
            to={"/author/topic"}
          />
        </BottomNavigation>
        <Switch>
          <Route path="/author/posts" component={BoardAuthor} />
          <Route path="/author/topic" component={TopicAuthor} />
        </Switch>
      </Grid>
    </Router>
  );
};
export default withRouter(SimpleBottomNavigation);
