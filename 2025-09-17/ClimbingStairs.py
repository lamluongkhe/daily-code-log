from typing import List

class Solution:
    def climbStairs(self, n: int) -> int:
        pos1, pos2 = 1, 1

        for i in range(n-1):
            tmp = pos1
            pos1 += pos2
            pos2 = tmp

        return pos1


if __name__ == '__main__':
    s = Solution()
    result = s.climbStairs(5)
    print(result)
        
