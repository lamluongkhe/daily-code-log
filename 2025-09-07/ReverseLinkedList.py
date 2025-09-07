from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def insert_end(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        new_node = ListNode(val)
        if not head:
            return new_node
        curr = head
        while curr.next:
            curr = curr.next
        curr.next = new_node
        return head

    def insert_front(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        new_node = ListNode(val, head)
        return new_node

    def print_list(self, head: Optional[ListNode]) -> None:
        curr = head
        while curr:
            print(curr.val, end=" -> ")
            curr = curr.next
        print("None")

    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        curr = head
        tmp = []
        while curr:
            tmp.append(curr.val)
            curr = curr.next

        new_head = None
        for val in tmp:
            new_node = ListNode(val, new_head)
            new_head = new_node
        return new_head



if __name__ == "__main__":
    sol = Solution()

    head = None

    head = sol.insert_end(head, 10)
    head = sol.insert_end(head, 20)
    head = sol.insert_end(head, 30)

    head = sol.insert_front(head, 5)

    sol.print_list(head)

    head = sol.reverseList(head)

    sol.print_list(head)
