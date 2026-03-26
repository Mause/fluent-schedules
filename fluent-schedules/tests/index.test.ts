import { parse } from "fluent-schedules";
import { expect, test } from "vitest";

test.for([
  "third thursday of the month",
  "last thursday of the month",
  "last thursday of the month at six thirty",
])("parse(%s)", (param) => {
  expect(parse(param)).toMatchSnapshot();
});
