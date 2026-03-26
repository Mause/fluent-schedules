import {
  addDays,
  addWeeks,
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

function getNthDay(firstOfMonth: Date, n: number, day: Day): Date {
  // If the 1st is already Thursday, it's the 1st Thursday.
  // Otherwise, get the next Thursday.
  const firstThursday =
    getDay(firstOfMonth) === day ? firstOfMonth : nextDay(firstOfMonth, day);

  // Add 2 weeks to get from the 1st to the 3rd Thursday
  return addWeeks(firstThursday, n - 1);
}

function parseDay(day: string, opts?: { locale?: Locale }): Day {
  const today = startOfISOWeek(new Date());
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

export function iterate(
  referenceDate: Date,
  input: string,
  opts: { locale?: Locale } | undefined = undefined,
) {
  const parsed = parse(input) as {
    index: 3;
    day_of_week: "tuesday";
    trailer: "of the month";
    time: null;
  };

  return getNthDay(
    referenceDate,
    parsed.index,
    parseDay(parsed.day_of_week, { locale: opts?.locale }),
  );
}
