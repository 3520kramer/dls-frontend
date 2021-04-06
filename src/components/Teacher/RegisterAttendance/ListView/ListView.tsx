import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Paper } from '@material-ui/core';
import { ICourse } from '../../../../services/CoursesAndClassesService';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 200,
      backgroundColor: theme.palette.background.paper,
      maxHeight: 320, 
      minHeight: 320,
      overflow: 'auto',
      margin: 'auto',
    },
    paper: {
      flexGrow: 1,
      width: '100%',
    },
    /* nested: {
      paddingLeft: theme.spacing(4),
    }, */
  }),
);

interface IProps{
    children?: React.ReactNode[],
    listData: ICourse[],
    onChange: Function,
}
  
const ListView: React.FC<IProps> = ({children, listData, onChange}) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    console.log("selected")
    onChange(listData[selectedIndex])
  }, [selectedIndex])

  return (
    <Paper className={classes.root} variant="outlined" >
      <List 
        component="nav" 
        aria-label="secondary mailbox folder"
        /*         
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Classes/Courses
          </ListSubheader>
        }   
        */
      >
        {listData.map((item, index) => {
          return (
            <ListItem
              button
              key={index}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText primary={item.title}/>
            </ListItem>
            )
          }
        )}
      </List>
    </Paper>
  );
}
export default ListView;
