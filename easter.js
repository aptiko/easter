function monthDays(month) {
  if (month === 3) {
    return 31;
  }
  if (month === 4) {
    return 30;
  }
  throw Error("Something's wrong");
}

const DAYS_IN_12_MOONS = 12 * 29.5;
const DIFF_BETWEEN_12_MOONS_AND_ONE_YEAR = 365 - DAYS_IN_12_MOONS;

function getEasterDate(year) {
  let month;
  let dayOfMonth;

  const yearNumberInMetonicCycle = year % 19;
  const century = Math.floor(year / 100);
  const p = Math.floor((13 + 8 * century) / 25);
  const quadricentennial = Math.floor(century / 4);
  const M = (15 - p + century - quadricentennial) % 30;
  const daysFromEquinoxToFullMoon = (
    ((30 - DIFF_BETWEEN_12_MOONS_AND_ONE_YEAR) * yearNumberInMetonicCycle + M) % 30
  );

  const b = year % 4;
  const c = year % 7;
  const N = (4 + century - quadricentennial) % 7;
  const daysFromFullMoonToSunday = (2 * b + 4 * c + 6 * daysFromEquinoxToFullMoon + N) % 7;

  if (daysFromEquinoxToFullMoon === 29 && daysFromFullMoonToSunday === 6) {
    month = 4;
    dayOfMonth = 19;
  } else if (
    daysFromEquinoxToFullMoon === 28 && daysFromFullMoonToSunday === 6 && (11 * M + 11) % 30 < 19
  ) {
    month = 4;
    dayOfMonth = 18;
  } else {
    month = 3;
    dayOfMonth = 22 + daysFromEquinoxToFullMoon + daysFromFullMoonToSunday;
    if (dayOfMonth > 31) {
      month = 4;
      dayOfMonth -= 31;
    }
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
  return `gregorian easter=${formatDate(year, gm, gd)}`;
}

export { getEasterDate, getAllEasterDates };
