import React from 'react';
//import './ToggleSwitch.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

type AppProps = { condition : boolean, setCondition: Function, names: string, label: string }

export default function ToggleSwitch({ condition, setCondition, names, label} : AppProps) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(!condition)
  };

  return (
    <FormControlLabel
        control={<Switch checked={condition} onChange={handleChange} name={names} />}
        label={label}
      />
  );
}
