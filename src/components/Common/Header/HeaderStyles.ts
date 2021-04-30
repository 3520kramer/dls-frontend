import { red } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    buttons: {
      marginLeft: '20px'
    },
    gridRow: {
      color: 'red'
    }
  }),
);

export default useStyles;