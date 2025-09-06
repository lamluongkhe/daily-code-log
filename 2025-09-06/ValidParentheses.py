# from typing import List

# class Solution:
#     def isValid(self, s: str) -> bool:
#         open_brackets = []
#         close_brackets = []
#         for bracket in s:
#             if bracket == "(" or bracket == "{" or bracket == "[":
#                 open_brackets.append(bracket)
#             else:
#                 if bool(open_brackets):
#                     compare = open_brackets.pop()
#                     if (compare == "(" and bracket == ")") or (compare == "{" and bracket == "}") or (compare == "[" and bracket == "]"):
#                         continue
#                     else:
#                         return False
#                 else:
#                     return False
               
#         if bool(open_brackets):
#             return False
#         else :
#             return True

class Solution:
    def isValid(self, s: str) -> bool:
        open_stack = []
        close_to_open = {')': '(', '}': '{', ']': '['}

        for bracket in s:
            if bracket in close_to_open:
                if open_stack and close_to_open[bracket] == open_stack[-1]:
                    open_stack.pop()
                else:
                    return False
            else:
                open_stack.append(bracket)

        if open_stack:
            return False
        else:
            return True

if __name__ == '__main__':
    s = Solution()
    i = "))"
    result = s.isValid(i)
    print(result)
        
