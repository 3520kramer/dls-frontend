import React from "react";
import ListView from "./ListView";
import { render, cleanup, screen } from "@testing-library/react";
import { ISubject } from '../../../../redux/RegisterAttendanceData/RegisterAttendanceDataTypes'

afterEach(cleanup);

const subjects: ISubject[] = ["Development of Large Systems", "Databases for Developers", "Software Testing"];

it("Subjects to be shown on screen when rendered", () => {
  render(<ListView listData={subjects} onChange={() => {}}/>);

  expect(screen.getByText(subjects[0])).toBeInTheDocument();
  expect(screen.getByText(subjects[1])).toBeInTheDocument();
  expect(screen.getByText(subjects[2])).toBeInTheDocument();
});
