export const stringToDate = (date: string) => new Date(date);

/**
 * Format a date as a string.
 *
 * @param date The date to format.
 * @param shorten If true, shorten the month name to its first three letters
 * and remove the century from the year.
 * @returns A string representing the formatted date.
 */
export function formatDate(date: Date, shorten: boolean = false): string {
  const day = date.getDate();
  const ordinalSuffix: string = getOrdinalSuffix(day);
  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let monthName = monthNames[date.getMonth()];
  let year = date.getFullYear().toString();

  if (shorten) {
    if (monthName.length > 5) {
      monthName = monthName.slice(0, 3) + '.';
    }
    year = year.slice(2);
  }

  return `${day}${ordinalSuffix} ${monthName} ${year}`;
}

/**
 * Calculate the number of days between two dates.
 *
 * @param date1 The first date.
 * @param date2 The second date.
 * @returns The number of days between the two dates.
 */
export function getDaysBetweenDates(date1: Date, date2: Date): number {
  // Convert both dates to milliseconds
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();

  const differenceMs = Math.abs(date2Ms - date1Ms);
  const days = Math.floor(differenceMs / 86400000);
  return days;
}

/**
 * Calculate the number of days between a given date and now.
 *
 * @param date The given date.
 * @returns The number of days between now and the given date.
 */
export function getDaysFromNow(date: Date): number {
  const now = new Date();
  return getDaysBetweenDates(now, date);
}

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return 'th';
  } else {
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}