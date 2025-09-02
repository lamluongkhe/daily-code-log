from typing import List

class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        nums_set = set(nums)
        if len(nums) != len(nums_set):
            return True
        return False

# class Solution:
#     def hasDuplicate(self, nums: List[int]) -> bool:
#         nums.sort()
#         for i in range(1, len(nums)):
#             if nums[i] == nums[i-1]:
#                 return True
#         return False

if __name__ == '__main__':
    s = Solution()
    result = s.hasDuplicate([12, 2, 4, 3, 5, 6, 12, 0])
    print(result)
        