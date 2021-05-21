DAYS_IN_12_MOONS = 12 * 29.5
DIFF_BETWEEN_12_MOONS_AND_ONE_YEAR = 365 - DAYS_IN_12_MOONS


def get_easter_date(year):
    year_number_in_metonic_cycle = year % 19
    century = year // 100
    p = (13 + 8 * century) // 25
    quadricentennial = century // 4
    M = (15 - p + century - quadricentennial) % 30
    days_from_equinox_to_full_moon = (
        (30 - DIFF_BETWEEN_12_MOONS_AND_ONE_YEAR) * year_number_in_metonic_cycle + M
    ) % 30

    b = year % 4
    c = year % 7
    N = (4 + century - quadricentennial) % 7
    days_from_full_moon_to_sunday = (
        2 * b + 4 * c + 6 * days_from_equinox_to_full_moon + N
    ) % 7

    exception1 = (
        days_from_equinox_to_full_moon == 29 and days_from_full_moon_to_sunday == 6
    )
    exception2 = (
        days_from_equinox_to_full_moon == 28
        and days_from_full_moon_to_sunday == 6
        and (11 * M + 11) % 30 < 19
    )
    if exception1:
        month = 4
        day_of_month = 19
    elif exception2:
        month = 4
        day_of_month = 18
    else:
        month = 3
        day_of_month = (
            22 + days_from_equinox_to_full_moon + days_from_full_moon_to_sunday
        )
        if day_of_month > 31:
            month = 4
            day_of_month -= 31
    return [month, day_of_month]
