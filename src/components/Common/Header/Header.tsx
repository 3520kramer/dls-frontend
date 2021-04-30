import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import { useParams } from 'react-router';
import useStyles from './HeaderStyles';
import MenuItem from '@material-ui/core/MenuItem';
import IconWithDropdown from './IconWithDropdown/IconWithDropdown'
import { RouteComponentProps } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';

interface IProps extends RouteComponentProps{
  activeCodes: number
}

interface IParams{
  page: string
}

const Header: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();
  const { page } = useParams<IParams>();

  useEffect(() => {
    console.log("header", page);
  },[]);

  const handleSignOut = () => {
    props.history.push("/");
  }
  
  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          item
        </Grid>
        <Grid item xs={4}>
          item
        </Grid>
      </React.Fragment>
    );
  }
  const CodeGrid = () => {
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
        </Grid>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Skoleprotokol 2.0
          </Typography>
          {/* page === "teacher" &&
            <IconWithDropdown
              buttonAriaLabel="show profile"
              className={classes.buttons}
              buttonIcon={
                <Badge badgeContent={props.activeCodes} color="secondary">
                  <AccessAlarmsIcon />
                </Badge>
              }
            >
              <MenuItem onClick={() => handleSignOut()}>Sign out</MenuItem>
              <CodeGrid/>
            </IconWithDropdown>
          */}
          <IconWithDropdown
            buttonIcon={<AccountCircleIcon fontSize="large"/>}
            buttonAriaLabel="show profile"
            className={classes.buttons}
          >
            <MenuItem onClick={() => handleSignOut()}>Sign out</MenuItem>
          </IconWithDropdown>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;