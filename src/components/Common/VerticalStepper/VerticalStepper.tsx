import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: '10px',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    buttons: {
      textAlign: 'center',
    },
    stepper: {
      minHeight: '500px',
      padding: '50px 100px'
    },
  }),
);

function getSteps() {
  return ['Select subject and class', 'Configure your code', 'Get generated code'];
}

function getStepContent(stepIndex: number, props: IProps) {
  switch (stepIndex) {
    case 0:
      return props.SubjectsAndClasses;
    case 1:
      return props.Geo;
    case 2:
      return props.GenerateCode;
    default:
      return 'Unknown stepIndex';
  }
}

interface IProps{
  SubjectsAndClasses: React.ReactNode,
  GenerateCode: React.ReactNode,
  Geo: React.ReactNode,
  isNextButtonDisabled: boolean,
  onLastStep: Function,
  hasReset: Function
}


const VerticalStepper: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = getSteps();

  useEffect(()=> {
    console.log("onLastStep", activeStep)
    activeStep === steps.length - 1 ? props.onLastStep(true) : props.onLastStep(false);
    // eslint-disable-next-line
  },[activeStep])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    props.hasReset();
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <div className={classes.stepper} >
        {getStepContent(activeStep, props)}
      </div>
      <div className={classes.buttons}>
        {activeStep !== 2 &&
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.backButton}
          >
            Back
          </Button>
        }
        <Button variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? handleReset : handleNext} disabled={props.isNextButtonDisabled}>
          {activeStep === steps.length - 1 ? 'Create new attendance registration' : 'Next'}
        </Button>
      </div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default VerticalStepper;