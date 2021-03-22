import React from 'react';
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
    },
  }),
);

function getSteps() {
  return ['Select Course and Class', 'Enable Location Services?', 'Generate Code!'];
}

const getChildComponent = (children: React.ReactNode[], componentName: string) => {
  return React.Children.map(children, (child: any) => {
    console.log(child.type.displayName)
    return child.type.displayName === componentName ? child : null
  })
}

function getStepContent(stepIndex: number, children: React.ReactNode[]) {
  switch (stepIndex) {
    case 0:
      return getChildComponent(children, "CoursesAndClasses");
    case 1:
      return <h1>Hey from GeoLocation component</h1> //getChildComponent(children, "GeoLocation");
    case 2:
      return getChildComponent(children, "GenerateCode");
    default:
      return 'Unknown stepIndex';
  }
}
interface IProps{
  children: React.ReactNode[]
}

const VerticalStepper: React.FC<IProps> = ({children}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

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
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div className={classes.stepper} >
            <Typography className={classes.instructions}>{getStepContent(activeStep, children)}</Typography>
            </div>
            <div className={classes.buttons}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
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