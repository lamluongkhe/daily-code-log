from typing import List

#----- Sắp xếp rồi so sánh (tự làm) -----
# class Solution:
#     def isAnagram(self, s: str, t: str) -> bool:
#         sort_s = sorted(s)
#         sort_t = sorted(t)
#         if sort_s == sort_t:
#             for i in range(len(sort_s)):
#                 if sort_s[i] != sort_t[i]:
#                     return False
#             return True
#         return False

#----- Sắp xếp rồi so sánh (ngắn hơn) -----
# class Solution:
#     def isAnagram(self, s: str, t: str) -> bool:
#         if len(s) != len(t):
#             return False
        
#         return sorted(s) == sorted(t)


#----- Đếm số kí tự bằng Dict -----
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        count_s, count_t = {}, {}
        for i in range(len(s)):
            count_s[s[i]] = count_s.get(s[i],0) + 1
            count_t[t[i]] = count_t.get(t[i],0) + 1

        return count_s == count_t

#----- Triệt tiêu kí tự trùng (Lỗi nếu có chữ HOA)-----
# class Solution:
#     def isAnagram(self, s: str, t: str) -> bool:
#         if len(s) != len(t):
#             return False

#         count = [0] * 26
#         for i in range(len(s)):
#             count[ord(s[i]) - ord('a')] += 1 
#             count[ord(t[i]) - ord('a')] -= 1

#         for val in count:
#             if val != 0:
#                 return False
#         return True

if __name__ == '__main__':
    s = Solution()
    i = "racecar"
    t = "carrace"
    result = s.isAnagram(i,t)
    print(result)
        