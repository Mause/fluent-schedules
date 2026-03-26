import { expect, test } from "vitest";

import { iterate, parse } from "../src/index.ts";

test.for([
  "third thursday of the month",
  "last thursday of the month",
  "last thursday of the month at six thirty",
])("parse(%s)", (param) => {
  expect(parse(param)).toMatchSnapshot();
});

test("iterate", () => {
  expect(
    iterate(new Date(2026, 1, 1), "third tuesday of the month", {}),
  ).toMatchSnapshot();
});
