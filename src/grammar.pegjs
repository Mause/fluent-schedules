// 3rd thursday of the month

Sentence
 = index:HumanInteger _ day_of_week:DayOfWeek _ trailer:Trailer time:(_ TimePhrase)? {
  return {index, day_of_week, trailer, time}
 }

Trailer
 = "of the month" / "of every month" / "monthly"

DayOfWeek "day of week"
 = "monday" / "tuesday" / "wednesday" / "thursday" / "friday"

TextHours
 = (
 "one" / "two" / "three" / "four" / "five" / "six" / "seven" / "eight" / "nine" /
 "ten" / "eleven" / "twelve"
)

HInteger
 = (
 TextHours / "thirteen" / "fourteen" / "fifteen" / "sixteen" / "seventeen" / "eighteen" / "nineteen" /
 "twenty" / "thirty" / "fourty" / "fifty"
)

TimePhrase
 = "at" _ hour:TextHours _ minute:HInteger {
  return {hour, minute};
 }

HumanInteger "human integer"
  = num:(
    "1st" / "2nd" / "3rd" /
    "4th" / "5th" / "6th" /
    "7th" / "8th" / "9th" /
    "first" / "second" / "third" /
    "last"
  ) {
    switch (num) {
    case "1st":
    case "first":
      return 1;
    case "2nd":
    case "second":
      return 2;
    case "3rd":
    case "third":
      return 3;
    case "last":
      return -1;
    default:
      return parseInt(num[0], 10);
    }
  }

_ "whitespace"
  = [ \t\n\r]*

