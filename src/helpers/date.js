import formatDate from 'date-fns/format';

export const format = (val, format, defaultVal, { toDate, ...options } = {}) => val ? formatDate(toDate ? new Date(val) : val, format, options) : defaultVal && defaultVal;

export const floorDate = (date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
}

export const manipulateDate = (date, diffDays = 0, diffMonth = 0, diffYears = 0) => {
    const d = new Date()
    d.setDate(date.getDate() + diffDays)
    d.setMonth(date.getMonth() + diffMonth)
    d.setFullYear(date.getFullYear() + diffYears)
    return d
}

export function nth(n) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }
