import React from "react";
import ReactDOM from "react-dom";
import TextField from "./TextField";
import {
  render,
  fireEvent,
  cleanup,
  getByLabelText,
  screen,
} from "@testing-library/react";
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

afterEach(cleanup);

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
  const utils = render(
    <TextField
      type="number"
      label="Number of students"
      onChange={() => {}}
      disabled={false}
      value="0"
      showError={true}
    />
  );
    // div class= MuiInputBase-root
  const input = utils.getByLabelText("Number of students");
  const test = screen.getByRole('input', {name: "filled-basic"});
  expect(test).toBe("0");

  //const input = utils.getBy

  return {
    input,
    ...utils,
  };
};

it("TextField test 1", () => {
  //const { input } = setup();
  //const debug = setup().debug();
  
  const test = screen.getByRole('input', {name: "filled-basic"});
  expect(test).toBe("0");
  
  // const wrapper = shallow(
  //   <TextField
  //     type="number"
  //     label="Number of students"
  //     onChange={() => {}}
  //     disabled={false}
  //     value="0"
  //     showError={true}
  //   />
  // );

  // console.log(wrapper.find('TextField').debug());

  // const { debug } = render(
  //   <TextField
  //     type="number"
  //     label="Number of students"
  //     onChange={() => {}}
  //     disabled={false}
  //     value="0"
  //     showError={true}
  //   />
  // )
  //debug()


  //fireEvent.change(input, { target: { value: "$23.0" } });

  //expect(input).toBe("$23");
});

// it("TextField test 2", () => {
//   const { getByText } = render(
//     <TextField
//       type="number"
//       label="Number of students"
//       onChange={() => {}}
//       disabled={false}
//       value="0"
//       showError={true}
//     />
//   );

//   expect(getByText(/Number/i).textContent).toBe("Number of students");

//   expect(screen.getByLabelText("Number of students")).toBe("0");

//   fireEvent.change(screen.getByLabelText("Number of students"), {
//     target: { value: "Text" },
//   });

//   //expect(getByText(/Number/i).nodeValue).toBe("Text");

//   //fireEvent.click(getByText("State Change Button"));

//   //expect(getByText(/Initial/i).textContent).toBe("Initial State Changed");
// });
