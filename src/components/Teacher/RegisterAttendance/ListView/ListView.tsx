import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import { ListItem, useStyles } from "./ListViewStyles";
import ListItemText from '@material-ui/core/ListItemText';
import { Paper } from '@material-ui/core';
import { ISubject } from '../../../../redux/RegisterAttendanceData/RegisterAttendanceDataTypes';

interface IProps{
    children?: React.ReactNode[],
    listData: ISubject[],
    onChange: Function,
}
  
const ListView: React.FC<IProps> = ({children, listData, onChange}) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0); // initialize as 0 to have first item as default selected
  
  // We will pass the state to the parent component, when the user chooses
  // a new item in list, or when the listData has finished the initial load
  useEffect(() => {
    if (listData.length >= 1) onChange(selectedIndex)
  }, [selectedIndex, listData])

  const handleListItemClick = (index: number) => setSelectedIndex(index);
  return (
    <Paper className={classes.root} variant="outlined" >
      <List component="nav">
        {listData.map((item, index) => {
          return (
            <ListItem
              button
              key={index}
              color="primary"
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
            >
              <ListItemText primary={item}/>
            </ListItem>
            )
          }
        )}
      </List>
    </Paper>
  );
}
export default ListView;
