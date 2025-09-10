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
            root.left, root.right = root.right, root.left
            self.invertTree(root.left)
            self.invertTree(root.right)
        
        return root



if __name__ == "__main__":
    sol = Solution()

    root = None
    #insert ko theo BST
    root = TreeNode(1)
    root.left  = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left  = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right.left = TreeNode(6)
    root.right.right= TreeNode(7)


    root = sol.invertTree(root)
    sol.LeftNodeRight(root)
    print()