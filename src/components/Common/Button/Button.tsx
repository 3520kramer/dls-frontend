import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

interface IProps {
  children?: React.ReactNode,
}

const ContainedButton: React.FC<IProps> = ({children}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        {children}
      </Button>
    </div>
  );
}

export default ContainedButton;
