import React, { useState, useEffect } from 'react';
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
import { useOktaAuth } from '@okta/okta-react';
import { IUserInfo } from './../../Authentication/AuthInterfaces'
interface IProps extends RouteComponentProps{
  activeCodes: number
}

interface IParams{
  page: string
}

const Header: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();
  const { page } = useParams<IParams>();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  
  useEffect(() => {
    console.log("header", page);
  },[]);

  useEffect(() => {
    console.log("userInfo", userInfo);
  },[userInfo]);
  
  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info: any) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const logout = async () => {
    oktaAuth.signOut();
    oktaAuth.tokenManager.clear();
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
          <Typography variant="h5" className={classes.title}>
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
          {authState.isAuthenticated &&// userInfo !== null &&
          <>
            <Typography variant="h6">
              Hi, {userInfo !== null ? userInfo.name : ""}
            </Typography>
            <IconWithDropdown
              buttonIcon={<AccountCircleIcon fontSize="large"/>}
              buttonAriaLabel="show profile"
              className={classes.buttons}
            >
              {authState.isAuthenticated && <MenuItem onClick={logout}>Sign out</MenuItem>}
              {!authState.isPending && !authState.isAuthenticated && <MenuItem onClick={logout}>Sign in</MenuItem>}
            </IconWithDropdown>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;