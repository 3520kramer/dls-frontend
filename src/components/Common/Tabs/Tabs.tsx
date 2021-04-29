import React, { useState } from 'react';
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

interface IComponent{
  component: React.ReactNode, 
  label: string
}

type Props = {
  components: IComponent[],
  onTabChange: Function
}

export default function CenteredTabs({ components, onTabChange }: Props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    onTabChange();
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
          {components.map((item, index) => <Tab key={index} label={item.label} className={classes.tabs}/>)}
        </Tabs>
      </Paper>
      <Paper className={classes.paper}>
        {components[value].component}
      </Paper>      
    </>
  );
}