import { format, getDefaultOptions, parse } from "date-fns";

export type Holiday = {
  name: string;
  date: string;
};
export const holidays: Holiday[] = [
  {
    name: 'Christmas',
    date: '2023-12-25'
  },
  {
    name: 'Christmas',
    date: '2023-12-26'
  },
  {
    name: 'New Years Day',
    date: '2024-01-01'
  },
  {
    name: 'Martin Luther King Jr. Day',
    date: '2024-01-15'
  },
  {
    name: 'Good Friday',
    date: '2024-03-29'
  },
  {
    name: 'Memorial Day',
    date: '2024-05-27'
  },
  {
    name: 'Independence Day',
    date: '2024-07-04'
  },
  {
    name: 'Labor Day',
    date: '2024-09-02'
  },
  {
    name: 'Thanksgiving',
    date: '2024-11-28'
  },
  {
    name: 'Thanksgiving',
    date: '2024-11-29'
  },
  {
    name: 'Christmas',
    date: '2024-12-24'
  },
  {
    name: 'Christmas',
    date: '2024-12-25'
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