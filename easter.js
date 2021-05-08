function monthDays(month) {
  if (month === 3) {
    return 31;
  }
  if (month === 4) {
    return 30;
  }
  throw Error("Something's wrong");
}

function julianDifference(year) {
  return Math.floor(year / 100) - Math.floor(year / 400) - 2;
}

function getEasterDate(year, type) {
  let month;
  let dayOfMonth;
  let M;
  let N;

  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  if (['julian', 'orthodox'].includes(type)) {
    M = 15;
    N = 6;
  } else {
    const k = Math.floor(year / 100);
    const p = Math.floor((13 + 8 * k) / 25);
    const q = Math.floor(k / 4);
    M = (15 - p + k - q) % 30;
    N = (4 + k - q) % 7;
  }
  const d = (19 * a + M) % 30;
  const e = (2 * b + 4 * c + 6 * d + N) % 7;
  if (d === 29 && e === 6) {
    month = 4;
    dayOfMonth = 19;
  } else if (d === 28 && e === 6 && (11 * M + 11) % 30 < 19) {
    month = 4;
    dayOfMonth = 18;
  } else {
    month = 3;
    dayOfMonth = 22 + d + e;
  }
  if (dayOfMonth > 31) {
    month = 4;
    dayOfMonth -= 31;
  }
  if (type === 'orthodox') {
    dayOfMonth += julianDifference(year);
  }
  if (dayOfMonth > monthDays(month)) {
    dayOfMonth -= monthDays(month);
    month += 1;
  }
  return [month, dayOfMonth];
}

function formatDate(year, month, day) {
  const yearStr = `0000${year}`.slice(-4);
  const monthStr = `00${month}`.slice(-2);
  const dayStr = `00${day}`.slice(-2);
  return `${yearStr}-${monthStr}-${dayStr}`;
}

function getAllEasterDates(year) {
  const [gm, gd] = getEasterDate(year, 'gregorian');
  const [jm, jd] = getEasterDate(year, 'julian');
  const [om, od] = getEasterDate(year, 'orthodox');
  return `gregorian=${formatDate(year, gm, gd)} julian=${formatDate(year, jm, jd)} orthodox=${formatDate(year, om, od)}`;
}
