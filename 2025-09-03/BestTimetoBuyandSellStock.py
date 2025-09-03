from typing import List

# class Solution:
#     def maxProfit(self, prices: List[int]) -> int:
#         l, r = 0, len(prices)
#         result = 0
#         while l < r:
#             i = l + 1
#             while i < r:
#                 buy = prices[l]
#                 sell = prices[i]
#                 profit = sell - buy
#                 if profit > 0 and profit > result:
#                     result = profit
#                 i += 1
#             l += 1

#         return result

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_buy = prices[0]
        max_profit = 0

        for sell in prices:                                         
            max_profit = max(max_profit, sell - min_buy)        
            min_buy = min(min_buy, sell)                        
        
        return max_profit
        

if __name__ == '__main__':
    s = Solution()
    prices = [7, 1, 5, 3, 6, 4]
    result = s.maxProfit(prices)
    print(result)
        