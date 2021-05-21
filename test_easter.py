import datetime as dt
import unittest

from easter import get_easter_date


class GetEasterDateTestCase(unittest.TestCase):
    def test_earliest_possible_date(self):
        self.assertEqual(get_easter_date(1598), dt.date(1598, 3, 22))

    def test_latest_possible_date(self):
        self.assertEqual(get_easter_date(1666), dt.date(1666, 4, 25))

    def test_exception1(self):
        self.assertEqual(get_easter_date(1609), dt.date(1609, 4, 19))

    def test_non_special_19_april(self):
        self.assertEqual(get_easter_date(1615), dt.date(1615, 4, 19))

    def test_exception2(self):
        self.assertEqual(get_easter_date(1954), dt.date(1954, 4, 18))

    def test_non_special_18_april(self):
        self.assertEqual(get_easter_date(1965), dt.date(1965, 4, 18))

    def test_correct_p(self):
        self.assertEqual(get_easter_date(4200), dt.date(4200, 4, 20))


if __name__ == '__main__':
    unittest.main()
