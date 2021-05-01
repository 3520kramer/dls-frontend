import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      maxWidth: 250,
      maxHeight: 420, 
      minHeight: 420,
      overflow: 'auto',
      margin: 'auto',
    },
    paper: {
        flexGrow: 1,
        width: '100%',
        margin: 'auto',
      },
  }),
);

export default useStyles;