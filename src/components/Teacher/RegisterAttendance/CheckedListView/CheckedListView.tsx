import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Paper } from '@material-ui/core';
import { IStudent } from '../../../../services/RegisterAttendanceService';
import { ISubject, IStudentClass } from '../../../../redux/RegisterAttendanceData/RegisterAttendanceDataTypes';

import useStyles from './CheckedListViewStyles';
import { IModule } from '../../../../redux/RegisterAttendanceData/RegisterAttendanceDataTypes'
interface IProps{
    children?: React.ReactNode[],
    listData: IStudentClass[] | IModule[] | ISubject[] | IStudent[],
    onChange: Function,
    allowMultiToggle?: boolean
}

const CheckedListView: React.FC<IProps> = ({children, listData, onChange, allowMultiToggle}) => {
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

  // Handles toggling of checkmarks in list
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    // if the checkmark was not in list
    if (currentIndex === -1) {
      // Then add it to list
      newChecked.push(value);

      // Handles if the list can toggle on all checkmarks in list between min and max index
      if(allowMultiToggle && newChecked.length >= 3){
        newChecked.sort();
        const firstItem = newChecked[1];    
        const lastItem = newChecked[newChecked.length-1];
        
        // Removes all elements from list except the -1 at index 0
        newChecked.splice(1, newChecked.length-1);

        // Adds the missing indexes between first and the last item
        for (let i = firstItem; i < lastItem + 1; i++) {
          newChecked.push(i);
        }
      }
      // else then checkmark is in list
    } else {
      // Removes the chosen checkmark from list
      newChecked.splice(currentIndex, 1);
    }
    // Updates the checkmark state
    setChecked(newChecked);
  };

  function isModule(item: IModule | IStudentClass | ISubject | IStudent): item is IModule {
    return (item as IModule).timespan !== undefined;
  }

  function isStudent(item: IModule | IStudentClass | ISubject | IStudent): item is IStudent {
    return (item as IStudent).title !== undefined;
  }

  return (
    <Paper className={classes.root} variant="outlined" >
        <List component="nav">
          {listData.map((item: IModule | IStudentClass | ISubject | IStudent, index: number) => {
              const labelId = `checkbox-list-label-${index}`;

              let labelText;
              if(isModule(item)){
                labelText = `${item.timespan.start}-${item.timespan.end}`
              }else if(isStudent(item)){
                labelText = item.title;
              }else{
                labelText = item;
              }

              //const labelText = "flot"
              return (
                <ListItem key={`listitem-${index}`} role={undefined} dense button onClick={handleToggle(index)}> 
                    <Checkbox
                        edge="start"
                        key={index}
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        color="primary"
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                    <ListItemText id={labelId} primary={labelText} /> 
                </ListItem>
              );
          })}
        </List>
    </Paper>
  );
}

export default CheckedListView;