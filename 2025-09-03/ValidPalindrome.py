
class Solution:
    #-----------tự làm-------
    # def isPalindrome(self, s: str) -> bool:
    #     #lọc a-z, 0-9
    #     new_s = ''
    #     for i in s:
    #         if i.isalnum():
    #             new_s += i
    #     new_s = new_s.lower()
    #     reverse_s = new_s[::-1]
    #     return new_s == reverse_s
    
    #-------------2 Pointer-------
    def isPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1
        while l < r:
            while l < r and not self.alphaNum(s[l]):
                l += 1
            while l < r and not self.alphaNum(s[r]):
                r -= 1
            if s[l].lower() != s[r].lower():
                return False
            l += 1
            r -= 1
        return True
        
    def alphaNum(self,c: str) -> bool:
        return ((ord('a') <= ord(c) <= ord('z')) or
                (ord('A') <= ord(c) <= ord('Z')) or
                (ord('0') <= ord(c) <= ord('9')))

if __name__ == '__main__':
    s = Solution()
    i = "Was it a car or a cat I saw?"
    result = s.isPalindrome(i)
    print(result)
        