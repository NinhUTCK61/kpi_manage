import { eachDayOfInterval, endOfMonth, format, isValid, startOfMonth } from 'date-fns'

export const genDaysInMonth = (input: Date) => {
  let date = input

  if (!isValid(date)) {
    // default to 31 days
    date = new Date(2023, 0)
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  })

  return daysInMonth.map((day) => format(day, 'dd'))
}

export const getYearsOption = () => {
  const currentYear = new Date().getFullYear()
  const years = []

  for (let i = currentYear; i >= 1940; i--) {
    years.push(i.toString())
  }

  return years
}

export const monthArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
