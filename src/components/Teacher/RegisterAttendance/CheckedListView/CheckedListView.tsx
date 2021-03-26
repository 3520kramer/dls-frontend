import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 200,
      minHeight: '320px',
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
    },
    paper: {
        flexGrow: 1,
        minWidth: '600px',
        width: '100%',
        margin: 'auto',
      },
  }),
);

interface IProps{
    children?: React.ReactNode[],
    listData: any //IStudentClass[]
}

const CheckedListView: React.FC<IProps> = ({children, listData}) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Paper className={classes.root} variant="outlined" >
        <List className={classes.root}>
        {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
                <>
            <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                <ListItemText id={labelId} primary={`Module ${value + 1}`} />
            </ListItem>
            </>
            );
        })}
        </List>
    </Paper>
  );
}

export default CheckedListView;