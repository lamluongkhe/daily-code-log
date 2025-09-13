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
        
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if not subRoot:
            return True
        if not root:
            return False
        
        if self.isSameTree(root, subRoot):
            return True
         
        return (self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot))

if __name__ == "__main__":
    sol = Solution()

    # #root
    # root = None
    # for val in [3, 4, 5, 1, 2]:
    #     root = sol.insertNode(root, val)

    # #subRoot
    # subRoot = None
    # for val in [4, 1, 2]:
    #     subRoot = sol.insertNode(subRoot, val)

    #root
    root = TreeNode(3)
    root.left = TreeNode(4)
    root.right = TreeNode(5)
    root.left.left = TreeNode(1)
    root.left.right = TreeNode(2)

    #subRoot
    subRoot = TreeNode(4)
    subRoot.left = TreeNode(1)
    subRoot.right = TreeNode(2)

    # Testing
    print("Inorder traversal of root:")
    sol.LeftNodeRight(root)
    print("\nInorder traversal of subRoot:")
    sol.LeftNodeRight(subRoot)

    print("\nIs subRoot a subtree of root?")
    print(sol.isSubtree(root, subRoot))