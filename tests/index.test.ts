import { set } from "date-fns";
import { expect, test } from "vite-plus/test";

import { parse, single } from "../src/index.ts";

test.for([
  "third thursday of the month",
  "last thursday of the month",
  "last thursday of the month at six thirty",
])("parse(%s)", (param) => {
  expect(parse(param)).toMatchSnapshot();
});

test("iterate", () => {
  expect(
    single(
      set(new Date(), {
        year: 2026,
        month: 1,
        date: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
      "third tuesday of the month",
      {},
    ),
  ).toMatchSnapshot();
});
