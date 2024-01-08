export const lastDay = days => {
  const daysArray = days?.toString().split('-');
  return {
    firstDay: Number(daysArray[0]),
    lastDay: Number(daysArray[daysArray.length - 1]),
  };
};

export const workTimes = time => {
  if (time) {
    const days = [];
    time.sort((a, b) => {
      return a?.day - b?.day;
    });

    for (let i = 0; i < time?.length; i++) {
      if (
        !!days?.length &&
        days[days.length - 1]?.start === time[i - 1]?.start &&
        days[days.length - 1]?.end === time[i - 1]?.end &&
        lastDay(days[days?.length - 1].day).lastDay - time[i - 1]?.day === 1
      ) {
        continue;
      }
      if (
        !!days.length &&
        days[days?.length - 1]?.start === time[i]?.start &&
        days[days?.length - 1]?.end === time[i]?.end &&
        time[i]?.day - lastDay(days[days?.length - 1].day)?.lastDay === 1
      ) {
        const firstDay = lastDay(days[days?.length - 1].day)?.firstDay;
        days.pop();
        days.push({
          start: time[i]?.start,
          end: time[i]?.end,
          day: firstDay + '-' + time[i]?.day,
        });
      } else if (
        time[i]?.start === time[i + 1]?.start &&
        time[i]?.end === time[i + 1]?.end &&
        time[i + 1]?.day - time[i]?.day === 1
      ) {
        days.push({
          start: time[i]?.start,
          end: time[i]?.end,
          day: time[i]?.day + '-' + time[i + 1]?.day,
        });
      } else {
        days.push(time[i]);
      }
    }
    return days;
  }
};

export const formatHours = (workHours, returnHour) => {
  let hours = [];
  if (!workHours) return hours;
  workHours?.map(e => {
    if (!e?.dayOff) {
      hours.push({
        day: e.day || e.key,
        start: stringToHour(e.start, returnHour),
        end: stringToHour(e.end, returnHour),
      });
    }
  });
  return hours;
};

const convertToPM = (hour, minute) => {
  if (`${minute}`?.length === 1) {
    minute = '0' + minute;
  }

  if (hour >= 0) {
    if (hour > 12) {
      return hour - 12 + ':' + minute + ' PM';
    } else if (hour === 0) {
      return '12:' + minute + ' PM';
    } else {
      return hour + ':' + minute + ' AM';
    }
  }
};

export const stringToHour = (time, returnHour) => {
  const date = new Date('01/01/2000 ' + time);
  if (returnHour) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
  } else if (time.includes('AM') || time.includes('PM')) {
    return time;
  }
  return convertToPM(date.getHours(), date.getMinutes());
};
