import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import MuiListItem from '@material-ui/core/ListItem';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      maxWidth: 250,
      maxHeight: 420, 
      minHeight: 400,
      overflow: 'auto',
      margin: 'auto' 
    },
    paper: {
      flexGrow: 1,
      width: '100%',
    },
  }),
);

export const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "rgb(66, 83, 175)",
      color: "white"
    },
    "&$selected:hover": {
      backgroundColor: "rgb(66, 83, 175)",
      color: "white",
      opacity: 0.9,
    },
  },
  selected: {}
})(MuiListItem);