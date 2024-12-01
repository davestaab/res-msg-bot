import { format, getDefaultOptions, parse } from "date-fns";

export type Holiday = {
  name: string;
  date: string;
};
export const holidays: Holiday[] = [
  {
    name: 'Christmas',
    date: '2024-12-24'
  },
  {
    name: 'Christmas',
    date: '2024-12-25'
  },
  {
    name: 'New Years Day',
    date: '2025-01-01'
  },
  {
    name: 'Martin Luther King Jr. Day',
    date: '2025-01-20'
  },
  {
    name: 'Good Friday',
    date: '2025-04-18'
  },
  {
    name: 'Memorial Day',
    date: '2025-05-26'
  },
  {
    name: 'Independence Day',
    date: '2025-07-04'
  },
  {
    name: 'Labor Day',
    date: '2025-09-01'
  },
  {
    name: 'Thanksgiving',
    date: '2025-11-27'
  },
  {
    name: 'Thanksgiving',
    date: '2025-11-28'
  },
  {
    name: 'Christmas',
    date: '2025-12-25'
  },
  {
    name: 'Christmas',
    date: '2025-12-26'
  },
]

export const setHolidays = (holidays: Holiday[]) => holidays = holidays;

// let mockToday: Date | null = parse('2024-11-29', 'yyyy-MM-dd', new Date());
let mockToday: Date | null = null;

export const setToday = (date: string | null) => mockToday = date === null ? null : parse(date, 'yyyy-MM-dd', new Date());
export const isHoliday = (): Holiday | undefined => {
  const today = format(mockToday ?? new Date(), 'yyyy-MM-dd');
  return holidays.find(holiday => holiday.date === today);
  
}