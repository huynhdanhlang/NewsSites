import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    height: 150,
  },
  iconHover: {
    "&:hover": {
      border: "2px solid green",
      color: "black",
      //TODO display the text CREATE ITEM instead of AddIcon
    },
  },

  floatBtn: {
    marginRight: theme.spacing(1),
  },
  overrideMe: {
    width: "500px",
    "word-break": "break-all",
    "overflow-wrap": "break-word",
    display: "block",
  },
}));
