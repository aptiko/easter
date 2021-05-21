import datetime as dt

DAYS_IN_12_MOONS = 12 * 29.5
DIFF_BETWEEN_12_MOONS_AND_ONE_YEAR = 365 - DAYS_IN_12_MOONS


class EasterDate:
    def __init__(self, year):
        self.year = year
        self.calculate()

    def calculate(self):
        self.find_days_from_equinox_to_full_moon()
        self.find_days_from_full_moon_to_sunday()
        self.find_easter_sunday()

    def find_days_from_equinox_to_full_moon(self):
        year_number_in_metonic_cycle = self.year % 19
        self.century = self.year // 100
        self.quadricentennial = self.century // 4
        p = (13 + 8 * self.century) // 25
        self.M = (15 - p + self.century - self.quadricentennial) % 30
        self.days_from_equinox_to_full_moon = (
            (30 - DIFF_BETWEEN_12_MOONS_AND_ONE_YEAR) * year_number_in_metonic_cycle
            + self.M
        ) % 30

    def find_days_from_full_moon_to_sunday(self):
        b = self.year % 4
        c = self.year % 7
        N = (4 + self.century - self.quadricentennial) % 7
        self.days_from_full_moon_to_sunday = (
            2 * b + 4 * c + 6 * self.days_from_equinox_to_full_moon + N
        ) % 7

    def find_easter_sunday(self):
        self.easter_sunday = dt.date(self.year, 3, 22) + dt.timedelta(
            self.days_from_equinox_to_full_moon + self.days_from_full_moon_to_sunday
        )
        self.deal_with_exceptions()

    def deal_with_exceptions(self):
        self.historically_forbid_easter_from_falling_on_26_april()
        self.ensure_full_moons_dont_occur_on_same_date_twice_in_a_metonic_cycle()

    def ensure_full_moons_dont_occur_on_same_date_twice_in_a_metonic_cycle(self):
        this_would_be_the_second_full_moon_on_18_april_in_a_metonic_cycle = (
            self.days_from_equinox_to_full_moon == 28 and (11 * self.M + 11) % 30 < 19
        )
        if this_would_be_the_second_full_moon_on_18_april_in_a_metonic_cycle:
            if self.days_from_full_moon_to_sunday == 6:
                self.easter_sunday = dt.date(self.year, 4, 18)

    def historically_forbid_easter_from_falling_on_26_april(self):
        easter_would_normally_fall_on_26_april = (
            self.days_from_equinox_to_full_moon == 29
            and self.days_from_full_moon_to_sunday == 6
        )
        if easter_would_normally_fall_on_26_april:
            self.easter_sunday = dt.date(self.year, 4, 19)


def get_easter_date(year):
    easter_date = EasterDate(year)
    return easter_date.easter_sunday
