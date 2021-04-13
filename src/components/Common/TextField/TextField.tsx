import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MUITextField from '@material-ui/core/TextField';

type AppProps = { 
    id?: string,
    type: string,
    variant?: string,
    label?: string,
    onChange: Function, 
    disabled?: boolean,
    value: number,
    showError?: boolean,
}

// This is styling for the textField
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}),
);

// this is the component for our textField we use in Geo service 
export default function TextField({type, label, onChange, disabled, value, showError} : AppProps) {
  const classes = useStyles();
  

  // function for handling the input we recieve in the tesxtField (has some problems in firefox)
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleTextChange in textfield", event.target.value);
    if (event.target.value !== undefined && event.target.value.match("^[0-9]*$") && event.target.value.length <= 3) {
      onChange(event.target.value);
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <MUITextField
            value={value}
            id="filled-basic" 
            variant="filled"
            type={type}
            label={label}
            onChange={handleTextChange}
            disabled={disabled}
            error={showError}
        />
    </form>
  );
}