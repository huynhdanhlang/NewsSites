import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Grid from "@material-ui/core/Grid";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CategoryIcon from "@material-ui/icons/Category";
import BoardAuthor from "./BoardAuthor";
import { Link, withRouter, Switch, Route } from "react-router-dom";

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

  return (
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
          label="Tin tức"
          icon={<PostAddIcon />}
          component={Link}
          to={"/author"}
        />
        <BottomNavigationAction label="Chủ đề" icon={<CategoryIcon />} />
      </BottomNavigation>
      <Switch>
        <Route path="/author" component={BoardAuthor} />
      </Switch>
    </Grid>
  );
};
export default withRouter(SimpleBottomNavigation);
