from typing import List

class Solution:
    def isValid(self, s: str) -> bool:
        open_brackets = []
        close_brackets = []
        for bracket in s:
            if bracket == "(" or bracket == "{" or bracket == "[":
                open_brackets.append(bracket)
            else:
                if bool(open_brackets):
                    compare = open_brackets.pop()
                    if (compare == "(" and bracket == ")") or (compare == "{" and bracket == "}") or (compare == "[" and bracket == "]"):
                        continue
                    else:
                        return False
                else:
                    return False
               
        if bool(open_brackets):
            return False
        else :
            return True

if __name__ == '__main__':
    s = Solution()
    i = "["
    result = s.isValid(i)
    print(result)
        