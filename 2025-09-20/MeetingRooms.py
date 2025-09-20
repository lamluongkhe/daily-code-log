from typing import List

# Definition of Interval:
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end


class Solution:
    def canAttendMeetings(self, intervals: List[Interval]) -> bool:
        intervals.sort(key=lambda x: x.start)

        for i in range(1, len(intervals)):
            if intervals[i].start < intervals[i-1].end:
                return False

        return True



if __name__ == '__main__':

    sol = Solution()
    # Tạo list rỗng
    intervals = []

    # Khởi tạo tuple
    t1 = Interval(0, 4)
    t2 = Interval(5, 10)
    t3 = Interval(15, 20)

    # Add tuple vào list
    intervals.append(t1)
    intervals.append(t2)
    intervals.append(t3)
    print(sol.canAttendMeetings(intervals))
      