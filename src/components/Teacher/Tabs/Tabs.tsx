import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minWidth: '600px',
    width: '50%',
    margin: 'auto',
    marginTop: '5px',
  },
  tabs: {
    minWidth: '300px'
  },
  paper: {
    width: '85%',
    height: '100%',
    margin: 'auto',
    marginTop: '10px'
  },
});

type AppProps = { RegisterAttendance: React.FC, AttendeeStatistics: React.FC };

export default function CenteredTabs({ RegisterAttendance, AttendeeStatistics }: AppProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Register Student Attendance" className={classes.tabs}/>
          <Tab label="View Attendee Statistics" className={classes.tabs}/>
        </Tabs>
      </Paper>
      <Paper className={classes.paper}>
        { value === 0 ? <RegisterAttendance/> : <AttendeeStatistics/> }
      </Paper>      
    </>
  );
}
