import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { Paper } from '@material-ui/core';
import { IStudentClass } from '../CoursesAndClasses/CoursesAndClasses';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 200,
      backgroundColor: theme.palette.background.paper,
      maxHeight: 320, 
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
    listData: IStudentClass[]
}
  
const ListView: React.FC<IProps> = ({children, listData}) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

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
        {listData.map((studentClass, index) => {
          return (
            <ListItem
              button
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText primary={studentClass.title}/>
            </ListItem>
            )
          }
        )}
        {/* <Divider /> */}
      </List>
    </Paper>
  );
}


ListView.displayName = "CoursesAndClasses"
export default ListView;