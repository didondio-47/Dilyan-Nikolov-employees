import { parse } from 'date-fns';

/**
 * Formats a string date to a date obj by going through all possible user inputs in SHORT_DATE_VARIANTS
 * If formatting is unsuccessful then return new date and console log the error
 * @param stringDate - string date
 */
export function parseStringToDate(stringDate: any): Date {
  if (stringDate && Object.prototype.toString.call(stringDate) === '[object Date]') {
    return new Date(stringDate); // If it's already a Date object, return it directly
  }

  let result: Date | null = null;
  try {
    for (const variant of SHORT_DATE_VARIANTS) {
      const parsedDate: Date | string = parse(stringDate, variant, new Date(), {
        useAdditionalDayOfYearTokens: true,
        useAdditionalWeekYearTokens: true,
      });

      if (parsedDate.toString() !== 'Invalid Date') {
        result = new Date(parsedDate);
        const hours: number = new Date().getHours();
        const minutes: number = new Date().getMinutes();
        result.setHours(hours);
        result.setMinutes(minutes);
        break;
      }
    }
    if (!checkIfValidDate(result)) {
      throw new Error(`the date you entered is NaN: ${result}`);
    }
  } catch (e) {
    console.error(e);
    result = new Date();
  }
  return result!;
}

/**
 * Checks if a given input is a valid Date object and returns a new Date() of input
 * By manual input angular material treats it as a string, and it can result in a "Invalid Date" Date object
 * @param date - string, null or date value
 */
export function checkIfValidDate(date: any): Date | null {
  if (date) {
    if (Number.isNaN(Date.parse(date))) {
      return null;
    }

    const newDate: Date | null = new Date(date);
    // eslint-disable-next-line no-restricted-globals
    return !Number.isNaN(newDate as any) ? newDate : null;
  }
  return null;
}

/**
 * Used in Graphql date conversions to format manual user input
 */
export const SHORT_DATE_VARIANTS: string[] = [
  'yyyy-MM-dd',
  'yyyy-mm-dd',
  'dd-MM-yyyy',
  'dd-mm-yyyy',
  'dd.MM.yyyy',
  'dd.mm.yyyy',
  'dd/MM/yyyy',
  'dd/mm/yyyy',
  'MM-dd-yyyy',
  'mm-dd-yyyy',
  'MM.dd.yyyy',
  'mm.dd.yyyy',
  'MM/dd/yyyy',
  'mm/dd/yyyy',
  'yyyy.MM.dd',
  'yyyy.mm.dd',
  'yyyy/MM/dd',
  'yyyy/mm/dd',
  'yyyy-dd-MM',
  'yyyy-dd-mm',
  'yyyy.dd.MM',
  'yyyy.dd.mm',
  'yyyy/dd/MM',
  'yyyy/dd/mm',
];
