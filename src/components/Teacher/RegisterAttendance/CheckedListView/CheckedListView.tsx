import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Paper } from '@material-ui/core';
import { IStudentClass } from '../../../../services/CoursesAndClassesService';

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
    listData: IStudentClass[],
    onChange: Function,
}

const CheckedListView: React.FC<IProps> = ({children, listData, onChange}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([-1]); // initialize as -1 to leave list unchecked

  // When the user toggles a class in the list, then the 
  // checked state will change and we will need to update the parent component
  useEffect(() => {
    if(listData.length >= 1){
      // Uses filter to remove the -1 as it is not an index
      let indexes = checked.filter(index => index !== -1)
      onChange(indexes);
    }
  }, [checked])

  // When a new course is chosen listData will change and we will reset the checked list
  useEffect(() => {
    setChecked([-1])
  },[listData]);

  // Handles toggling of classes in list
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
          {listData.map((item, index) => {
              const labelId = `checkbox-list-label-${index}`;
              return (
                <ListItem key={`listitem-${index}`} role={undefined} dense button onClick={handleToggle(index)}>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                    <ListItemText id={labelId} primary={item.title} />
                </ListItem>
              );
          })}
        </List>
    </Paper>
  );
}

export default CheckedListView;