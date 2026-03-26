import {
  addDays,
  addWeeks,
  type DateArg,
  type Day,
  eachDayOfInterval,
  formatDate,
  getDay,
  type Locale,
  nextDay,
  startOfISOWeek,
} from "date-fns";

import { parse } from "./grammar.js";

export { parse };

function getNthDay<DateType extends Date, ResultDate extends Date>(
  firstOfMonth: DateArg<DateType>,
  n: number,
  day: Day,
): ResultDate {
  // If the 1st is already Thursday, it's the 1st Thursday.
  // Otherwise, get the next Thursday.
  const firstThursday =
    getDay(firstOfMonth) === day ? firstOfMonth : nextDay(firstOfMonth, day);

  // Add 2 weeks to get from the 1st to the 3rd Thursday
  return addWeeks(firstThursday, n - 1);
}

export function parseDay<DateType extends Date>(
  referenceDate: DateArg<DateType>,
  day: string,
  opts: { locale?: Locale } | undefined = undefined,
): Day {
  const today = startOfISOWeek(referenceDate);
  const daysOfWeek = eachDayOfInterval({
    start: today,
    end: addDays(today, 6),
  });

  const days = daysOfWeek.map((date) =>
    formatDate(date, "EEEE", {
      locale: opts?.locale,
    }),
  );

  return days.indexOf(day) as Day;
}

export function iterate<
  DateType extends Date,
  ResultDate extends Date = DateType,
>(
  referenceDate: DateArg<DateType>,
  input: string,
  opts: { locale?: Locale } | undefined = undefined,
): ResultDate {
  const parsed = parse(input) as {
    index: 3;
    day_of_week: "tuesday";
    trailer: "of the month";
    time: null;
  };

  return getNthDay(
    referenceDate,
    parsed.index,
    parseDay(referenceDate, parsed.day_of_week, { locale: opts?.locale }),
  );
}
