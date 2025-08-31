from typing import List

# class Solution(object):
#     def twoSum(self, nums, target):
#         """
#         :type nums: List[int]
#         :type target: int
#         :rtype: List[int]
#         """
        
#         i = 0
#         result = []
#         while i < len(nums):
#             tmp = i + 1
#             while tmp < len(nums):
#                 if nums[i] + nums[tmp] == target:
#                     result.append(i)
#                     result.append(tmp)
#                     return result
#                 tmp = tmp + 1
#             i = i + 1


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        tmp = {}
        # nums = [3,4,5,6] target = 7
        for i, n in enumerate(nums): #Lưu chỉ số và giá trị vào dict {3:0; 4:1; 5:2; 6:0}
            tmp[n] = i

        for i, n in enumerate(nums):
            diff = target - n
            if diff in nums and tmp[diff] != i:
                return [i, tmp[diff]]



if __name__ == '__main__':
    t = [3,6,2,5]
    s = Solution()
    result = s.twoSum(t,7)
    print(result)
        
