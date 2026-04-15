import { TZDate } from "@date-fns/tz";
import {
  addDays,
  addWeeks,
  type ContextOptions,
  type DateArg,
  type Day,
  eachDayOfInterval,
  eachMonthOfInterval,
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

function typedParse(input: string) {
  const parsed = parse(input) as {
    index: 3;
    day_of_week: "tuesday";
    trailer: "of the month";
    time: null;
  };
  return parsed;
}

export function factory(input: string, opts: { locale?: Locale } | undefined) {
  const parsed = typedParse(input);

  return <DateType extends Date, ResultDate extends Date>(
    referenceDate: DateArg<DateType>,
  ): ResultDate => {
    const day = parseDay(referenceDate, parsed.day_of_week, {
      locale: opts?.locale,
    });
    return getNthDay(referenceDate, parsed.index, day);
  };
}

export function single<
  DateType extends Date,
  ResultDate extends Date = DateType,
>(
  referenceDate: DateArg<DateType>,
  input: string,
  opts: { locale?: Locale } | undefined = undefined,
): ResultDate {
  return factory(input, opts)(referenceDate);
}

export function iterate<DateType extends Date, ResultDate extends Date>(
  {
    start,
    end,
    input,
  }: {
    start: DateArg<DateType>;
    end: DateArg<DateType>;
    input: string;
  },
  opts?: {
    locale?: Locale;
  },
): ResultDate[] {
  const ctx = {
    in: (value) => new TZDate(value as Date, "Australia/Perth"),
  } satisfies ContextOptions<TZDate>;

  const res = factory(input, opts);

  return eachMonthOfInterval(
    {
      start,
      end,
    },
    ctx,
  ).map((start) => res(start));
}
