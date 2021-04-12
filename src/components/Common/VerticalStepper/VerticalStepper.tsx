import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
      return props.CoursesAndClasses;
    case 1:
      return props.Geo;
    case 2:
      return props.GenerateCode;
    default:
      return 'Unknown stepIndex';
  }
}

interface IProps{
  CoursesAndClasses: React.ReactNode,
  GenerateCode: React.ReactNode,
  Geo: React.ReactNode,
  isNextButtonDisabled: boolean,
  onLastStep: Function,
}


const VerticalStepper: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = getSteps();

  useEffect(()=> {
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
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <div>
        {activeStep === steps.length ? (
          <div className={classes.stepper} >
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Create new attendance registration</Button>
          </div>
        ) : (
          <div>
            <div className={classes.stepper} >
              {getStepContent(activeStep, props)}
            </div>
            <div className={classes.buttons}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled={props.isNextButtonDisabled}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
        )}
      </div>
    </div>
  );
}

export default VerticalStepper;