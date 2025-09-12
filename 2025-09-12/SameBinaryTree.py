from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    #----insert BST -----
    def insertNode(self,root: Optional[TreeNode],val: int) -> Optional[TreeNode]:
        if root is None:
            root = TreeNode(val)

        else:
            if root.val < val:
                root.right = self.insertNode(root.right,val)
            elif root.val > val:
                root.left = self.insertNode(root.left,val)
            
        return root

    def LeftNodeRight(self, root: Optional[TreeNode]):
        if root:
            self.LeftNodeRight(root.left)
            print(root.val, end=" ")
            self.LeftNodeRight(root.right)

    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root is None:
            return
        else:
            #Swap 2 values:
            root.left, root.right = root.right, root.left
            #Move to Left and continue swap
            self.invertTree(root.left)
            #Move to Right and continue swap
            self.invertTree(root.right)
        
        return root
    
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        else:
            depth = 1 + max(self.maxDepth(root.left),self.maxDepth(root.right))

        return depth
    
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q:
            return True
        if p and q and p.val == q.val:
            return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
        else:
            return False


if __name__ == "__main__":
    sol = Solution()

    p = None
    #insert ko theo BST
    p = TreeNode(1)
    p.left  = TreeNode(2)
    p.right = TreeNode(3)
    p.right.left = TreeNode(4)

    q = None
    #insert ko theo BST
    q = TreeNode(1)
    q.left  = TreeNode(2)
    q.right = TreeNode(3)
    q.right.left = TreeNode(4)
    
    print(sol.isSameTree(p,q))